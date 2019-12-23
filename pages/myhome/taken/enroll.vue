<template>
	<view class="enroll-page">
		<view class="enroll" v-for="item in list" :key="item.id">
			<view class="enroll-ent">
				<p>活动名称:<text>{{ item.title }}</text></p>
				<p>活动时间:<text>{{ item.beginTime.slice(0,10) }}</text></p>
				<p>活动地址:<text>{{ item.address }}</text></p>
				<p>{{ item.timeLabel }}</p>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	export default {
		data () {
			return {
				list:[],
				globalData: {},
				
			}
		},
		onLoad(option) {
			this.globalData=app.globalData;
			appUserId:this.globalData.userInfo.id
			// 加载我的报名活动
			var that = this;
			var id = that.userId;
			var pageNum=1;
			var pageSize=1;
			if(pageNum<=pageSize){
				pageSize++
			}
			uni.request({
				url:"https://wx.zzsnqyjxh.org/test/app/huodong/findPageByUserId",
				data:{
					pageNum:pageNum,
					pageSize:pageSize,
					appUserId:this.globalData.userInfo.id
				},
				method:"POST",
				success(res) {
					console.log(res.data.data.content)
					console.log(res)
					var list = res.data.data.content;
					that.list = list;
				}
			})
			
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.enroll-page {
		padding: 0 22rpx;
	}
	.enroll {
		height: 200rpx;
		margin-top: 10px;
		background: #fff;
		padding: 22rpx;
		border-radius: 10px;
	}
	.enroll-ent {
		p {
			font-size: $font-sm + 5upx;
			color: #323232;
			margin-top: 5px;
		}
	}
	.enroll-ent p:nth-of-type(4) {
		color: #FF0060;
		text-align: center;
		margin-top: 10px;
	}
</style>
