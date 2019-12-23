<template>
	<view>
		<view class="icon">
			<image src="imgUrl+'/upload/static/success.png'"></image>
		</view>
		<view class="tis">
			订单支付成功
		</view>
		<view class="pay-amount">
			支付金额:{{amount}}元
		</view>
		<view class="back">
			<view class="btn" @tap="toUser">个人中心</view>
		</view>
		<view class="btn-group">
			<navigator url="/pages/myhome/order/order" open-type="redirect" class="mix-btn">查看订单</navigator>
			<navigator url="/pages/index/index" open-type="switchTab" class="mix-btn hollow">返回首页</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				amount:0,
				imgUrl:this.$imgUrl
			};
		},
		onLoad(e) {
			this.amount = parseFloat(e.amount).toFixed(2);
		},
		methods: {
			toUser() {
				uni.switchTab({
					url: '/pages/tabBar/user'
				});
			}
		},
	}
</script>

<style lang="scss">
view{
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}
.icon{
	width: 100%;
	margin-top: 10vw;
	image{
		width: 25vw;
		height: 25vw;
	}
}
.tis{
	width: 100%;
	margin-top: 20upx;
	font-size: 48upx;
}
.pay-amount{
	width: 100%;
	margin-top: 10upx;
	font-size: 32upx;
}
.back{
	position: absolute;
	width: 100%;
	bottom: 80upx;
	.btn{
		padding: 0 50upx;
		height: 70upx;
		border: solid 2upx #f06c7a;
		color: #f06c7a;
		align-items: center;
		border-radius: 10upx;
		font-size: 34upx;
	}
}
.btn-group{
	padding-top: 100upx;
}
.mix-btn {
	margin-top: 30upx;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 600upx;
	height: 80upx;
	font-size: $font-lg;
	color: #fff;
	background-color: $base-color;
	border-radius: 10upx;
	&.hollow{
		background: #fff;
		color: #303133;
		border: 1px solid #ccc;
	}
}
</style>
