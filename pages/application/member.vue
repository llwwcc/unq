<template>
	<view>
	<view class="content">
		<view class="item">
			<view class="item-label">
				<text>姓名</text>
			</view>
			<view class="item-input">
				<input type="text" v-model="name" placeholder="请输入姓名" placeholder-style="color: #787878;font-size:14px;padding-left:10upx; padding-top:6upx"/>
			</view>
		</view>
		<view class="item">
			<view class="item-label">
				<text>手机号</text>
			</view>
			<view class="item-input">
				<input type="text" v-model="phoneNumber" placeholder="请输入手机号" placeholder-style="color: #787878;font-size:14px;padding-left:10upx;">
					<button class="button" @getphonenumber="getPhoneNumber" open-type="getPhoneNumber">快速获取</button>
				</input>
			</view>
		</view>
		</view>
		<button class="btn" @click="attest">立即认证</button>
	</view>
</template>

<script>
	const app = getApp()
	// 获取公共域名地址
	import serverUrl from '@/common/serveUrl.js';
	export default{
		data(){
			return{
				name: '',
				phoneNumber: '',

				mobilePhone: '',





				getInfoFlag: true,
				encryptedData: '',
				nickName: '',
				avatarUrl: '',
				scene:null,
				globalData: {},
				detail: '',
				
			}
		},
		onLoad(query) {
			// console.log(query) 
			this.globalData = app.globalData
		},
		methods:{
			getPhoneNumber(e) {
				console.log(e)
			    let that = this;
				const url = serverUrl.serverUrl;
				if (e.detail.errMsg == "getPhoneNumber:ok") {
					console.log(app.globalData)
					uni.request({
						url: url + '/app/user/getPhoneNumber',
						method: 'POST',
						header: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						data: {
							encryptedData: e.detail.encryptedData,
							sessionId: app.globalData.openid,
							iv: e.detail.iv
						},
						success(res) {

							console.log(res)
							that.mobilePhone =res.data.data.phoneNumber;



							console.log(res)
							that.mobilePhone =res.data.data.phoneNumber;


							console.log(res.data.data.phoneNumber)
							that.phoneNumber =res.data.data.phoneNumber;
							//取到上面截图中红框中的数据
							// this.prr = res.data.data;
							// that.mobilePhone =
							// console.log(this.prr)
							// console.log(this.mobilePhone)





						}
					})
				}
			},
		// },
			//认证
			attest() {
				let _this = this;
				const url = serverUrl.serverUrl;			
				uni.request({
					url: url + '/app/user/memValidate',
					method: 'GET',
					data: {
						name: this.name,
						mobilePhone: this.mobilePhone
					},
					success: res => {





						console.log(res)
						if (res.data.msg == 'nomember') {
							uni.navigateTo({
							 	url: '/pages/application/error'
							})
						} else {
							this.globalData.userInfo = res.data.data
							var userId = this.globalData.userInfo.id
							uni.navigateTo({
									// url: '/pages/application/success?userId=' + userId
								url: '/pages/application/success'
							})
						}
							console.log(typeof res.data.msg )
						// if(res.data.code == 200) {
							// if (res.data.msg == 'nomember') {
							// 	uni.navigateTo({
							// 		url: './application'
							// 	})
							// } else {
							// 	this.globalData.userInfo = res.data.data
							// 	var userId = this.globalData.userInfo.id
							// 	uni.navigateTo({
							// 		url: '/pages/application/success?userId=' + userId
							// 		// url: '/pages/application/success'
							// 	})
							// }
							// }
						// }





					}
				})
			
			}
		},
	}
</script>

<style lang="scss" scoped>
	.button {
		min-width: 80px;
		height: 22px;
		line-height: 22px;
		color: #FF106A;
		border-radius: 10px;
		border: 1px solid #FF106A;
		font-size: $font-sm;
		position: absolute;
		top: 0;
		right: 0;
		background: none;
		margin-top: 10px;
	}
	.content{
		background-color: #FFFFFF;
		padding:15upx;
	.item{
		display: flex;
		height: 70upx;
		.item-label{
			font-size:32upx;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			width: 20%;
			margin-left:30upx;
			margin-top:3%;
		}
	}
	.item:nth-child(1){
		border-bottom: 1px solid #E6E6E6;
		padding-bottom: 14upx;
	}
	}
	uni-input{
		height: 84upx;
		line-height: 84upx;
	}
	.btn{
		width:90%;
		background-color:#FF106A;
		color: #FFFFFF;
		border-radius: 50upx;
		margin: 30upx auto;
	}
	.item-input {
		position: relative;
	}
	.item-input:nth-child(2){
		position: relative;
		width: 80%;
	}
</style>
