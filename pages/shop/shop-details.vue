<template>
	<view>
		<view class="shop-details">
			<image :src=" datailInfo[1].goodsImg "></image>
			<!-- 商品详情 -->
			<view class="main">
				<view class="details-integral">
					<p>抢购价:<text>￥{{ datailInfo[1].goodsBuyingPrice }}</text></p>
				</view>
				<view class="details-div">
					<p class="details-p"><text>商品详情</text></p>
					<view class="info">
						<view class="title">{{datailInfo[1].goodsName}}</view>
						<view class="infoDes">{{datailInfo[1].goodsDetail}}</view>
					</view>
					<view class="details-div-main">
						<p>品牌<text>{{ datailInfo[1].goodsBrand }}</text></p>
						<p>产量<text>{{ datailInfo[1].goodsSale }}</text></p>
						<p>净含量<text>{{ datailInfo[1].goodsWeight }}</text></p>
						<p>包装方式<text>{{ datailInfo[1].goodsPackage }}</text></p>
					</view>
				</view>
			</view>
			<view class="img">
				<image :src=" datailInfo[1].detail" mode="widthFix" style="width: 100%;"></image>
				
			</view>
			
			<!-- 猜你喜欢 -->
			<view class="details-like">
				<p class="like-p">大家还喜欢</p>
				
				<view class="like-box">
					<view class="details-like-div" 
					v-for="item in datailInfo[2].data"
					 :key="item.id"
					 :data-index="item.id"
					 @click="toDatil"
					 >
						<view class="liked-shop" >
							<image :src=" item.goodsImg "/>
							<h5 >{{ item.goodsName }}</h5>
							<p class="des">{{ item.goodsDetail }}</p>
							<view class="hot">
								<text >￥{{ item.goodsBuyingPrice }}</text>
								<text id="recommed">热销推荐</text>
							</view>
							
						</view>
					</view>	
					
				</view>
			
			</view>
			<button type="primary" @tap="buy" class="btn">立即购买</button>
		</view>
		<!-- 规格-模态层弹窗 -->
		<view class="popup spec" :class="specClass" @touchmove.stop.prevent="discard" @tap="hideSpec">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer" @tap.stop="discard">
				<view class="content">
					<view>
						<view class="a-t">
							<image :src="datailInfo[1].goodsImg"></image>
							<view class="right">
								<h5 style="margin-top: 5px;font-size: 12px;color:#1E1E1E">{{ shopInfo.goodsName }}</h5>
								<text class="price">¥{{ datailInfo[1].goodsBuyingPrice}}</text>
								<text class="stock">库存：{{ datailInfo[1].goodsStock }}件</text>
							</view>
						</view>
					
					</view>
					<view class="length">
						<view class="text">数量</view>
						<view class="number">
							<view class="sub" @tap.stop="sub">
								<view class="icon jian">-</view>
							</view>
							<view class="input" @tap.stop="discard">
								<input type="number" v-model="shopInfo.number" />
							</view>
							<view class="add"  @tap.stop="add">
								<view class="icon jia">+</view>
							</view>
						</view>
					</view>
				</view>
				<button class="button" @click="toggleSpec">立即购买</button>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp();
	// 获取公共域名地址
	import serverUrl from '@/common/serveUrl.js';
	
	export default {
		data () {
			return {
				pic:'',
				globalData: {},
				usid: '',
				id: '',
				shopInfo:'',
			
				specClass: '',//规格弹窗css类，控制开关动画
				selectSpec:null,//选中规格
				sumPrice: 0,
				// 用户选择
				activeClass: null, 
				datailInfo: '',
				goodsList:[],
				imgUrl:this.$imgUrl
				// 商品信息
			}
		},
		
		onLoad(option) {
			this.globalData = app.globalData
			var id = option.id;
			this.usid = option.id
			console.log(id)
			var that = this;
			const url = serverUrl.serverUrl;
			// if (!app.globalData.userInfo) {
			// 	uni.showModal({
			// 		title: '提示',
			// 		content: '您尚未注册，是否马上去注册页面？',
			// 		success: function(sm) {
			// 			if (sm.confirm) {
			// 				uni.redirectTo({
			// 					url: '/pages/application/member',
			// 				})
			// 			} else {
			// 				uni.switchTab({
			// 					url: '/pages/index/index'
			// 				})
			// 			}
			// 		}
			// 	})
			// }
			uni.request({
				// url: url + '/app/Goods/findDetail',
				url: "https://wx.zzsnqyjxh.org/test/app/Goods/findDetail?id="+id,
				method: 'POST',
				success: res => {
					if (res.data.code == 200) {
						console.log(res)
						var datailInfo =res.data.data;
						that.datailInfo = datailInfo
						// that.pic = res.data.data;
							// console.log(that.datailInfo[1].detail)
							that.pic=that.datailInfo[1].detail
							console.log(that.pic)
					}
				}
			});
		},
		methods: {
			// 点击大家还喜欢商品
			toDatil(e){
				console.log(e)
				var id = e.currentTarget.dataset.index;
				uni.redirectTo({
					url: './shop-recommed?id='+id
				});
			},
			//查询商品详情
			shopDetail() {
				
			},
			//立即购买
			toggleSpec() {
				// if(this.activeClass==null){
				// 	return this.showSpec(()=>{
				// 		this.toConfirmation();
				// 	});
				// }
				this.toConfirmation();
			},
			//立即购买
			buy(){
				if(this.selectSpec==null){
					return this.showSpec(()=>{
						this.toConfirmation();
					});
				}
				this.toConfirmation();
			},
			//选择规格
			getItem(index){
				this.selectSpec = index;
			},
			//减少数量
			sub(){
				if(this.shopInfo.number<=1){
					return;
				}
				this.shopInfo.number--;
				var num = this.shopInfo.number
			},
			//增加数量
			add(){
				this.shopInfo.number++;
				var num = this.shopInfo.number
			},
			//规格弹窗
			showSpec(fun) {
				console.log('show');
				this.specClass = 'show';
				this.specCallback = fun;
			},
			specCallback(){
				return;
			},
			//关闭规格弹窗
			hideSpec() {
				this.specClass = 'hide';
				//回调
		
				this.selectSpec&&this.specCallback&&this.specCallback();
				this.specCallback = false;
				setTimeout(() => {
					this.specClass = 'none';
				}, 200);
			},
			//跳转确认订单页面
			toConfirmation(){
				let tmpList=[];
				let goods = {id:this.usid,img: this.datailInfo[1].goodsImg,name:this.shopInfo.goodsName,price:this.datailInfo[1].goodsBuyingPrice,number:this.shopInfo.number,details:this.shopInfo.goodsDetail };
				tmpList.push(goods);
				uni.setStorage({
					key:'buylist',
					data:tmpList,
					success: () => {
						uni.navigateTo({
							// url:'/pages/shop/order?id=id&num=num',
							url:'/pages/shop/order',
						})
					}
				})
			},
		}
	}

