<template>
	<view style="padding: 22rpx;">
		<view class="taken">
			<view class="taken-head" v-for="item in takenList" :key="item.id">
				<image :src=" item.url "/>
				<view class="taken-div">
					<view>
						<p>{{ item.title }}</p>
						<p>{{ item.time }}</p>
					</view>
					<text>{{ item.price }}元</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				takenList: [
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.taken {
		padding: 22rpx;
		background: #fff;
		min-height: 387px;
		border-radius: 10px;
		
	}
	.taken-head {
		display: flex;
		padding: 22rpx 0;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #ccc;
	}
	.taken image {
		width: 80rpx;
		height: 80rpx;
	}
	.taken-div {
		width: 85%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.taken-div p {
		font-size: $font-sm;
		margin-top: 5px;
	}
	.taken-div text {
		font-size: $font-sm + 5upx;
		color: #FF0060;
	}
	.taken-div p:nth-of-type(1) {
		font-size: $font-lg;
	}
	.taken-div p:nth-of-type(2) {
		color: #bbb;
	}
</style>
