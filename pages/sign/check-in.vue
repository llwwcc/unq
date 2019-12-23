<template>
	<view class="content">
		<view class="sign-div">
			<image :src="imgUrl+'/upload/static/banner.png'"/>
			<p>位置超过5公里</p>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl:this.$imgUrl
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		height: 100%;
	}
	.sign-div {
		width: 100%;
		height: 300rpx;
		margin: 50% auto;
		text-align: center;
	}
	.sign-div image {
		width: 80px;
		height: 80px;
		border-radius: 50%;
	}
	.sign-div p {
		font-size: $font-sm;
		color: #ccc;
		margin-top: 15px;
	}
</style>
