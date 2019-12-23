<template>
	<view style="padding: 22rpx;">
		<view class="integral-header">
			<p>当前积分</p>
			<p> {{ status }} 积分</p>
		</view>
		<view class="integral-main">
			<p class="integral-p">积分明细</p>
			<view class="definite" v-for="item in definiteList" :key="item.id">
				<view class="definite-fl">
					<h5>{{ item.title }}</h5>
					<p>{{ item.status }}</p>
				</view>
				<text>{{ item.number }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				status: '1000',
				definiteList: [
					{
						title: '邀请好友开通会员',
						status: '2019年12月12日 15:30',
						number: '+1000'
					},
					{
						title: '活动准时参加',
						status: '2019年12月12日 15:30',
						number: '+60'
					},
					{
						title: '购物积分抵扣',
						status: '2019年12月12日 15:30',
						number: '-500'
					},
					{
						title: '购物返积分',
						status: '2019年12月12日 15:30',
						number: '+300'
					}
				]
			}
		},
		methods: {
			per() {
				uni.navigateTo({
					url: '/pages/integral/integral-definite'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.integral-header {
		height: 200rpx;
		background: #fff;
		color: #FF0060;
		border-top: 2px solid #fff;
	}
	.integral-header p:nth-of-type(1) {
		font-size: $font-lg;
		color: #1E1E1E;
		text-align: left;
		padding-left: 22rpx;
		font-weight: 700;
	}
	.integral-header p:nth-of-type(2) {
		font-size: $font-lg + 5upx;
		color: #FF0060;
		text-align: center;
		margin-top: 10px;
	}
	//积分明细
	.definite {
		height: 150rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #E6E6E6;
	}
	.definite-fl {
		width: 80%;
		font-size: 16px;
	}
	.definite-fl p {
		font-size: 12px;
		margin-top: 5px;
	}
	.definite text {
		font-size: 12px;
		color: #FF0060;
	}
	.integral-main {
		background: #fff;
		margin-top: 15px;
		padding: 22rpx;
	}
	.integral-p {
		color: #1E1E1E;
		font-size: $font-lg;
		border-bottom: 1px solid #E6E6E6;
		padding-bottom: 22rpx;
	}
</style>
