<template>
	<view>
		<view class="myhome">
			<view class="myhome-div">
				<view class="myhome-div1">
					<!-- 头像 -->
					<image :src=" globalData.userInfo.headImgUrl "/>
					<view class="photo">
						<p>{{  globalData.userInfo.nickName }}</p>
					</view>
				</view>
				<!-- <view class="myhome-div2"> 
					<image :src=" item.url1 "/>
				</view> -->
			</view>
		</view>
		<view class="myhome-main">
			<view class="myhome-main-div" @click="navck(item.id)" v-for="item in mainList" :key="item.id">
				<p><text>{{ item.status }}</text></p>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data () {
			return {
				globalData:{},
				mainList: [
					{ status: '我的会员', id:1},
					// { status: '缴费记录', id:2},
					{ status: '我的资料', id:2},
					{ status: '我的报名', id:3},
					// { status: '我的积分', id:5},
					// { status: '我的订单', id:6},
					// { status: '我的推荐码', id:7},
				],
			}
		},
		onLoad(options) {
		    this.globalData = app.globalData
		},
		// 模态框显示隐藏
		showModal(e) {
		    this.setData({
		      modalName: e.currentTarget.dataset.target
		    })
		},
		hideModal(e) {
		    this.setData({
		      modalName: null
		    })
		},
		onTabItemTap() {
		    if (app.globalData.userInfo){
		       return
		    }
		    uni.showModal({
		        title: '提示',
		        content: '您尚未注册，是否马上去注册页面？',
		        success: function (sm) {
					if (sm.confirm) {
					    uni.redirectTo({
					       url: '/pages/application/member',
					    })
					} else{
					    uni.switchTab({
					       url: '/pages/index/index'
					    })
					}
				},
			})
		},
		methods: {
			puer(id) {
				if (id == 1) {
					uni.navigateTo({
						url: '/pages/myhome/dues'
					})
				} 
			},
			navck(id) {
				if (id == 2) {
					uni.navigateTo({
						url: '/pages/myhome/means/means'
					})
				} 
				else if (id == 3) {
					uni.navigateTo({
						url: '/pages/myhome/taken/enroll'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myhome {
		height: 200rpx;
		padding: 22rpx;
		position: relative;
		background-image: linear-gradient(to right, #ED648E , #EA64B1);
	}
	.myhome-div {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-between;
	}
	.myhome-div1 {
		width: 80%;
		height: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		border-radius: 50%;
		image {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
		}
	}
	.photo {
		p {
			width: 100%;
			font-size: $font-sm + 5upx;
			color: #fff;
		}
	}
	.myhome-div2 {
		width: 50%;
		text-align: right;
		image {
			width: 100rpx;
			height: 100rpx;
			margin-top: 20%;
		}
	}
	.myhome-main {
		padding: 0 22rpx;
	}
	.myhome-main-div {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		
	}
	.myhome-main-div p {
		width: 100%;
		font-size: $font-sm + 5upx;
		border-bottom: 1px solid #D2D2D2;
		background: url(../../../static/image_arrow_home.png) no-repeat right;
		background-size: 8px;
		text {
			padding-left: 62rpx;
		}
	}
	.myhome-main-div:nth-of-type(1) {
		background: url(../../../static/list_Member.png) no-repeat left;
	}
	.myhome-main-div:nth-of-type(2) {
		background: url(../../../static/list_Record.png) no-repeat left;
	}
	.myhome-main-div:nth-of-type(3) {
		background: url(../../../static/list_Data.png) no-repeat left;
	}
	.myhome-main-div:nth-of-type(4) {
		background: url(../../../static/sup.png) no-repeat left;
	}
	.myhome-main-div:nth-of-type(5) {
		background: url(../../../static/list_Integral.png) no-repeat left;
	}
	.myhome-main-div:nth-of-type(6) {
		background: url(../../../static/list_Order.png) no-repeat left;
	}
	.myhome-main-div:nth-of-type(7) {
		background: url(../../../static/list_Recommendation.png) no-repeat left;
	}
</style>
