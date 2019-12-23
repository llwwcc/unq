<template>
	<view style="padding: 22rpx;">
		<view class="referral-header" v-for="item in homeList" :key="item.id">
			<view class="myhome-div1">
				<image :src=" item.url "/>
				<view class="photo">
					<p>{{ item.title }}</p>
					<p>{{ item.content }}</p>
				</view>
			</view>
			<view class="myhome-div2">
				<image :src=" item.url1 "/>
				<p>扫一扫二维码关注女企协会</p>
			</view>
		</view>
		<view class="referral-main">
			<p class="referral-p">我推荐的人</p>
			<view class="recom" v-for="item in recomList" :key="item.id">
				<view class="myhome-div1">
					<image :src=" item.url "/>
					<view class="photo">
						<p>{{ item.title }}</p>
						<p>{{ item.content }}</p>
					</view>
				</view>
				<view style="color: #FF0060;font-size: 12px;">{{ item.price }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				homeList: [
				],
				recomList: [
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.referral-header {
		height: 300px;
		background: #fff;
		padding: 22rpx;
		border-radius: 10px;
	}
	.myhome-div1 {
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
			font-size: $font-sm + 5upx;
			color: #1E1E1E;
			padding-left: 22rpx;
		}
	}
	.myhome-div2 {
		width: 100%;
		text-align: center;
		image {
			width: 400rpx;
			height: 400rpx;
			margin-top: 15px;
		}
	}
	.myhome-div2 p {
		color: #505050;
		font-size: $font-sm;
	}
	//推荐
	.referral-main {
		padding: 22rpx;
		background: #fff;
		margin-top: 15px;
		border-radius: 10px;
	}
	.referral-p {
		color: #1E1E1E;
		font-szie: $font-lg;
		border-bottom: 1px solid #E6E6E6;
		padding-bottom: 22rpx;
	}
	.recom {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #E6E6E6;
		padding: 22rpx 0;
	}
</style>
