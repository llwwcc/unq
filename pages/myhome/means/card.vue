<template>
	<view>
		<view class="grace-idcard-main">
			<view class="grace-idcard-text">
				身份证照片 ( 正面 )
			</view>
			<view class="grace-idcard-items">
				<view class="grace-idcard-uper-btn" @tap="selectImg1">
					<view class="img"><image src="../imgUrl+'/upload/static/camera.png" mode="widthFix" /></view>
					<view class="text">拍摄或选择照片</view>
				</view>
				<view class="grace-idcard-preview">
					<image :src="idCard1"  @tap="previewImg1" mode="widthFix"></image>
				</view>
			</view>
			<view class="grace-idcard-text">
				身份证照片 ( 背面 )
			</view>
			<view class="grace-idcard-items">
				<view class="grace-idcard-uper-btn" @tap="selectImg2">
					<view class="img"><image src="imgUrl+'/upload/static/camera.png'" mode="widthFix" /></view>
					<view class="text">拍摄或选择照片</view>
				</view>
				<view class="grace-idcard-preview">
					<image :src="idCard2" @tap="previewImg2" mode="widthFix" />
				</view>
			</view>
			<view class="grace-idcard-text">
				负责人照片 ( 正面 )
			</view>
			<view class="grace-idcard-items">
				<view class="grace-idcard-uper-btn" @tap="selectImg3">
					<view class="img"><image src="imgUrl+'/upload/static/camera.png'" mode="widthFix" /></view>
					<view class="text">拍摄或选择照片</view>
				</view>
				<view class="grace-idcard-preview">
					<image :src="idCard3"  @tap="previewImg1" mode="widthFix"></image>
				</view>
			</view>
			<view class="grace-idcard-text">
				负责人照片 ( 反面 )
			</view>
			<view class="grace-idcard-items">
				<view class="grace-idcard-uper-btn" @tap="selectImg4">
					<view class="img"><image src="imgUrl+'/upload/static/camera.png'" mode="widthFix" /></view>
					<view class="text">拍摄或选择照片</view>
				</view>
				<view class="grace-idcard-preview">
					<image :src="idCard4"  @tap="previewImg1" mode="widthFix"></image>
				</view>
			</view>
			<view style="margin-top:38upx;">
				<button type="primary" @tap="uploadCards">上传</button>
			</view>
		</view>
	</view>
</template>
<script>
var _self;
const app = getApp()
	// 获取公共域名地址
import serverUrl from '@/common/serveUrl.js';
const url = serverUrl.serverUrl;	
export default {
	data() {
		return {
			images: [],
			imgUrl:this.$imgUrl,
			idCard1 : '/upload/static/banner.png',
			idCard2 : '/upload/static/banner.png',
			idCard3 : '/upload/static/banner.png',
			idCard4 : '/upload/static/banner.png'
		};
	},
	onLoad:function(){
		_self = this;
	},
	methods: {
		selectImg1 : function() {
			uni.chooseImage({
				count:1,
				success:function(res){
					console.log(res)
					_self.idCard1 = res.tempFilePaths[0];
					this.images.push(res.tempFilePaths[0])
				}
			})
		},
		selectImg2 : function() {
			uni.chooseImage({
				count:1,
				success:function(res){
					console.log(res)
					_self.idCard2 = res.tempFilePaths[0];
					// this.images.push(_self.idCard2)
				}
			})
		},
		selectImg3 : function() {
			uni.chooseImage({
				count:1,
				success:function(res){
					console.log(res)
					_self.idCard3 = res.tempFilePaths[0];
					// this.images.push(_self.idCard3)
				}
			})
		},
		selectImg4 : function() {
			uni.chooseImage({
				count:1,
				success:function(res){
					console.log(res)
					_self.idCard4 = res.tempFilePaths[0];
					// this.images.push(_self.idCard4)
				}
			})
		},
		previewImg1 : function(){
			uni.previewImage({
				urls:[_self.idCard1]
			});
		},
		previewImg2 : function(){
			uni.previewImage({
				urls:[_self.idCard2]
			});
		},
		uploadCards : function(){
			if(this.idCard1 == "imgUrl+'/upload/static/imgs/idcard1.png'" || this.idCard2 == "imgUrl+'/upload/static/imgs/idcard2.png"){
				uni.showToast({title:"请选择身份证照片", icon:"none"});
				return;
			}
			uni.showLoading({title:"上传中"});
			uni.uploadFile({
				url: url + '/app/user/fileUpload',
				filePath: images,
				header: {
					"Content-Type": "multipart/form-data"
				},
				name: 'file',
				methods: 'POST',
				success: function (uploadFileRes) {
					// 上传成功后返回服务器端保存的路径
					console.log(uploadFileRes.data);
				}
			 });
		}
	},
}
</script>
<style>
view{font-size:28upx;}
.grace-idcard-main{margin:20upx 30upx;}
.grace-idcard-desc{line-height:2em; background:#FFFFFF; padding:20upx; border-radius:10upx;}
.grace-idcard-text{line-height:2em; margin-top:30upx;}
.grace-idcard-items{background:#FFFFFF; padding:30upx 0; display:flex; margin:30upx 0; border-radius:10upx; align-items: flex-start;}
.grace-idcard-uper-btn{width:276upx; margin:0 60upx; background:#F1F1F1; padding-bottom:10upx; border-radius:10upx; text-align:center;}
.grace-idcard-uper-btn .img{width:100upx; height:100upx; margin:0 auto; margin-top:30upx;}
.grace-idcard-uper-btn .img image{width:100upx; height:100upx;}
.grace-idcard-uper-btn .text{width:100%; margin-top:10upx; text-align:center; line-height:2em;}
.grace-idcard-preview{width:50%; margin:0 30upx;}
.grace-idcard-preview image{width:100%;}
</style>