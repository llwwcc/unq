<template>
    <view>
		        <view class='content' >
		            <view>申请获取以下权限</view>
		            <text>获得你的公开信息(昵称，头像、地区等)</text>
		        </view>    		
		        <button class='bottom' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxLogin">
		            授权登录
		        </button>
	</view>
</template>
<script>
	// 获取公共域名地址
	import serveUrl from '@/common/serveUrl.js';
	export default {
		data() {
			return {
				
			};
		},
		onLoad() {
			var self = this;
		},
		methods: {
			wxLogin(e) {
				console.log(e)
				// 通过微信开放能力,获得微信用户的基本信息
				const userInfo = e.detail.userInfo;
				const url = serverUrl.serverUrl;
				// 实现微信登录
				uni.login({
					provider: "weixin",
					success: loginResult => {
						// 获得微信登录的code:授权码
						const code = loginResult.code;
						// 设置登录到哪个对应的微信小程序
						const loginToWhichMP = 1;
						uni.request({
							url: url + '/stu/mpWXLogin/' + code + '?qq=' + qq,
							data: {
								"avatarUrl": userInfo.avatarUrl,
								"nickName": userInfo.nickName,
								"whichMP": loginToWhichMP
							},
							method: "POST",
							success: res => {
								console.log(res);
								const userInfo = res.data.data;
								// 保存用户信息到全局的缓存中
								uni.setStorageSync("globalUser", userInfo);
								// 切换页面跳转
								uni.switchTab({
									url: "../index/index"
								});
							}
						})
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header {
	    margin: 90rpx 0 90rpx 50rpx;
	    border-bottom: 1px solid #ccc;
	    text-align: center;
	    width: 650rpx;
	    height: 300rpx;
	    line-height: 450rpx;
	}
	    	
	.header image {
	    width: 200rpx;
	    height: 200rpx;
	}
	    	
	.content {
	    margin-left: 50rpx;
	    margin-bottom: 90rpx;
	}
	    	
	.content text {
	    display: block;
	    color: #9d9d9d;
	    margin-top: 40rpx;
	}
	    	
	.bottom {
	    border-radius: 80rpx;
	    margin: 70rpx 50rpx;
	    font-size: 35rpx;
	}
</style>
