<template>
	<view>
		<!-- 顶部导航 -->
		<view class="topTabBar" :style="{position:headerPosition,top:headerTop}">
			<view class="grid" v-for="(grid,index) in orderType" :key="index" 
			@tap="showType(index)"
			:data-index="grid.id"
			>
				<view class="text" :class="{selected:index==targetIndex}">{{grid}}</view>
			</view>
		</view>
		<!-- 考虑非APP端长列表和复杂的DOM使用scroll-view会卡顿，所以漂浮顶部选项卡使用page本身的滑动 -->
		<view class="order-list">
			<view class="list">
				<!-- <view class="onorder" v-if="list.length==0">
					<image src="../../../static/img/noorder.png"></image>
					<view class="text">
						没有相关订单
					</view>
				</view> -->
				<view class="row" v-for="(row,index) in list" :key="index">
					<view class="type">{{typeText[row.type]}}</view>
					<view class="order-info">
						<view class="left">
							<image :src="row.img"></image>
						</view>
						<view class="right">
							<view class="shop-div1">
								<h5>{{ row.userMsg }}</h5>
								<p>类型:{{ row.tradeStatus }}</p>
								<p>￥{{ row.userIntegral }}</p>
								<p>积分抵20%</p>
							</view>
						</view>
						
					</view>
					<view class="btns">
						<block ><view class="default" @tap="cancelOrder(row)">取消订单</view>
						<view class="pay" @tap="toPayment(row)">付款</view></block>
						<block v-if="row.type=='back'"><view class="default" @tap="remindDeliver(row)">提醒发货</view></block>
						<!-- <block v-if="row.type=='unreceived'"><view class="default" @tap="showLogistics(row)">查看物流</view>
						<view class="pay">确认收货</view><view class="pay">我要退货</view></block>
						<block v-if="row.type=='received'"><view class="default">评价</view><view class="default">再次购买</view></block>
						<block v-if="row.type=='completed'"><view class="default">再次购买</view></block>
						<block v-if="row.type=='refunds'"><view class="default">查看进度</view></block>
						<block v-if="row.type=='cancelled'"><view class="default">已取消</view></block> -->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import serverUrl from '../../../common/serveUrl.js'
	export default {
		data() {
			return {
				targetIndex:0,
				tabbarIndex: 0,
				headerPosition:"fixed",
				headerTop:"0px",
				typeText:{
					unpaid:'等待付款',
					back:'等待商家发货',
					unreceived:'商家已发货',
					received:'等待用户评价',
					completed:'交易已完成',
					refunds:'商品退货处理中',
					cancelled:'订单已取消'
				},
				orderType: ['全部','待付款','待发货','待收货'],
				
				list:[],
				tepmPay:[],
				tabbarIndex:0
			};
		},
		onLoad(option) {
			//option为object类型，会序列化上个页面传递的参数
			console.log("option: " + JSON.stringify(option));
			let tbIndex = parseInt(option.tbIndex)+1;
			this.tabbarIndex = tbIndex;
			//兼容H5下排序栏位置
			// #ifdef H5
				let Timer = setInterval(()=>{
					let uniHead = document.getElementsByTagName('uni-page-head');
					if(uniHead.length>0){
						this.headerTop = uniHead[0].offsetHeight+'px';
						clearInterval(Timer);//清除定时器
					}
				},1);
			// #endif
			
			this.loading()
			
		},
		onPageScroll(e){
			return;
			//兼容iOS端下拉时顶部漂移
			this.headerPosition = e.scrollTop>=0?"fixed":"absolute";
		},
		methods: {
			loading(){
				var that = this;
				var url =serverUrl.serverUrl
				console.log(url)
				uni.request({
					url: url+"/app/order/myOrder?status=1&userId=1",
					method:"POST",
					success(res) {
						var infon = res.data.data.data
						that.list  = infon
					}
				})
			},
			showType(index){
				var that = this;
				var url =serverUrl.serverUrl
				this.targetIndex =index;
				var status = index+1
				// console.log(status)
				uni.request({
					url:url+"/app/order/myOrder?status="+status+"&userId=1",
					method:"POST",
					success(res) {
						var tepmPay = res.data.data.data;
						that.list = tepmPay;
					}
				})
				
			},
			showLogistics(row){
				
			},
			remindDeliver(row){
				uni.showToast({
					title:'已提醒商家发货'
				})
			},
			cancelOrder(row){
				
				var id = row.id
				var that = this;
				var url=serverUrl.serverUrl;
				uni.showModal({
					title: '取消订单',
					content: '确定取消此订单？',
					success: (res)=>{
						if (res.confirm) {
							uni.request({
								url:url+"/app/order/cancelOrder?id="+id,
								method:"POST",
								success() {
									that.loading()
								}
								
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
				
				
				
			
			},
			doCancelOrder(ordersn){
				let typeNum = this.orderList.length;
				for(let i=0;i<typeNum;i++){
					let list = this.orderList[i];
					let orderNum = list.length;
					if(orderNum>0 && list[0].type=='unpaid'){
						for(let j=0;j<orderNum;j++){
							if(this.orderList[i][j].ordersn == ordersn){
								this.orderList[i][j].type = 'cancelled';
								break;
							}
						}
					}
					
				}
			},
			toPayment(row){
				//本地模拟订单提交UI效果
				uni.showLoading({
					title:'正在获取订单...'
				})
				let paymentOrder = [];
				paymentOrder.push(row);
				setTimeout(()=>{
					uni.setStorage({
						key:'paymentOrder',
						data:paymentOrder,
						success: () => {
							uni.hideLoading();
							uni.navigateTo({
								// url:'../../pay/payment/payment?amount='+row.payment
								url:"./pay"
							})
						}
					})
				},500)
			}
		}
	}
</script>

<style lang="scss">
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
page{
	background-color: #f3f3f3;
}
.topTabBar{
	width: 100%;
	position: fixed;
	top: 0;
	z-index: 10;
	background-color: #f8f8f8;
	height: 80upx;
	display: flex;
	justify-content: space-around;
	.selected{
		border-bottom: 2upx solid red;
	}
	.grid{
		width: 20%;
		height: 80upx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #444;
		font-size: 28upx;
		.text{
			height: 76upx;
			display: flex;
			align-items: center;
			&.on{
				color: #f06c7a;
				border-bottom: solid 4upx #f06c7a;
			}
		}
		
	}
}
.order-list{
	margin-top: 80upx;
	padding-top: 20upx;
	width: 100%;
	.list{
		width: 94%;
		margin: 0 auto;
		.onorder{
			width: 100%;
			height: 50vw;
			display: flex;
			justify-content: center;
			align-content: center;
			flex-wrap: wrap;
			image{
				width: 20vw;
				height: 20vw;
				border-radius: 100%;
			}
			.text{
				width: 100%;
				height: 60upx;
				font-size: 28upx;
				color: #444;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
		.row{
			width: calc(100% - 40upx);
			padding: 10upx 20upx;
			border-radius: 10upx;
			background-color: #fff;
			margin-bottom: 20upx;
			.type{
				font-size: 26upx;
				color: #ec652f;
				height: 50upx;
				display: flex;
				align-items: center;
			}
			.order-info{
				width: 100%;
				display: flex;
				.left{
					flex-shrink: 0;
					width: 25vw;
					height: 25vw;
					image{
						width: 25vw;
						height: 25vw;
						border-radius: 10upx;
					}
				}
				.right{
					width: 100%;
					margin-left: 10upx;
					position: relative;
					.name{
						width: 100%;
						font-size: 28upx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}
					.spec{
						color: #a7a7a7;
						font-size: 22upx;

					}
					.price-number{
						position: absolute;
						bottom: 0;
						width: 100%;
						display: flex;
						justify-content: flex-end;
						font-size: 22upx;
						color: #333;
						display: flex;
						align-items: flex-end;
						.price{
							font-size: 24upx;
							margin-right: 5upx;
						}
						
					}
				}
			}
			.detail{
				display: flex;
				justify-content: flex-end;
				align-items: flex-end;
				height: 60upx;
				font-size: 26upx;
				.sum{
					padding: 0 8upx;
					display: flex;
					align-items: flex-end;
					.price{
						font-size: 30upx;
					}
				}
				
			}
			.btns{
				height: 80upx;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				view{
					min-width: 120upx;
					height: 50upx;
					padding: 0 20upx;
					border-radius: 50upx;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 28upx;
					margin-left: 20upx;
				}
				.default{
					border: solid 1upx #ccc;
					color: #666;
				}
				.pay{
					border: solid 1upx #ec652f;
					color: #ec652f;
				}
			}
		}
	}
}
</style>