</script>

<style lang="scss" scoped>
	.number {
		display: flex;
		justify-content: center;
		align-items: center;
		.input{
			width: 80upx;
			height: 60upx;
			margin: 0 10upx;
			background-color: #f3f3f3;
			display: flex;
			justify-content: center;
			align-items: center;
			text-align: center;
			input{
				width: 80upx;
				height: 60upx;
				display: flex;
				justify-content: center;
				align-items: center;
				text-align: center;
				font-size: 26upx;
			}
		}
		
		.sub ,.add{
			width: 60upx;
			height: 60upx;
			background-color: #f3f3f3;
			border-radius: 5upx;
			.icon{
				font-size: 30upx;
				width: 60upx;
				height: 60upx;
				display: flex;
				justify-content: center;
				align-items: center;
				
			}
		}
	}
	.item-list .active {
		background: #FF106A;
		color: #fff;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 750rpx;
		height: 650rpx;
		background-color: white;
		border-top-left-radius: 10rpx;
		border-top-right-radius: 10rpx;
		position: relative;
	}
	.shop-details {
		width: 100%;
	}
	.shop-details image {
		width: 100%;
		min-height: 200upx;
	}
	.main {
		padding: 22rpx;
	}
	.details-integral {
		font-size: 14px;
	}
	.details-integral text {
		color: #FF0060;
		font-size: 18px;
		font-weight: bold;
		margin-left: 10upx;
	}
	.details-integral p {
		margin-top: 10px;
		font-weight: bold;
	
	}
	.details-integral p:nth-of-type(1) {
		color: #FF0060;
		font-size: 17px;
	}
	.details-integral p:nth-of-type(1)	text {
		font-size: 19px;
	}
	.details-integral h5 {
		font-size: 18px;
		margin-top: 5px;
	}
	.details-integral .spn1 {
		display: block;
		width: 40px;
		height: 21px;
		line-height: 21px;
		text-align: center;
		font-size: 10px;
		color: #fff;
		background: #FF0060;
		border-radius: 15px;
		float: left;
	}
	.details-integral .spn2 {
		display: block;
		width: 78px;
		height: 21px;
		line-height: 21px;
		text-align: center;
		float: left;
		font-size: 10px;
		border: 1px solid #FF0060;
		border-radius: 15px;
		margin-left: 15px;
	}
	.div {
		width: 100%;
		height: 30px;
		line-height: 30px;
		margin-top: 10px;
	}
	.details-div {
		margin-top: 15px;
		padding: 0 22rpx;
	}
	.details-p {
		height: 30px;
		line-height: 30px;
		// border-bottom: 1px solid #ccc;
	}
	.info{
		
		margin-left: 16upx;
	}
	.info .title{
		width: 200upx;
		font-size: 15px;
		font-weight: bold;
	}
	
	.info .infoDes{
		margin-top: 10upx;
		font-size: 10px;
		color: #787878;
	}
	
	
	
	.details-p	text {
		margin-top: 10upx;
		display: block;
		height: 20px;
		line-height: 20px;
		font-size: 18px;
		font-weight: 700;
		padding-left: 16rpx;
		border-left: 3px solid #FF0060;
	}
	.details-div-main {
		font-size: 12px;
	}
	.details-div-main	p {
		color: #787878;
		height: 30px;
		line-height: 30px;
		border-bottom: 1px solid #ccc;
		padding-left: 22rpx;
		position: relative;
	}
	.details-div-main p text {
		color: #323232;
		position: absolute;
		left: 30%;
	}
	.details-div2{
		width: 100%;
		min-height: 50upx;
	}
	.img {
		width: 100%;
		// height: 100upx;
	}
	
	
	
	
	
	
	
	
	
	
	//猜你喜欢
	.details-like {
		// padding: 26rpx;
		min-height: 100upx;
	}
	.like-p {
		margin-top: 20upx;
		margin-left: 4%;
		height: 20px;
		line-height: 20px;
		padding-left: 16rpx;
		border-left: 3px solid #FF0060;
		font-weight: bold;
	}
	.like-box {
		width: 100%;
		margin-top: 20upx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
		padding-left: 4%;
	}
	.liked-shop {
		width: 328upx;
		height: 378upx;
		margin-top: 26upx;
		margin-right: 20upx;
	}
	.liked-shop .liked-shop-p {
		color: #323232;
		font-size: 8px;
		margin-top: 5px;
	}
	.pttr {
		.pttr-spn {
			font-size: 12px;
			color: #FF0060;
		}
	}
	.liked-shop image {
		width: 100%;
		height: 220upx;
		// margin-bottom: 5px;
	}
	.liked-shop h5{
		margin-left: 16upx;
		color: #888;
		font-size: 14px;
		font-weight: bold;
	}
	.liked-shop .des{
		margin-left: 16upx;
		font-size: 10px;
		color: #787878;
	}
	.liked-shop .hot{
		margin-top: 10upx;
		margin-left: 16upx;
		color: #FF0060;
		font-size: 12px;
		margin-right: 10upx;
	}
	.liked-shop #recommed{
		float: right;
		font-size: 11px;
		color: #787878;
	}
	
	.btn {
		margin-top: 30upx;
		background: #FF106A;
	}
	//弹窗
	.a-t{
		display: flex;
		position: absolute;
		top: 0;
		left: 5%;
		padding-bottom: 15rpx;
		border-bottom: 1px solid #ccc;
		image{
			width: 240upx;
			height: 240upx;
			flex-shrink: 0;
			margin-top: -40upx;
			border-radius: 8upx;;
		}
		.right{
			display: flex;
			flex-direction: column;
			padding-left: 24upx;
			font-size: $font-sm + 2upx;
			color: $font-color-base;
			line-height: 42upx;
			.price{
				font-size: $font-lg;
				color: #FF0060;
				margin-bottom: 10upx;
				text-align: left;
				font-size: 18px;
			}
			.selected-text{
				margin-right: 10upx;
			}
		}
	}
	.attr-list{
		display: flex;
		flex-direction: column;
		font-size: $font-base + 2upx;
		color: $font-color-base;
		padding-top: 30upx;
		padding-left: 10upx;
		min-height: 150rpx;
		width: 95%;
		padding-left: 26rpx;
		position: absolute;
		left: 0;
		top: 30%;
	}
	.item-list{
		padding: 20upx 0 0;
		display: flex;
		flex-wrap: wrap;
		// float: left;
		text{
			display: flex;
			align-items: center;
			justify-content: center;
			background: #eee;
			margin-right: 20upx;
			margin-bottom: 20upx;
			border-radius: 100upx;
			min-width: 60upx;
			height: 60upx;
			padding: 0 20upx;
			font-size: $font-base;
			color: $font-color-dark;
		}
		.selected{
			background: #FF0060;
			color: #fff;
		}
	}
	.length {
		width: 95%;
		padding: 15rpx 26rpx 0 26rpx;
		font-size: 12px;
		height: 100rpx;
		p {
			width: 30%;
			float: left;
			text-align: left;
			padding-left: 22rpx;
		}
	}
	.peer {
		float: right;
		margin-right: 15px;
	}
	.button {
		width: 100%;
		color: #fff;
		background: #FF0060;
		font-size: 14px;
		position: absolute;
		bottom: 35px;
		left: 0;
	}
	page {
		background-color: #f8f8f8;
	}
	@keyframes showPopup {
			0% {
				opacity: 0;
			}
			100% {
				opacity: 1;
			}
		}
		@keyframes hidePopup {
			0% {
				opacity: 1;
			}
			100% {
				opacity: 0;
			}
		}
		@keyframes showLayer {
			0% {
				transform: translateY(0);
			}
			100% {
				transform: translateY(-100%);
			}
		}
		@keyframes hideLayer {
			0% {
				transform: translateY(-100%);
			}
			100% {
				transform: translateY(0);
			}
		}
	
	.icon {
		font-size: 26upx;
	}
	.status {
		width: 100%;
		height: 0;
		position: fixed;
		z-index: 10;
		top: 0;
		/*  #ifdef  APP-PLUS  */
		height: var(--status-bar-height); //覆盖样式
		/*  #endif  */
		background-color: #f1f1f1;
		transition: opacity 0.05s linear;
	}
	.header {
		width: 100%;
	
		height: 100upx;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 10;
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);
		/*  #endif  */
		.before,
		.after {
			width: 92%;
			padding: 0 4%;
			height: 100upx;
			display: flex;
			align-items: center;
			position: fixed;
			top: 0;
			/*  #ifdef  APP-PLUS  */
				top: var(--status-bar-height);
			/*  #endif  */
			transition: opacity 0.05s linear;
			.back {
				width: 125upx;
				height: 60upx;
				flex-shrink: 0;
				.icon {
					margin-left: -10%;
					width: 60upx;
					height: 60upx;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 42upx;
				}
			}
			.middle {
				width: 100%;
			}
			.icon-btn {
				width: 125upx;
				height: 60upx;
				flex-shrink: 0;
				display: flex;
				.icon {
					&:first-child{
						margin-right: 5upx;
					}
					width: 60upx;
					height: 60upx;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 42upx;
				}
			}
		}
		.before {
			.back {
				.icon {
					color: #fff;
					background-color: rgba(0, 0, 0, 0.2);
					border-radius: 100%;
				}
			}
			.icon-btn {
				.icon {
					color: #fff;
					background-color: rgba(0, 0, 0, 0.2);
					border-radius: 100%;
					
				}
			}
		}
		.after {
			background-color: #f1f1f1;
			.back {
				.icon {
					color: #666;
				}
			}
			.icon-btn {
				.icon {
					color: #666;
				}
			}
			.middle {
				font-size: 32upx;
				height: 90upx;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0 7%;
				view {
					width: (100%/3);
					padding: 0 3%;
					margin: 0 3%;
					display: flex;
					justify-content: center;
					align-items: center;
					&.on {
						margin-bottom: -4upx;
						color: #f47952;
						border-bottom: solid 4upx #f47952;
					}
				}
			}
		}
	}
	.swiper-box {
		position: relative;
		width: 100%;
		height: 100vw;
		swiper {
			width: 100%;
			height: 100vw;
			swiper-item {
				image {
					width: 100%;
					height: 100vw;
				}
			}
		}
		.indicator{
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 25upx;
			height: 40upx;
			border-radius: 40upx;
			font-size: 22upx;
			position: absolute;
			bottom: 20upx;
			right: 20upx;
			color: #fff;
			background-color: rgba(0, 0, 0, 0.2);
		}
	}
	.info-box {
		width: 92%;
		padding: 20upx 4%;
		background-color: #fff;
		margin-bottom: 20upx;
	}
	
	.goods-info {
		.price {
			font-size: 46upx;
			font-weight: 600;
			color: #f47925;
		}
		.title {
			font-size: 30upx;
		}
	}
	.spec {
		.row {
			width: 100%;
			display: flex;
			align-items: center;
			margin: 0 0 30upx 0;
			.text {
				font-size: 24upx;
				color: #a2a2a2;
				margin-right: 20upx;
			}
			.content {
				font-size: 28upx;
				display: flex;
				flex-wrap: wrap;
				.serviceitem{
					margin-right: 10upx;
				}
				.sp {
					width: 100%;
					display: flex;
					view {
						background-color: #f6f6f6;
						padding: 5upx 10upx;
						color: #999;
						margin-right: 10upx;
						font-size: 20upx;
						border-radius: 5upx;
						&.on{
							border: solid 1upx #f47952;
							padding: 4upx 8upx;
						}
					}
				}
			}
			.arrow {
				position: absolute;
				right: 4%;
				.icon {
					color: #ccc;
				}
			}
		}
	}
	.comments {
		.row {
			width: 100%;
			height: 40upx;
			display: flex;
			align-items: center;
			margin: 0 0 30upx 0;
			.text {
				font-size: 30upx;
			}
			.arrow {
				font-size: 28upx;
				position: absolute;
				right: 4%;
				color: #17e6a1;
				.show {
					display: flex;
					align-items: center;
					.icon {
						color: #17e6a1;
					}
				}
			}
		}
		.comment {
			width: 100%;
			.user-info {
				width: 100%;
				height: 40upx;
				display: flex;
				align-items: center;
				.face {
					width: 40upx;
					height: 40upx;
					margin-right: 8upx;
					image {
						width: 40upx;
						height: 40upx;
						border-radius: 100%;
					}
				}
				.username {
					font-size: 24upx;
					color: #999;
				}
			}
			.content {
				margin-top: 10upx;
				font-size: 26upx;
			}
		}
	}
	.description {
		.title {
			width: 100%;
			height: 80upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 26upx;
			color: #999;
		}
	}
	.footer {
		position: fixed;
		bottom: 0upx;
		width: 92%;
		padding: 0 4%;
		height: 99upx;
		border-top: solid 1upx #eee;
		background-color: #fff;
		z-index: 2;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.icons {
			display: flex;
			height: 80upx;
			margin-left: -4%;
			.box {
				width: 80upx;
				height: 80upx;
				display: flex;
				justify-content: center;
				flex-wrap: wrap;
				.icon {
					font-size: 40upx;
					color: #828282;
				}
				.text {
					display: flex;
					justify-content: center;
					width: 100%;
					font-size: 22upx;
					color: #666;
				}
			}
		}
		.btn {
			height: 80upx;
			border-radius: 40upx;
			overflow: hidden;
			display: flex;
			margin-right: -2%;
			.joinCart,
			.buy {
				height: 80upx;
				padding: 0 40upx;
				color: #fff;
				display: flex;
				align-items: center;
				font-size: 28upx;
			}
			.joinCart {
				background-color: #f0b46c;
			}
			.buy {
				background-color: #f06c7a;
			}
		}
	}
	.popup {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 20;
		display: none;
		.mask{
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 21;
			background-color: rgba(0, 0, 0, 0.6);
		}
		.layer {
			position: fixed;
			z-index: 22;
			bottom: -70%;
			width: 92%;
			padding: 0 4%;
			height: 65%;
			border-radius: 20upx 20upx 0 0;
			background-color: #fff;
			display: flex;
			flex-wrap: wrap;
			align-content: space-between;
			.content {
				width: 100%;
				padding: 20upx 0;
			}
			.btn {
				width: 100%;
				height: 100upx;
			}
		}
		
		&.show {
			display: block;
			.mask{
				animation: showPopup 0.2s linear both;
			}
			.layer {
				animation: showLayer 0.2s linear both;
			}
		}
		&.hide {
			display: block;
			.mask{
				animation: hidePopup 0.2s linear both;
			}
			
			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}
		&.none {
			display: none;
		}
		&.service {
			.row {
				margin: 30upx 0;
				.title {
					font-size: 30upx;
					margin: 10upx 0;
				}
				.description {
					font-size: 28upx;
					color: #999;
				}
			}
		}
		&.spec {
			.title {
				font-size: 30upx;
				margin: 30upx 0;
			}
			.sp {
				display: flex;
				view {
					font-size: 28upx;
					padding: 5upx 20upx;
					border-radius: 8upx;
					margin: 0 30upx 20upx 0;
					background-color: #f6f6f6;
					&.on {
						padding: 3upx 18upx;
						border: solid 1upx #f47925;
					}
				}
			}
			.length{
				margin-top: 130upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-top: 20upx;
				.text{
					font-size: 30upx;
				}
				.number{
					display: flex;
					justify-content: center;
					align-items: center;
					.input{
						width: 80upx;
						height: 60upx;
						margin: 0 10upx;
						background-color: #f3f3f3;
						display: flex;
						justify-content: center;
						align-items: center;
						text-align: center;
						input{
							width: 80upx;
							height: 60upx;
							display: flex;
							justify-content: center;
							align-items: center;
							text-align: center;
							font-size: 26upx;
						}
					}
					
					.sub ,.add{
						width: 60upx;
						height: 60upx;
						background-color: #f3f3f3;
						border-radius: 5upx;
						.icon{
							font-size: 30upx;
							width: 60upx;
							height: 60upx;
							display: flex;
							justify-content: center;
							align-items: center;
							
						}
					}
				}
			}
			
		}
	}
	.share{
		display: none;
		&.show {
			display: block;
			.mask{
				animation: showPopup 0.15s linear both;
			}
			.layer {
				animation: showLayer 0.15s linear both;
			}
		}
		&.hide {
			display: block;
			.mask{
				animation: hidePopup 0.15s linear both;
			}
			
			.layer {
				animation: hideLayer 0.15s linear both;
			}
		}
		&.none {
			display: none;
		}
		.mask{
			background-color: rgba(0,0,0,.5);
			position: fixed;
			width: 100%;
			height: 100%;
			top:0;
			z-index: 11;
		}
		.layer{
			width: 92%;
			position: fixed;
			z-index: 12;
			padding: 0 4%;
			top: 100%;
			background-color: rgba(255,255,255,0.9);
			.list{
				width: 100%;
				display: flex;
				padding:10upx 0 30upx 0;
				.box{
					width: 25%;
					display: flex;
					justify-content: center;
					flex-wrap: wrap;
					image{
						width: 13.8vw;
						height: 13.8vw;
					}
					.title{
						margin-top: 10upx;
						display: flex;
						justify-content: center;
						width: 100%;
						font-size: 26upx;
					}
				}
			}
			.btn{
				width: 100%;
				height: 100upx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 28upx;
				border-top: solid 1upx #666666;
			}
			.h1{
				width: 100%;
				height: 80upx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 34upx;
			}
		}
	}
</style>
