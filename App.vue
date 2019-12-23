<script>
	export default {
		globalData: {
		    userInfo: null,
		    user: {}
		},
		onLaunch: function() {
			console.log('App Launch')
			// 展示本地存储能力
			var that = this
			// 登录
			uni.login({
				provider: "weixin",
			    success: res => {
					console.log(res)
			        // 发送 res.code 到后台换取 openId, sessionKey, unionId
			        uni.request({
						url: 'https://wx.zzsnqyjxh.org/test/app/user/getWxOpenId',
						data: {
							code: res.code
						},
						method: 'GET',
						success: data => {
							console.log(data)
							if (data.data.data.openid && data.data.data.session_key) {
								this.globalData.openid = data.data.data.openid
								this.globalData.session_key = data.data.data.session_key
								// that.getUserMsg()
								uni.request({
									url: 'https://wx.zzsnqyjxh.org/test/app/user/getUserByOpenId',
									header: {
										'Content-Type': 'application/x-www-form-urlencoded'
									},
									data: {
										openid: this.globalData.openid
									},
									method: 'POST',
									success: data => {
										console.log(data)
										data.data.data.comLegalIdcard ? data.data.data.comLegalIdcard = data.data.data.comLegalIdcard.split(',') : data.data.data.comLegalIdcard = []
										data.data.data.comPhotos ? data.data.data.comPhotos = data.data.data.comPhotos.split(',') : data.data.data.comPhotos = []
										data.data.data.hasOrg ? data.data.data.hasOrg = data.data.data.hasOrg.split(',') : data.data.data.hasOrg = []
										that.globalData.userInfo = data.data.data
									}
								})
							}
							
						}
			        })
			    }
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss" scoped>
	/*每个页面公共css */
	uni-swiper .uni-swiper-dot-active {
		background: #fff;
	}
	uni-image>img {
		opacity: 1;
    }
	uni-button {
		border-radius: 0;
	}
	.uni-drawer__content {
		width: 500rpx;
	}
	.uni-page-head-search-placeholder-center {
		left: 17%;
	}
	uni-app, uni-page-head {
		height: 43px;
	}
	.PC_input_text {
		text-align: left;
	}
	.QS_fadeInUp.show {
		width: 100%;
	}
	.title {
		border: 1px solid rgb(255, 255, 255);
		border-radius: 25px;
		width: 50px;
	}
	body {
		background: #F5F5F5;
	}
</style>
