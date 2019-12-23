<template>
	<view>
		<view class="input-box">
			<view class="input-item">
			    <view class="input-label">昵称</view>
				<view class="input-body">
					<input v-model="registerForm.username" maxlength="11" type="number" style="margin-right: 160upx;" placeholder="请输入昵称" class="input" >
				</view>
			</view>
			<view class="input-item">
			    <view class="input-label">手机号</view>
				<view class="input-body">
					<input v-model="registerForm.phone" maxlength="11" type="number" style="margin-right: 160upx;" placeholder="请输入手机号" class="input" >
				</view>
			</view>
			<view class="input-item">
				<view class="input-label">验证码</view>
				<view class="input-body">
					<input placeholder="请输入验证码" type="number" v-model="registerForm.code" maxlength="6" class="input">
					<button :disabled="!isCanSendCode" class="btn-code"  @click="sendCode">{{sendMsg}}</button>
				</view>
			</view>
			<view class="input-item">
				<view class="input-label">密码</view>
				<view class="input-body">
					<input :type="passwordType" v-model="registerForm.password"  :password="isHidePassword?true:false" style="margin-right: 50upx;" placeholder="请输入密码" maxlength="20"  class="input" />
					<image @click="isHidePasswordClick" class="eye" src="imgUrl+'/upload/static/img/attention.png'"></image>
				</view>
			</view>
			<view class="input-item">
				<view class="input-label">确认密码</view>
				<view class="input-body">
					<input :type="passwordType" v-model="registerForm.passwordTrue" :password="isHidePassword?true:false" style="margin-right: 50upx;" placeholder="请输入确认登录密码" maxlength="20"  class="input" />
					<image @click="isHidePasswordClick" class="eye" src="imgUrl+'/upload/static/img/attention.png'"></image>
				</view>
			</view>
			<view class="input-item">
				<view class="input-label">角色</view>
				<view class="input-body">
					<input v-model="registerForm.password" type="text" :password="isHidePassword?true:false" style="margin-right: 50upx;" placeholder="请选择角色" maxlength="20"  class="input" />
				</view>
			</view>
		</view>
		<button class="button" @click="submit">注册</button>
	</view>
</template>

<script>
	let timer = '';
	import {checkPhone,checkPwd,checkCode} from "@/common/common.js"
	export default {
		data() {
			return {
				passwordType: 'password',
				sendMsg:"发送验证码",
				isCanSendCode:true,
				isHidePassword:true,
				registerForm: {
					username: "",
					phone:"",
					password:"",
					passwordTrue:"",
					code:""
				}
			};
		},
		onLoad() {
		},
		methods: {
			//显示密码
			isHidePasswordClick(){
				if (this.passwordType === 'password') {
				    this.passwordType = 'text';
				} else {
				    this.passwordType = 'password';
				}
			},
			//倒计时
			setCodeInterval () {
				//设置验证码重新发送定时器
			    let time = 60;
			    clearInterval(timer);
			    timer = setInterval(() => {
			        time--;
			        this.isCanSendCode=false;
			        this.sendMsg=time + "s"
			        if (time <= 0) {
			            this.isCanSendCode=true;
			            this.sendMsg="重新获取";
			            clearInterval(timer);
			        }
			    }, 1000)
			},
			clearCodeInterval(){
			    clearInterval(timer);
			    this.codemsg="获取验证码";
			},
			//发送验证码
			sendCode () {
				//发送验证码
			    if (!checkPhone(this.phone)) {
			        return
			    }
			    this.setCodeInterval();
				/*
				* 发送验证码逻辑
				*/
			},
			//注册
			submit() {
				if (this.registerForm.phone.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请输入手机号'
					});
				    return;
				}
				if (this.registerForm.code.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请输入验证码'
					});
				    return;
				}
				if (this.registerForm.password.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请输入密码'
					});
				    return;
				}
				if (this.registerForm.passwordTure.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请输入确认密码'
					});
				    return;
				}
				if (this.registerForm.passwordTure.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择角色'
					});
				    return;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	button::after{
		border: none;
	}
	.input-box {
		padding: 50upx;
		font-size: 30upx;
		.input-item {
			display: flex;
			background: white;
			border-bottom: 1upx solid #eeeeee;
			line-height: 100upx;
			height: 100upx;
			.input-label {
				width: 150upx;
			}
			.input-body{
				position: relative;
				height: 100upx;
				width: calc(100% - 150upx);
				.input {
					line-height: 90upx;
					height: 90upx;
					position: relative;
					font-size: 28upx;
					border: none;
					outline: none;
				}
				.eye{
					position: absolute;
					height: 50upx;
					width: 50upx;
					right: 0;
					top: 50%;
					transform: translateY(-50%);
				}
				.btn-code{
				    position: absolute;
				    right: 0upx;
				    top:50%;
				    transform: translateY(-50%);
					background: none;
					color: #205592;
					width: 160upx;
					font-size: 24upx;
					box-sizing: border-box;
					text-align: right;
					padding: 0;
					height: 100upx;
					line-height: 100upx;
				}
			}
			
		}
		.select {
			padding-top: 40upx;
			display: flex;
			justify-content: space-between;
			color: #003B67;
		}
	}
	.button{
		margin:0 30upx;
		background: #FF0060;
		border-radius:50upx;
		line-height: 80upx;
		height: 80upx;
		color: white;
		font-size: 32upx;
	}

</style>
