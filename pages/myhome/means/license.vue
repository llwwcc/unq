<template>
	<view class="photo">
		<view class="uni-list list-pd">
			<view class="uni-list-cell cell-pd">
				<view class="uni-uploader">
					<view class="uni-uploader-body">
						<view class="uni-uploader__files">
							<block v-for="(image,index) in imageList" :key="index">
								<view class="uni-uploader__file" style="position: relative;">
									<image class="uni-uploader__img" mode="aspectFill" :src="image" :data-src="image" @tap="previewImage"></image>
									<view class="close-view" @click="close(index)">×</view>
								</view>
							</block>
							<view class="uni-uploader__input-box" v-show="imageList.length < 9">
								<view class="uni-uploader__input" @tap="chooseImage"></view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="btn" @click="add">
			立即上传
		</view>
	</view>
</template>

<script>
	import image from '../../../common/image.js';
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
	var sizeType = [
		['compressed'],
		['original'],
		['compressed', 'original']
	]
	export default {
		data() {
			return {
				imageList: [],
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 8,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				
				//侧滑返回start
				startX: 0, //点击屏幕起始位置
				movedX: 0, //横向移动的距离
				endX: 0, //接触屏幕后移开时的位置
				//end
			}
		},
		onUnload() {
			this.imageList = [],
				this.sourceTypeIndex = 2,
				this.sourceType = ['拍照', '相册', '拍照或相册'],
				this.sizeTypeIndex = 2,
				this.sizeType = ['压缩', '原图', '压缩或原图'],
				this.countIndex = 8;
		},
		methods: {
			async add(){
					var location = await this.getLocation();//位置信息,可删除,主要想记录一下异步转同步处理
					var images = [];
					for(var i = 0,len = this.imageList.length; i < len; i++){
						var image_obj = {name:'image-'+i,uri:this.imageList[i]};
						images.push(image_obj);
					}
					
					uni.uploadFile({//该上传仅为示例,可根据自己业务修改或封装,注意:统一上传可能会导致服务器压力过大
						url: 'https://wx.zzsnqyjxh.org/test/app/user/fileUpload', //仅为示例，非真实的接口地址
						// files:images,//有files时,会忽略filePath和name
						// filePath: '',
						// name: '',
						methods: 'POST',
						formData: {//后台以post方式接收
							ref: images,//自己系统中的用户id
						},
						success: (uploadFileRes) => {
							uni.hideLoading();
							uni.showToast({
								icon:'success',
								title:"发布成功"
							})
							uni.navigateBack({//可根据实际情况使用其他路由方式
								delta:1
							});
						},
						fail: (e) => {
							console.log("e: " + JSON.stringify(e));
							uni.hideLoading();
							uni.showToast({
								icon:'none',
								title:"发布失败,请检查网络"
							})
						}
					});
				},
				
				getLocation(){//h5中可能不支持,自己选择
					return new Promise((resolve, reject) => {
						uni.getLocation({
							type: 'wgs84',
							success: function (res) {
								resolve(res);
							},
							fail: (e) => {  
								reject(e);
							}
						});
					} )
				},
				
				close(e){
				    this.imageList.splice(e,1);
				},
				chooseImage: async function() {
					if (this.imageList.length === 9) {
						let isContinue = await this.isFullImg();
						console.log("是否继续?", isContinue);
						if (!isContinue) {
							return;
						}
					}
					uni.chooseImage({
						sourceType: sourceType[this.sourceTypeIndex],
						sizeType: sizeType[this.sizeTypeIndex],
						count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length : this.count[this.countIndex],
						success: (res) => {
			
							//提交压缩,因为使用了H5+ Api,所以自定义压缩目前仅支持APP平台
							var compressd = cp_images=> {
								this.imageList = this.imageList.concat(cp_images)//压缩后的图片路径
							}
							image.compress(res.tempFilePaths,compressd);
							
							this.imageList = this.imageList.concat(res.tempFilePaths)//非APP平台不支持自定义压缩,暂时没有处理,可通过uni-app上传组件的sizeType属性压缩
							
						}
					})
				},
				isFullImg: function() {
					return new Promise((res) => {
						uni.showModal({
							content: "已经有9张图片了,是否清空现有图片？",
							success: (e) => {
								if (e.confirm) {
									this.imageList = [];
									res(true);
								} else {
									res(false)
								}
							},
							fail: () => {
								res(false)
							}
						})
					})
				},
				previewImage: function(e) {
					var current = e.target.dataset.src
					uni.previewImage({
						current: current,
						urls: this.imageList
					})
				},
				touchStart: function(e) {
					this.startX = e.mp.changedTouches[0].pageX;
				},
				
				touchEnd: function(e) {
					this.endX = e.mp.changedTouches[0].pageX;
					if (this.endX - this.startX > 200) {
						uni.navigateBack();
					}
				}
			}	
	}
</script>

<style lang="scss" scoped>
	@import url("../../../common/uni.css");
	.photo {
		background: #fff;
		min-height: 800px;
		padding-top: 30px;
	}
	.close-view {
		position: absolute;
		right: -5%;
		top: -5%;
		width: 15px;
		height: 15px;
		line-height: 15px;
		text-align: center;
		border-radius: 50%;
		background: #FF106A;
	}
	.content {
		width: 100%;
		background: #fff;
		min-height: 800px;
	}
	.comment {
		background: #fff;
		padding:  22rpx 22rpx 0 22rpx;
	    textarea {
			width: 100%;
			height: 230rpx;
			margin-top: 0;
	    }      
	}
	.btn {
		width: 95%;
		height: 80rpx;
		color: #fff;
		background: #FF106A;
		font-size: 14px;
		text-align: center;
		line-height: 80rpx;
		margin: 0 auto;
		margin-top: 30px;
		border-radius: 25px;
	}
	.uni-uploader-head {
		padding: 0 22rpx;
	}
	.uni-list:after {
		height: 0px;
	}
	.uni-list:before {		
		height: 0px;	
	}
	.uni-uploader__input-box {
		margin: 0 auto;
	}
</style>
