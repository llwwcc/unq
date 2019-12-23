<template>
	<view>
		<!-- <view class="login-head-l1"  @click="btnClick"> -->
			<!-- <text :class="{'color':1 == anchorIndex}" data-index="1">活动详情展示</text> -->
		<!-- 	<text :class="{'color':2 == anchorIndex}" data-index="2">会员互动展示</text> -->
		<!-- </view> -->
		<view class="main">
			<view class="enroll"  >
				<image :src="'https://wx.zzsnqyjxh.org/test'+ activeInfo.pic "></image>
				<view class="enroll-ent">
					<p>会议主题：<text>{{ activeInfo.title }}</text></p>
					<p>会议时间：<text>{{ activeInfo.beginTime.slice(0,10) }}</text></p>
					<p>会议地点：<text>{{ activeInfo.address }}</text></p>
					<p>参加人数：<text>10人</text></p>
					<p>已报名：<text>{{ activeInfo.status }}人</text></p>
					<p>押金：<text>20元</text></p>
				</view>
				<view style="padding: 22rpx;">
					<view class="enroll-div">
						<h4 class="try">{{ activeInfo.title }}</h4>
						<view>
							<parser :html="activeInfo.content" @parser="parser" @imgtap="imgtap" @linkpress="linkpress" @error="error"
							 show-with-animation lazy-load  use-anchor>加载中...</parser>
						</view>
						<!-- <p>{{ item.content }}</p> -->
					</view>
				
				</view>
			</view>
			<view class="footer">
				<image :src="imgUrl+'/upload/static/code_pic_qr code.png'"/>
				<view class="login-head-l2"  @click="perClick">
					<text :class="{'backgroundColor':1 == perIndex}" data-index="1">签到</text>
					<text  :class="{'backgroundColor':2 == perIndex}" data-index="2">
						<!-- @tap="show('QSPopup2')" -->
						报名
						<!-- {{row.status==0?'报名':'已报名'}} -->
					</text>
					<!-- <view>{{city}}</view> -->
				</view>
			</view>
		</view>
		<QSPopup ref="QSPopup2" type="fadeInUp">
			<view class="content">
				<view class="content-div" v-for="item in priceList" :key="item.id">
					<p>{{ item.title }}</p>
					<p>{{ item.content }}</p>
					<p>活动押金<text>￥{{ item.price }}</text></p>
					<view class="price">
						<button>立即支付</button>
					</view>
				</view>
			</view>
		</QSPopup>
	</view>
</template>

<script>
	const app = getApp()
	import QSPopup from '../../components/QS-popup/QS-popup.vue';
	import parser from "@/components/jyf-Parser/index";
	import QQMapWX from '../../static/js/qqmap-wx-jssdk.min.js'
	export default {
		components:{
			QSPopup,
			parser
		},
		data () {
			return {
				imgUrl:this.$imgUrl,
				globalData: {},
				// 页面id
				id:'',
				// 活动详情
				activeInfo:'',
				newHtml:"",
				// 用户选择
				 anchorIndex:1,
				 perIndex:1,
				//活动详情

				enrollList: [],

				priceList: [
				],
				userId: ''
			}
		},
		
		onLoad(option){
			// 加载数据
			this.globalData=app.globalData;
			this.userId = this.globalData.userInfo.id
				var targetId = option.targetId;
				var that = this;
				that.id =targetId
				var pageNum=1;
				var pageSize=1;
				if(pageNum<=pageSize){
					pageSize++
				}
				if (!app.globalData.userInfo) {
					uni.showModal({
						title: '提示',
						content: '您尚未注册，是否马上去注册页面？',
						success: function(sm) {
							if (sm.confirm) {
								uni.redirectTo({
									url: '/pages/application/member',
								})
							} else {
								uni.switchTab({
									url: '/pages/index/index'
								})
							}
						}
					})
				}
				uni.request({
					url:"https://wx.zzsnqyjxh.org/test/app/huodong/findById",
					data:{
						id:targetId,
						appUserId:1
						// appUserId:this.globalData.userInfo.id
					},
					method:"GET",
					success(res) {	
						that.activeInfo=res.data.data;
						
					},
					
				})
		},
		methods: {
			getCity(){
				var that = this;
				var newId = that.id
				// console.log(newId)
				uni.authorize({
					// 获取授权
					scope:"scope.userLocation",
					success() {
						// 引入腾讯地图api
						let qqmapsdk = new QQMapWX({
						    key: 'VQHBZ-RTP3U-UA5VC-4WWBD-D6ZH6-C7FTO'
						});
						uni.getLocation({
							type:'gcj02',
							success(res) {
								// console.log('当前位置的经度：' + res.longitude);
								// console.log('当前位置的纬度：' + res.latitude);
								// 当前位置的经度
								var longitude = res.longitude
								// 当前位置的纬度
								var latitude = res.latitude
								uni.request({
									url:"https://wx.zzsnqyjxh.org/test/app/huodong/signIn?huodongId="+newId+
									"&appUserId="+this.userId+"&longitude="+longitude+"&latitude="+latitude,
									method:"POST",
									success(res) {
										// console.log(res.data.msg)
										uni.showToast({
											icon:"none",
											title:res.data.msg,
											duration:1500
										})
										
									}
									
								})
								 // qqmapsdk.reverseGeocoder({
									//  location:{
									// 	  latitude:res.latitude,
									// 	  longitude:res.longitude
									//  },
									//  success(res){
									// 	 console.log(res)
		   							// 	 console.log(res.result.address)
									// 	 context.state.city= res.result.address
									// 	 console.log(context.state.city)
									//  }
								 // })
						
							}
						});				
					},
					fail(res) {
						uni.showToast({
							icon:"none",
							title:"如果不开启定位授权,部分功能无法实现",
							duration:2000
						})
					}
				
				})	
			},
			//点击按钮变
			// btnClick(e){
			// 	if(e.target.dataset.index != 2 ){
			// 	    this.anchorIndex = 1;
			// 	}
			// 	// }else{
			// 	//     //获取当前点击事件的下标
			// 	//     this.anchorIndex =  e.target.dataset.index
			// 	// 	uni.navigateTo({
			// 	// 		url: '/pages/enroll/engage'
			// 	// 	})
			// 	// }
			// },
			// 点击签到
			perClick(e) {
				if(e.target.dataset.index != 2){
					this.perIndex = 1;
					// 点击签到发起请求
					this.getCity()
			// 点击报名
				} else {
					this.perIndex = e.target.dataset.index
					// 点击发送报名请求
					var that =this;
					var id= that.id
					// console.log(id)
					uni.request({
						url:"https://wx.zzsnqyjxh.org/test/app/huodong/signUp?huodongId="+id+"&appUserId="+this.userId,
						method:"POST",
						success(res) {
							uni.showToast({
								icon:"none",
								title:res.data.msg,
								duration:1500
							})
							console.log(res)
							if(res.data.code !==500){
								// 支付弹出层
								that.show('QSPopup2')
							}
						}
					})
				}
			},
			//跳转互动页面
			interact() {
				uni.navigateTo({
					url: '/pages/myhome/interact'
				})
			},
			// 支付弹出层
			show(ref) {
				this.$refs[ref].show();
			},
		}
	}
