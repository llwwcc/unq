<template>
	<view>
		<view class="activity-div">
				<view class="activity-ver" 
				v-for="(active,aIndex) in activeList "
				 :key="aIndex"
				 :data-index="active.id"
				 @click="toPath"
				 >
					<view @tap="show('QSPopup')">
						<view class="activity-ver-div">
							<image :src="'https://wx.zzsnqyjxh.org/api'+active.pic"/>
							<view class="activity-ver-div2">
								<h5>{{ active.title }}</h5>
								 <text class="summary">{{ active.summary }}</text>
								<p class="address">{{ active.address }}</p>	
								<p class="time">{{ active.beginTime.slice(0,10)}}</p>
							</view>
						</view>
					</view>
				</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	export default {
		data () {
			return {
				globalData: {},
				isShow: false,
				activeList:[]	
			}
		},
		onLoad() {
			this.globalData = app.globalData
			var self = this;
			self.getShaky();
			self.changeid()
			if (!app.globalData.userInfo) {
				uni.showModal({
					title: '提示',
					content: '您尚未注册，是否马上去注册页面？',
					success: function(sm) {
						if (sm.confirm) {
							uni.redirectTo({
								url: '/pages/application/member',
							})
						} else {
							uni.switchTab({
								url: '/pages/index/index'
							})
						}
					}
				})
			}
		},
		methods: {
			toPath(e){
				console.log(e)
				var targetId = e.currentTarget.dataset.index
				uni.navigateTo({
					url:"/pages/enroll/enroll-details?targetId="+targetId
				})
			},
			//活动列表
			getShaky() {
				var that = this;
				var url=" https://wx.zzsnqyjxh.org/test";
				var pageNum=1;
				var pageSize=1;
				if(pageNum<=pageSize){
					pageSize++
				}
				console.log(pageSize)
				uni.request({
					url:'https://wx.zzsnqyjxh.org/test/app/huodong/findPage',
					data:{
						pageNum:pageNum,
						pageSize:pageSize
					},
					method:"POST",
					success: (res) => {
						var activeList = res.data.data.content;
						that.activeList = activeList;
						console.log('.......',that.activeList)
						
					}
				})
			},
			changeid(){
			 	self.islogin = uni.setStorageSync('islogin', true);//登录状态
			 	var upname = uni.setStorageSync('HCuname'); //手机号
				if(self.is_login==true || self.is_login=='true') {
			 		this.isShow = false;
			 	} else {
			 		this.isShow = true;
			 	}
			},
			//弹出层
			show(ref) {
				this.$refs[ref].show();
			}
		}
	}
</script>

<style lang="scss" scoped>
	//弹出层
	button{
		margin: 20rpx;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.content p {
		font-size: 16px;
		margin-top: 15px;
	}
	.content p:nth-of-type(2) {
		color: #FF0060;
	}
//头部
.router {
	display: block;
	width: 100%;
	height: 100%;
}
.activity-div {
	padding: 0 22rpx; 
	.activity-ver {
		width: 100%;
		height: 580upx;
		margin-top: 15px;
		background: #fff;
		border-radius: 20upx;
		overflow: hidden;
		.activity-ver-div {
			width: 100%;
			height: 180px;
			image {
				width: 100%;
				height: 150px;
			}
		}
	}
}
.activity-ver-div .activity-ver-div2 {
	padding: 22rpx;
	.summary {
		width: 100%;
		background: #fff;
		text-align: left;
		margin-top: 10px;
		font-size: $font-sm + 6upx;
		padding-left: 50rpx;
	}
	.address {
		margin-top: 10upx;
		background: url(../../static/list_Position.png) no-repeat left center;
		font-size: $font-sm + 5upx;
		padding-left: 50rpx;
	}
	.time {
		margin-top: 8upx;
		background: url(../../static/list_Time.png) no-repeat left center;
		font-size: $font-sm + 5upx;
		padding-left: 50rpx;
	}
}
</style>
