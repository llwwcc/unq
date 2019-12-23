<template>
	<view>
		<view class="fulfil">已发货</view>
		<view class="order-header">
			<view class="order-header-div" v-for="item in list" :key="item.id">
				<p>{{ item.name }}<text>{{ item.number }}</text></p>
				<p>{{ item.address }}</p>
				<p>{{ item.kuaidi }}</p>
			</view>
		</view>
		<view class="order-main" v-for="item in fulfilList" :key="item.id">
			<view class="shop-div">
				<image :src=" item.url "></image>
				<view class="shop-div1">
					<h5>{{ item.title }}</h5>
					<p>类型:{{ item.leixing }}</p>
					<p>￥{{ item.price }}</p>
					<p>积分抵{{ item.hunder }}</p>
				</view>
			</view>
			<view class="shop-div2">
				<view>商品总价<text>￥{{ item.priced }}</text></view>
				<view>快递运费<text>￥{{ item.yunfei }}</text></view>
				<view>积分抵扣<text>-{{ item.jifen }}</text></view>
				<view>实付款<text>￥{{ item.fukuan }}</text></view>
			</view>
		</view>
		<view class="order-footer">
			<p class="order-p">订单信息</p>
			<view class="order" v-for="item in orderList" :key="item.id">
				<p>返积分:<text>获得{{ item.jifen }}积分</text></p>
				<p>订单编号:<text>{{ item.bianhao }}</text></p>
				<p>创建时间:<text>{{ item.time1 }}</text></p>
				<p>付款时间:<text>{{ item.time2 }}</text></p>
				<p>发货时间:<text>{{ item.time3 }}</text></p>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{
						name: '星海',
						number: '1234567',
						address: '河南省郑州市梧桐街22号'
					}
				],
				fulfilList: [
				],
				orderList: [
					{
						jifen: '5',
						bianhao: '123456789',
						time1: '2019-12-23',
						time2: '2019-03-34',
						time3: '2019-45-65'
					}
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.fulfil {
		height: 100rpx;
		line-height: 100rpx;
		padding: 0 22rpx;
		background: #FF0060;
		color: #fff;
	}
	.order-header {
	    width: 95%;
		height: 79px;
		padding: 0 22rpx;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.order-header-div {
		p {
			font-size: $font-sm + 10upx;
		}
		p:nth-of-type(1) {
			margin-bottom: 15rpx;
			text {
				padding-left: 50rpx;
			}
		}
	}
	.order-header-div p:nth-of-type(3) {
		color: #FF0060;
	}
	.shop-div2 {
		margin-top: 15px;
	}
	.shop-div2 view {
		height: 80rpx;
		line-height: 80rpx;
		color: #323232;
		font-size: $font-sm + 5upx;
		border-top: 1px solid #E6E6E6;
		text {
			float: right;
		}
	}
	.shop-div2 view:nth-of-type(4) {
		color: #1E1E1E;
		font-size: $font-lg + 5upx;
		text {
			color: #FF0060;
		}
	}
	.order-main {
		background: #fff;
		padding: 22rpx;
		margin-top: 15px;
	}
	.shop-div {
		display: flex;
		justify-content: space-between;
		image {
			width: 100px;
			height: 100px;
		}
	}
	.shop-div1 {
		margin-right: 15px;
		h5 {
			font-size: 14px;
			margin-top: 5px;
		}
		p {
			font-size: 10px;
			margin-top: 15rpx;
		}
		p:nth-of-type(1) {
			color: #323232;
		}
		p:nth-of-type(2) {
			color: #FF0060;
			font-size: 17px;
		}
		p:nth-of-type(3) {
			color: #FF0060;
		}
		image {
			width: 50%;
			height: 50rpx;
			margin-top: 22rpx;
		}
	}
	//订单信息
	.order-footer {
		background: #fff;
		margin-top: 15px;
		padding: 22rpx;
		min-height: 500rpx;
	}
	.order-p {
		height: 30px;
		line-height: 30px;
		padding-left: 22rpx;
		color: #000000;
		font-size: $font-lg + 5upx;
		border-left: 3px solid #FF0060;
	}
	.order p {
		height: 80rpx;
		line-height: 80rpx;
		color: #323232;
		font-size: $font-sm + 5upx;
		border-bottom: 1px solid #E6E6E6;
		position: relative;
		text {
			position: absolute;
			left: 50%;
		}
	}
</style>
