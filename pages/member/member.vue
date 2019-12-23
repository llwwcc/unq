<template>
	<view style="background:#fff;">
		<view class="input">
			<input type="text" class="input-text" placeholder="请输入搜索内容" v-model="searchName"/>
			<button type="primary" class="btn" @click="fSearch">搜索</button>
		</view>
		<view class="card"
			v-for="(item,index) in list"
			:key="index"
		>
			<view class="sort">{{item.rollIndex}}</view>
			<view 
				@click.stop="toDetails"
				class="nav"
				 v-for="(itm,id) in item.rolls" 
				:key='id'
				:data-index="itm.id"
				>
				<image class="img" :src="'https://wx.zzsnqyjxh.org/test'+itm.cardImg"></image>
				<view class="name">{{itm.realName}}</view>
				<view class="firm">{{itm.comName}}</view>
			</view>
		</view>
		<view class="wall"></view>
	</view>
</template>
<script>
	import serverUrl from '../../common/serveUrl.js'
	var api = serverUrl.serverUrl
	const app = getApp();
	export default {
		data(){
			return {
				customerInfoShow:'',
				list:[],
				searchName:''
			}
		},
		props:{
			placeHolder: {
				type: String,
			},
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
		  onLoad(){
			 //  uni.request({
			 //  	url: api+'/app/user/getRoll',
			 //  	method: 'POST',
			 //  	success:(res=>{
				// 	this.list=res.data.data
				// }),
			 //  });
			this.prr()
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
		      }
		    })
		  },
		methods:{
			fSearch(){
			    const url = serverUrl.serverUrl;
			    var keyword = this.category
			    if(keyword) {
			       location.href = "#/shop?keyword="+keyword;
			    }
			    var keyword = getParamsByUrl (location.href,'keyword')
				function getParamsByUrl (url,name) {
					var params=url.substr(url.indexOf('?')+1);
					var param=params.split();
					for(var i=0;i<param.length;i++){
						var current=param[i].split('=');
						if(current[0]==name){
							return current[1]
						}
					}
			        return null;
				}
			   uni.request({
			   	url: url + '/app/user/getRoll?searchName=' + this.searchName,
			   	// data: {
			   	//  	searchName: this.searchName
			   	// },
			   	method: 'POST',
			   	success: (res) => {
			   		console.log(res);
			   		this.prr()
			   	}
			   })
			},
			prr() {
				uni.request({
					url: 'https://wx.zzsnqyjxh.org/test/app/user/getRoll',
					method: 'POST',
					success:(res=>{
						console.log(res)
						this.list=res.data.data
					}),
				});
			},
			toDetails(e){
				console.log(e)
				var id = e.currentTarget.dataset.index
				uni.navigateTo({
					url:'./details?id='+id
				})
			},
			chooseCustomerTap(){
				uni.navigateTo({
				    url: this.customerRouterUrl,
					success() {
						// console.log(111)
					},
					fail() {
						// console.log(22)
					}
				});
			},
			
		},
	}
</script>

<style lang="scss" scoped>
	.wall{
		box-sizing: border-box;
		width:100%;
		height:30upx;
		background:#F5F5F5;
		font-size:24upx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(50,50,50,1);
		padding-left:30upx;
		line-height: 30upx;
	}
	//文本内容
	.card{
		.sort{
			box-sizing: border-box;
			width:100%;
			height:30upx;
			background:#F5F5F5;
			font-size:24upx;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(50,50,50,1);
			padding-left:30upx;
			line-height: 30upx;
		}
		.nav{
			position: relative;
			min-height:140upx;
			border-bottom:1px solid #E6E6E6;
			.img{
				width:100upx;
				height:100upx;
				border-radius:50%;
				position: absolute;
				top:20upx;
				left:30upx;
				background:url(../../static/1/1.png)  no-repeat;
				background-size:100%;
			}
			.name{
				font-size:32upx;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(30,30,30,1);
				position: absolute;
				top:20upx;
				left:150upx;
			}
			.firm{
				font-size:28upx;
				font-family:PingFangSC-Light,PingFang SC;
				font-weight:300;
				color:rgba(50,50,50,1);
				position: absolute;
				top:80upx;
				left:150upx;
			}
		}
	}
	.input{
		width:100%;
		height:120upx;
		position:relative;
	}
	.input-text{
		position: absolute;
		top:30upx;
		left: 30upx;
		width:550upx;
		height:60upx;
		background:#F5F5F5;
		border-radius:30upx;
		box-sizing: border-box;
		padding-left: 20upx;
		font-size:28upx;
	}
	.btn {
		position: absolute;
		top:30upx;
		right:30upx;
	 	width: 120rpx;
	 	height: 60upx;
	 	line-height: 60upx;
	 	font-size: $font-sm + 5upx;
		border-radius:30upx;
	 	background: red;
		font-family:PingFangSC-Medium,PingFang SC;
		color:rgba(255,255,255,1);
	}
	.content1{
	     height: 150upx;
	 }
	 page{
	     background-color: #FFFFFF;
	 }
	 /* 搜索框 */
	 .search-ico, .search-ico-1{
	     width: 40upx;
	     height: 40upx;
	 }
	 .search-text{
	     font-size: 14px;
	     background-color: #FFFFFF;
	     height: 60upx;
	     width: 480upx;
	 }
	 .search-block{
	     display: flex;
	     flex-direction: row;
	     padding-left: 60upx;
	     position: relative;
	     top: -32upx;
	 }
	 .search-ico-wapper{
	     background-color: #FFFFFF;
	     display: flex;
	     flex-direction:column;
	     justify-content: center;
	     padding: 0upx 0upx 0upx 40upx;
	     border-bottom-left-radius:18px;
	     border-top-left-radius: 18px;
	 }
	 .search-ico-wapper1{
	     background-color: #FFFFFF;
	     display: flex;
	     flex-direction:column;
	     justify-content: center;
	     padding: 0upx 40upx 0upx 0upx;
	     border-bottom-right-radius:18px;
	     border-top-right-radius: 18px;
	 }
	 .shadow{
	     width: 458upx;
	     height: 60upx;
	     border-radius:18px;
	     -moz-box-shadow:0 0 10px #e6e6e6;
	     -webkit-box-shadow:0 0 10px #e6e6e6;
	     box-shadow:0 0 10px #e6e6e6;
	     position: relative;
	     top: -90upx;
	     left: 60upx;
	 }
</style>