</script>

<style lang="scss" scoped>
	.color{
		height: 72rpx;
		line-height: 60rpx;
		color: #fff;
		border-bottom:2px solid #FF0060;
	}
	.backgroundColor {
		height: 70rpx;
		line-height: 70rpx;
		color: #fff;
		background: #FF0060;
		border-radius: 10upx;
	}
	.login-head-l1{
		width: inherit;
		height: 85rpx;
		line-height: 85rpx;
		cursor: pointer;
		text-align: center;
		background: #fff;
		text:nth-child(1) {
			margin-right: 100rpx;
		}
	}
	.login-head-l1 text{
	    font-size: $font-sm + 5upx;
	    padding: 15rpx 20px;
	    color: black;
		margin-top: 5px;
	}
	.login-head-l1:before{
	    content:'';
	    height: 35px;
	    margin-left: 5px;
	}
	.enroll {
		width: 100%;
		background: #fff;
		margin-bottom: 15px;
		image {
			width: 100%;
			height: 300rpx;
		}
	}
	.enroll-div {
		p {
			width: 100%;
			background: #fff;
			text-align: left;
			margin-top: 10px;
			font-size: $font-sm + 5upx;
			color: #323232;
		} 
	}
	.enroll-div .try{
		font-size: 16px;
		font-weight: bold;
		margin-bottom: 20upx;
	}
	.enroll-ent {
		margin-left: 4%;
		margin-top: 8px;
		padding-bottom: 10px;
		p {
			font-size: $font-sm + 5upx;
			color: #323232;
			border-top: 1px solid #E6E6E6;
			height: 30px;
			line-height: 30px;
			text {
				color: black;
			}
		}
	}
	.enroll-ent p:nth-of-type(5) {
		background-size: 8px;
	}
	.main-div {
		margin-top: 35rpx;
	}
	.describe {
		width: 100%;
		p {
			width: 100%;
			text-align: center;
			font-size: $font-sm + 15upx;
			margin-top: 10rpx;
		}
	}
	.describe-div1 {
		position: relative;
	}
	.describe-div1 .describe-img {
		width: 150rpx;
		height: 150rpx;
		position: absolute;
		top: 50%;
		right: 5%;
	}
	.describe-div1,
	.describe-div2 {
		width: 100%;
		margin-top: 15rpx;
		p {
			text-align: left;
			font-size: $font-sm + 5upx;
		}
		image {
			width: 100%;
			height: 300rpx;
		}
	}
	.footer {
		width: 100%;
		height: 500rpx;
		text-align: center;
		margin-top: 55rpx;
		image {
			width: 300rpx;
			height: 300rpx;
		}
	}
	.login-head-l2{
		height: 70rpx;
		line-height: 70rpx;
		cursor: pointer;
		text-align: center;
		margin-top: 30rpx;
		text:nth-child(1) {
			margin-right: 100rpx;
		}
	}
	.login-head-l2 text{
	    font-size: $font-sm + 5upx;
	    padding: 8px 40px;
	    // color: black;
		margin-top: 5px;
	}
	//弹出层
	.content {
		height: 500rpx;
		width: 100%;
		background-color: white;
		border-radius: 10rpx;
		position: relative;
	}
	.content p {
		font-size: $font-sm;
	}
	.content .content-div {
		padding: 50rpx 35rpx 0 35rpx;
	}
	
	.content-div p:nth-of-type(1) {
		color: #1E1E1E;
		font-size: $font-lg;
	}
	.content-div p:nth-of-type(2) {
		color: #323232;
		font-size: $font-sm;
		margin-top: 15px;
	}
	.content-div p:nth-of-type(3) {
		height: 80rpx;
		border: 1px solid #FF0060;
		line-height: 80rpx;
		padding: 0 22rpx;
		margin: 0 auto;
		margin-top: 30px;
		border-radius: 25px;
	}
	.content-div p:nth-of-type(3) text {
		float: right;
		color: #FF0060;
	}
	.price button {
		height: 80rpx;
		line-height: 80rpx;
		background: #FF0060;
		color: #fff;
		font-size: $font-sm;
		margin-top: 30px;
		border-radius: 25px;
	}
</style>
