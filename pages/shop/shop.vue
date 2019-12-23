<template>
	<view style="height: 100%;background: #ccc;">
		<view class="shop">
			
			<view class="container">
				<view class="recom">推荐</view>
				<scroll-view 
				class="scroll-container" 
				scroll-x 
				scroll-with-animation 
				v-if="brands.length > 1" 
				@click="clickShop"
				:scroll-into-view="'s' + currentIndex">
					<view :class="['scroll-item', { active: index == currentId }]" 
					:id="'s' + index" 
					v-for="(item, index) in brands"
					:key="index" 
					
					:data-index ="item.id"
					@tap="handleScroll(index)">
					{{ item.category }}
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="main">
			<!-- 轮播图 -->
			<view class="uni-padding-wrap sper">	
			    <swiper class="swiper fount" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
			        <swiper-item class="prr" v-for="(item,index) in photo" :key="index">
			           <image :src=" item.imgUrl " mode="scaleToFill"/>
					   <!-- <image src="" mode="aspectFit"></image> -->
			        </swiper-item>
			    </swiper>			       			  
			</view>
			<!-- 商品 -->
			<view class="shopping" v-for="(product,index) in shopList" :key="index" :data-indes="product.id" @click="turnMovie">
				<view class="shop-div">
					<image :src=" product.goodsImg "></image>
					<view class="shop-div1">
						<h5>{{ product.goodsName }}</h5>
						<p>{{ product.goodsDetail }}</p>
						<text class="qinang">抢购价:</text>
						<text class="jiage">￥{{ product.goodsBuyingPrice }}</text>
						<image src="https://wx.zzsnqyjxh.org/test/upload/static/list_Button.png"/>
					</view>
				</view>
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
				imgUrl:this.$imgUrl,
				currentId:'',/* 控制被选中 */
				currentIndex:'',/* 控制位置 */
				brands:[],
				isShow: false,
				//搜索
				category: '',
				list: [
					'茶叶',
					'速食',
					'饮品',
					'饮品'
				],
				//轮播图
				photo: [],
				pageRequest: 1,
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				//推荐商品列表
				shopList: []
			}
		},
		onLoad() {
			this.handle();
			this.recom();
			this.phrtr()
		},
		// 模态框显示隐藏
		showModal(e) {
		    this.setData({
		      modalName: e.currentTarget.dataset.target
		    })
		},
		hideModal(e) {
		    this.setData({
		      modalName: null
		    })
		},
		onTabItemTap() {
		    if (app.globalData.userInfo){
		       return
		    }
		    uni.showModal({
		        title: '提示',
		        content: '您尚未注册，是否马上去注册页面？',
		        success: function (sm) {
					if (sm.confirm) {
					    uni.redirectTo({
					       url: '/pages/application/member',
					    })
					} else{
					    uni.switchTab({
					       url: '/pages/index/index'
					    })
					}
				},
			})
		},
		methods: {
			//轮播图
			phrtr() {
				const url = serverUrl.serverUrl;
				uni.request({
					url: 'https://wx.zzsnqyjxh.org/test/app/appImage/findByImg',
					data: {
						pageRequest: this.pageRequest
					},
					method: 'GET',
					success: res => {
						console.log(res.data.data.data)
						if (res.data.code == 200) {
							this.photo = res.data.data.data
						}
					}
				})
			},
			// 点击并切换到推荐商品
			clickShop(e){
				var that = this;
				var recommedId = e.target.dataset.index
				// console.log(recommedId)
				var url=" https://wx.zzsnqyjxh.org/test";
				uni.request({
					url:"https://wx.zzsnqyjxh.org/test/app/Goods/findByCategoryId?goodsCategoryId="+recommedId,
					method:"POST",
					success(res) {
						// console.log(res.data.data.data)
						var recommedList = res.data.data.data
						that.shopList=recommedList
					}
				})
		
			},
			//滑动导航栏
			handleScroll(index) {
				this.currentId = index;
				this.currentIndex = Math.max(0, index - 1);
			},
			//获取导航栏数据
			handle() {
				var url=" https://wx.zzsnqyjxh.org/test";
				uni.request({
					url: 'https://wx.zzsnqyjxh.org/test/app/appCategory/findCategory',
					data: '',
					methods: 'GET',
					success: res => {
						if(res.data.code == 200) {
							this.brands = res.data.data.data
						}
					}
				})
			},
			//推荐商品
			recom() {
				var that = this;
				var url=" https://wx.zzsnqyjxh.org/test";
				uni.request({
					url: 'https://wx.zzsnqyjxh.org/test/app/Goods/findRecommend',
					method: 'get',
					success: res => {
						console.log(res)
						if (res.data.code == 200) {
							that.shopList = res.data.data.data
						}
					}
				})
			},
			//搜索
			searchMe() {
				const url = serverUrl.serverUrl;
				var keyword = this.category
				// if(keyword) {
				//     location.href = "#/shop?keyword="+keyword;
				// }
				// var keyword = getParamsByUrl (location.href,'keyword')
				// function getParamsByUrl (url,name) {
				//      var params=url.substr(url.indexOf('?')+1);
				//      var param=params.split();
				//      for(var i=0;i<param.length;i++){
				//         var current=param[i].split('=');
				//         if(current[0]==name){
				//             return current[1]
				//         }
				//     }
				//       return null;
				// }
				uni.request({
					url: 'https://wx.zzsnqyjxh.org/test/app/Goods/findGoodsByCategory?category='+this.category,
					// data: {
					// 	category: this.category
					// },
					method: 'POST',
					success: (res) => {
						console.log(res);
						this.shopList = res.data.data
					}
				})
			},
			// 头部轮播
			changeIndicatorDots(e) {
			    this.indicatorDots = !this.indicatorDots
			},
			changeAutoplay(e) {
			    this.autoplay = !this.autoplay
			},
			intervalChange(e) {
			    this.interval = e.target.value
			},
			durationChange(e) {
			    this.duration = e.target.value
			},
			//跳转到详情页
			turnMovie(e) {
				console.log(e)
				var itemId = e.currentTarget.dataset.indes
				uni.navigateTo({
					url: "/pages/shop/shop-details?id=" + itemId
				});
			},
		
		}
	}
