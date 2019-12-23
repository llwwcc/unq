<template>
	<view>
		<view class="member-div1">
			<view class="input-item">
				<view class="input-label">法人姓名</view>
				<input v-model="username" maxlength="11" type="number" placeholder="请填写" class="input" >
			</view>
			<view class="input-item">
				<view class="input-label">公司名称</view>
				<input v-model="name" maxlength="11" type="number" placeholder="请填写" class="input" >
			</view>
		</view>
		<view class="member-div2" v-for="item in memberList" :key="item.id">
			<P><navigator url="/pages/details/slogan">{{ item.title }}</navigator></P>
			<p><navigator url="/pages/details/slogan">{{ item.name }}</navigator></p>
			<p><navigator url="/pages/details/slogan">{{ item.laber }}</navigator></p>
			<p><navigator url="/pages/details/slogan">{{ item.lanager }}</navigator></p>
		</view>
		<view class="btn" @click="slogned">
			立即提交
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				memberList: [
					{
						title: '法人身份证照片',
						name: '营业执照',
						laber: '申请表',
						lanager: '宣传语'
					}
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.member {
		width: 100%;
	}
	.member-div2 p {
		height: 80rpx;
		line-height: 80rpx;
		padding: 0 22rpx;
		font-size: $font-sm + 5upx;
		// background: url(../../static/images/image_arrow_home.png) no-repeat 98% 50%;
		background-size: 8px;
		border-bottom: 1px solid #ccc;
	}
	.input-item {
		padding: 0 22rpx;
		display: flex;
		background: white;
		border-bottom: 1upx solid #ccc;
		line-height: 80upx;
		height: 80upx;
	}
	.input-label {
		font-size: $font-sm + 5upx;
		width: 150upx;
	}
	.input-body{
		position: relative;
		height: 100upx;
		width: calc(100% - 150upx);
	}
	.input {
		width: 85%;
		line-height: 80upx;
		height: 80upx;
		position: relative;
		font-size: 28upx;
		border: none;
		outline: none;
	}
	.uni-input-placeholder {
		left: 85%;
	}
	.btn {
		width: 90%;
		height: 70rpx;
		color: #fff;
		background: #FF106A;
		font-size: 14px;
		text-align: center;
		line-height: 70rpx;
		margin: 0 auto;
		margin-top: 30px;
		border-radius: 5px;
	}
</style>
