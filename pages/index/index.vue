<template>
	<view>
		<!-- 头部轮播 -->
	    <view class="uni-padding-wrap">
	        <view class="page-section swiper">
	            <view class="page-section-spacing">
	               <swiper class="swiper" :indicator-dots="true" :autoplay="true"  :duration="2000">
	                    <swiper-item class="prr" v-for="(item,index) in swiper" :key="index">
	                        <view class="swiper-item uni-bg-red"><img :src="item.imgUrl"/></view>
	                    </swiper-item>
	                 </swiper>
	            </view>
	        </view>
	    </view>
		<!-- 活动 -->
		<view class="activity">
			<view class="activity-sent">
				<view>{{ status.poper }}</view>
				<navigator url="/pages/shaky/shaky" style="width: 50%;">
					<view style="text-align: right;color: #FF0060;">{{ status.more }}&nbsp;></view>
				</navigator>
			</view>
			<view class="huodong" 
			v-for="item in activeList"
			 :key="item.id" 
			 :data-index ="item.id"
			 @click="toPath"
			 >
				<view class="activity-peer">
					<image :src="'https://wx.zzsnqyjxh.org/test' +item.pic "/>
				</view>
				<view class="activity-ent">
					<h5>{{ item.title }}</h5>
					<p style="margin-top: 10px;">{{ item.summary }}</p>
				</view>
			</view>
		</view>
		<!-- 商品 -->
		<view class="shop">
			<view class="activity-sent">{{ status.shop }}</view>
			<view class="shopping" 
			v-for="(item, index) in hotShop" 
			:key="index"
			:data-index="item.id"
			@click="toDeatail"
			>
				<view class="shop-div">
					<image :src=" item.goodsImg "></image>
					<view class="shop-div1">
						<h5>{{ item.goodsName }}</h5>
						<p>{{ item.goodsDetail }}</p>
						<view class="shop-div2">
							<text class="qinang">抢购价:</text>
							<text class="jiage">￥{{ item.goodsBuyingPrice }}</text>
							<!-- 本地图片站位 -->
							<image src="https://wx.zzsnqyjxh.org/test/upload/static/list_Button.png"/>
						</view>
					</view>
				</view>
			</view>
			<view class="loadingMore" @click="loadingMore" v-if="isShow">
				加载更多
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
		    return {
				vaule:'',
				// 热门商品
				hotShop:[],
				// 加载更多是否显示
				isShow:true,
				// 获取活动列表
				activeList:[],
				//轮播图
				swiper:[],
				 indicatorDots: true,
			
				//活动
				status: {
					poper: '最新活动',
					shop: '热门商品',
					more: '更多活动'
				}
		    }
		},
		
		
 		onLoad() {
			// 获取最热门商品
			this.getHotShop()
			// 获取活动列表
			this.getActive()
			//轮播图
			this.carousel()
			
		},
		methods: {  
			// 跳转到详情页面
			toDeatail(e){
				var id = e.currentTarget.dataset.index;
				uni.navigateTo({
					url:'../shop/shop-details?id='+id
				})
			},
			// 轮播图
			 carousel(){
				var that =this;
				uni.request({
					url:"https://wx.zzsnqyjxh.org/test/app/appGoodsImage/findByImg",
					method:"GET",
					success(res) {
						var Swiper = res.data.data.data
						that.swiper = Swiper;
					}
				})
			},
			// 跳转页面详情
			toPath(e){
				var targetId = e.currentTarget.dataset.index
				uni.navigateTo({
					url:"/pages/enroll/enroll-details?targetId="+targetId
				})
			},
			// 获取活动列表
			getActive(){
				var that = this;
				var url=" https://wx.zzsnqyjxh.org/test";
				var pageNum=1;
				var pageSize=1;
				if(pageNum<=pageSize){
					pageSize++
				}
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
					}
				})
				
			},
			// 点击加载更多加载更多商品
				loadingMore(){
					var that =this;
					var url=" https://wx.zzsnqyjxh.org/test"
					uni.request({
						url:"https://wx.zzsnqyjxh.org/test/app/Goods/findRecommend",
						method:"GET",
						success(res) {
							var hotShop = res.data.data.data;
							that.hotShop = hotShop;
							that.isShow=false;
							uni.showToast({
								title:"已经加载完毕",
								duration:1500
							})
						}
					})
				},
			// 获取最热门商品
			getHotShop(){
				var that =this;
				uni.request({
					url:"https://wx.zzsnqyjxh.org/test/app/Goods/findRecommend",
					method:"GET",
					success(res) {
						console.log(res)
						var hotShop = res.data.data.data;
						var newArr =hotShop.slice(0,4)
						that.hotShop = newArr
					}
				})
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.input{
		display: flex;
		flex-direction: row;
		justify-content: center;
		width:200upx;
		height: 60upx;
		background: #007AFF;
	}
	.input input{
		width: 100;
		height: 100%;
		padding-left: 20upx;
		border: 2upx solid #000000;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50upx;
	}
	.swiper-item  {
		height: 100%;
	}
	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
	.prr {
		background: red;
		img {
			width: 100%;
			height: 100%;
		}
	}
	.cate-section {
		height: 200px;
		padding: 30rpx 22rpx; 
		.purl {
		 	display: block;
		 	width: 50%;
		 	height: 50%;
		 	float: left;
		 }
		.cate-item {
			float: left;
			width: 100%;
			height: 100%;
			position: relative;
			image {
				width: 100%;
				height: 100%;
			}
			text {
				position: absolute;
				top: 15%;
				left: 10%;
				font-size: $font-sm + 5upx;
				color: #fff;
			}
		}
	}
	//活动
	.activity {
		padding: 30rpx 30rpx;
		background: #fff;
	}
	.activity-sent {
		display: flex;
		justify-content: space-between;
		height: 20px;
		line-height: 20px;
		border-left: 3px solid #FF0060;
		padding-left: 14upx;
		view {
			font-size: $font-sm + 10upx;
			font-weight: bold;
		}
	}
	.huodong {
		display: flex;
		justify-content: space-between;
		margin-top: 15px;
	}
	.activity-peer {
		width: 35%;
		height: 160upx;
		border-radius: 10upx;
		overflow: hidden;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.activity-ent {
		margin-left: 20upx;
		width: 65%;
		text-align: left;
		p {
			font-size: $font-sm + 5upx;
			color: #919191;
		}
	}
	//商品
	.shop {
		padding: 12upx 30upx;
		background: #fff;
		// margin-top: 15px;
		.activity-sent {
			height: 20px;
			line-height: 20px;
			border-left: 3px solid #FF0060;
			padding-left: 14upx;
			font-size: $font-sm + 10upx;
			font-weight: bold;
		}
	}
	.shop-div {
		width: 95%;
		height: 180upx;
		background: #fff;
		margin-top: 10px;
		display: flex;
		justify-content: flex-start;
		border-bottom: 2upx solid #C8C7CC;
		image {
			margin-top: 12upx;
			width: 25%;
			height: 71%;
			border-radius: 10upx;
		}
	}
	.shop-div1 {
		margin-left: 20upx;
		h5 {
			font-size: $font-sm +6upx;
			margin-top: 4upx;
			font-weight: bold;
		}
		p {
			font-size: 10px;
			color: #727272;
			margin-top: 10upx;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
		}
	}
	.shop-div2 .qinang{
		font-size: 13px;
			color: #FF2879;
			
	}
	.shop-div2 .jiage{
		font-size: 16px;
		color: #FF2879;
		margin-left: 8upx;
	}
	.shop-div2 {
		margin-top: 6upx;

		image {
			float: right;
			width: 88px;
			height: 21px;
			margin-top: 12upx;
		}
	}
	.loadingMore{
		margin-top: 26upx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		font-size: 14px;
		color: #B2B2B2;
	}
</style>
