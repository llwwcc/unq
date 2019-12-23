<template>
	<view>
		<view class="means">
			<view class="means-head-l1"  @click="btnClick">
				<text :class="{'color':1 == anchorIndex}" data-index="1">个人信息</text>
				<text :class="{'color':2 == anchorIndex}" data-index="2">企业信息</text>
			</view>
			<view class="means-head-l2" v-show="isShow">
				<!-- 头像 -->
				<view class="photo" @click="operator">
					<p>头像</p>
					<image :src="url"/>
				</view>
				<view class="manage" v-for="item in meansList" :key="item.id">
					<p>昵称<text>{{ item.username }}</text></p>
					<p>年龄<text>{{ item.age }}</text></p>
					<p>政治面貌<text>{{ item.mianmao }}</text></p>
					<p>学历<text>{{ item.study }}</text></p>
					<p>民族<text>{{ item.nation }}</text></p>
					<p>担任社会职务<text>{{ item.society }}</text></p>
					<p>微信号<text>{{ item.weixin }}</text></p>
					<p>手机号<text>{{ item.phone }}</text></p>
					<p>邮箱<text>{{ item.email }}</text></p>
				</view>
			</view>
			<view class="means-head-l3" v-show="!isShow">
				<view class="photo">
					<p>Logo</p>
					<image :src="url"/>
				</view>
				<view class="manage" v-for="item in manageList" :key="item.id">
					<p>企业名称<text>{{ item.name }}</text></p>
					<p>职务<text>{{ item.zhiwu }}</text></p>
					<p>企业地址<text>{{ item.address }}</text></p>
					<p>企业所有制性质<text>{{ item.xingzhi }}</text></p>
					<p>行业类别<text>{{ item.leibie }}</text></p>
				</view>
				<view class="manage-p" v-for="item in list" :key="item.id" @click="navck(item.id)">
					<p>{{ item.status }}</p>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				anchorIndex: '1',
				isShow: true,
				url: '../../../static/mine_icon_head portrait.png',
				//个人信息
				meansList: [
					{
						username: '陈经理',
						age: '34岁',
						mianmao: '党员',
						study: '本科',
						nation: '汉族',
						society: '无',
						weixin: '123456',
						phone: '123456',
						email: '123456@qq.com'
					}
				],
				//企业信息
				manageList: [
					{
						name: '郑州星海科技有限公司',
						zhiwu: '经理',
						address: '高新区',
						xingzhi: '民营',
						leibie: '房地产业'
					}
				],
				list: [
					{ status: '主营业务', id: 1 },
					{ status: '公司产品', id: 2 },
					{ status: '企业信息', id: 3 },
					{ status: '企业相册', id: 4 }
				]
			}
		},
		methods: {
			//点击按钮变色
			btnClick(e) {
				if(e.target.dataset.index != 2 ){
				    this.anchorIndex = 1;
				}else{
				    //获取当前点击事件的下标
				    this.anchorIndex =  e.target.dataset.index
				}
				if (e.target.dataset.index == 2) {
					this.isShow = false
				} else {
					this.isShow = true
				}
			},
			navck(id) {
				if (id == 1) {
					uni.navigateTo({
						url: '/pages/myhome/means/firm'
					})
				} else if (id == 3) {
					uni.navigateTo({
						url: '/pages/myhome/means/manage'
					})
				} else if (id == 4) {
					uni.navigateTo({
						url: '/pages/myhome/means/album'
					})
				} else if (id == 2) {
					uni.navigateTo({
						url: '/pages/myhome/means/product'
					})
				}
			},
			// 修改头像
			operator() {
				// const globalUser = this.getGlobalUser("globalUser");
				uni.showActionSheet({
					itemList: ["查看我的头像", "从相册选择上传"],
					success: res => {
						const index = res.tapIndex;
						if (index == 0) {
							// 预览头像
							let faceArr = [];
							faceArr.push(globalUser.faceImage);
							uni.previewImage({
								urls: faceArr,
								current:faceArr[0]
							})
						} else if (index == 1) {
							// 选择上传头像
							uni.chooseImage({
								count:1,
								sizeType:["compressed"],
								sourceType: ["album"],
								success: res => {
									// 获得临时路径
									const tempFilePath =  res.tempFilePaths[0];
									uni.navigateTo({
										url: "../meFace/meFace?tempFilePath=" + tempFilePath
									});
									uni.navigateTo({
										url: "../faceCrop/faceCrop?tempFilePath=" + tempFilePath
									});
								}
							});
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.means-head-l1 .color {
		color: #FF0060;
		border-bottom: 1px solid #FF0060;
	}
	.means {
		background: #fff;
	}
	.means-head-l1{
		width: inherit;
		height: 85rpx;
		line-height: 85rpx;
		cursor: pointer;
		text-align: center;
		border-bottom: 1px solid #F5F5F5;
	}
	.means-head-l1 text{
		float: left;
		display: block;
		width: 50%;
	    font-size: $font-sm + 5upx;
	    color: black;
	}
	.means-head-l2 {
		padding: 22rpx;
		p {
			height: 80rpx;
			line-height: 80rpx;
			color: #1E1E1E;
			font-size: $font-sm + 5upx;
			border-bottom: 1px solid #E6E6E6;
			position: relative;
		}
	}
	.means-head-l3 {
		padding: 22rpx;
		p {
			height: 80rpx;
			line-height: 80rpx;
			color: #1E1E1E;
			font-size: $font-sm + 5upx;
			border-bottom: 1px solid #E6E6E6;
			position: relative;
		}
	}
	.means-head-l2 text,
	.means-head-l3 text{
		position: absolute;
		left: 45%;
	}
	.manage-p {
		background: url(../../../static/image_arrow_mine.png) no-repeat right;
		background-size: 8px;
	}
	.photo {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: url(../../../static/image_arrow_mine.png) no-repeat right;
		background-size: 8px;
		border-bottom: 1px solid #E6E6E6;
		p {
			border: none;
		}
	}
	.photo image {
		width: 50px;
		height: 50px;
		border-radius: 5px;
		margin-right: 20px;
	}
</style>
