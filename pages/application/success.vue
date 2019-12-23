<template>
	<view class="content">
		<view class="text">
			<text>您已经是会员,请绑定到当前微信</text>
		</view>
		<button class="btn" open-type="getUserInfo" @getuserinfo="getUserInfo">立即认证</button>
	</view>
</template>

<script>
	const app = getApp()
	// 获取公共域名地址
	import serverUrl from '@/common/serveUrl.js';
	export default{
		data(){
			return{
				getInfoFlag: true,
				encryptedData: '',
				nickName: '',
				avatarUrl: '',
				mobilePhone: '',
				headImgUrl: '',
				scene:null,
				globalData: {}
			}
		},
		onLoad(query) {
			this.globalData = app.globalData
			var userId = query.userId
		},
		methods:{
			getUserInfo(e) {
				var that = this
				const url = serverUrl.serverUrl;
			    if (e.detail.errMsg == 'getUserInfo:ok') {
					this.ickName = e.detail.userInfo.nickName,
					this.avatarUrl = e.detail.userInfo.avatarUrl,
					uni.request({
						url: url + '/app/user/bindwx',
						method: 'GET',
						header: {
							'Content-Type': 'application/json'
						},
						data: JSON.stringify({
							// openid: app.globalData.openid,
							// mobilePhone: this.mobilePhone,
							userId: this.userId,
							nickName: this.nickName,
							headImgUrl: this.avatarUrl,
							// joinRecomId:this.data.scene?this.data.scene:null
						}),
						success: function(res) {
							console.log(res)
							app.globalData.userInfo=res.data.data;
							uni.switchTab({
								url: '/pages/index/index',
							})
			            }
			          })
			        }
			  },
		}
	}
</script>

<style lang="scss" scoped>
	.btn{
		width:90%;
		background-color:#FF106A;
		color: #FFFFFF;
		border-radius: 50upx;
		margin: 30upx auto;
	}
	.text{
		width:100%;
		height:200upx;
		background: #FFFFFF;
		text-align: center;
		font-size:16px;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(255,0,96,1);
		text{
			line-height:200upx;
		}
	}
	.btn{
		width:90%;
		background-color:#FF106A;
		color: #FFFFFF;
		border-radius: 50upx;
		margin: 30upx auto;
	}
</style>