</script>

<style lang="scss" scoped>
	.container {
	position: relative;
	
		
	}
	.recom {
		position: absolute;
		top: 10upx;
		left: 16upx;
		width: 100upx;
		height:46upx;                       
		line-height: 46upx;
		font-size: $font-sm +6upx;		
		color: #fff;
		
		background:rgba(255,255,255,0.5);
		border-radius:15px;
		text-align: center;
		// margin-right: 10upx;
		
	}
	.scroll-container {
	    box-sizing: border-box;
	    padding-left: 134upx;
	    white-space: nowrap;
	    height: 80upx;
	}
	.scroll-item {
		font-size: $font-sm +6upx;
		color: #fff;
	    text-align: center;
	    display: inline-block;
	    padding: 0 30upx;
	    line-height: 70upx;
		opacity: 0.6;
		&.active {
			display: inline-block;
			font-weight: bold;
			color: #fff;
			opacity: 1;
			border-radius: 25px;
		}
	}
	.bottom-border {
	    margin: 0 auto;
	    width: 50upx;
	    height: 10upx;
	    background: rgba(255, 79, 82, 1);
	    border-radius: 5upx;
	}
	.main {
		position: relative;
	}
	//轮播图
	.sper {
		border-radius: 30upx;
		margin-left: 4%;
		position: absolute;
		top: -170upx;
		width: 92%;
		height: 246upx;
		overflow: hidden;
		
	}
	.fount {
		width: 100%;
		height: 100%;
		
	}
	.prr image {
		width: 100%;
		height: 100%;

		
	}
	.shop {
		height: 260upx;
		background: #FF0060;
		padding-left: 22rpx;
		// padding-top: 22rpx;
		text {
			float: left;
			font-size: $font-sm;
			color: #fff;
		}
	}
	.shop-spn {
		display: block;
		width: 120rpx;
		height: 45rpx;
		text-align: center;
		line-height: 45rpx;
		border: 1px solid #fff;
		border-radius: 25px;
		margin-left: 22rpx;
	}
	.main {
		background: #F5F5F5;
		padding-top: 50px;
		min-height: 800px;
	}
	//搜索
	.search-block {
		// position: fixed;
		display: flex;
		padding:0upx 20upx 20upx 20upx;
		/* position:fixed;
		top:100; */
		z-index: 2000;
		background-color:#FF106A;
	}
	.search-ico-wrapper {
		background-color:#eaeaea;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding:0upx 10upx;
	}
	.search-ico {
		width:40upx;
		height:40upx;
	}
	.search-text {
		font-size:14px;
		background-color:#eaeaea;
		height:60upx;
		width:650upx;
	}
	//商品
	.shopping {
		// margin-top: 8upx;
		padding:  8upx 6upx;
	}
	.shop-div {
		box-sizing: border-box;
		width: 96%;
		height: 282upx;
		background: #fff;
		padding: 10rpx 22rpx;
		border-radius: 15px;
		margin-left: 14upx;
		display: flex;
		justify-content: space-between;
		box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.14);
		image {
			margin-top: 16upx;
			width: 35%;
			height: 84%;
			border-radius: 30upx;
		}
	}
	
	
	.shop-div1 .qinang{
		font-size: 13px;
		color: #FF2879;
			
	}
	.shop-div1 .jiage{
		font-size: 16px;
		color: #FF2879;
		margin-left: 8upx;
	}
	
	
	.shop-div1 {
		width: 70%;
		padding-left: 22rpx;
		h5 {
			font-size: $font-lg;
			margin-top: 5px;
		}
		p {
			font-size: $font-sm + 5upx;
			color:#727272;
			margin-top: 15rpx;
		}
		image {
			display: block;
			width: 88px;
			height: 21px;
			margin-top: 8upx;
		}
	}
</style>
