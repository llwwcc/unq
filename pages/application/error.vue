<template>
	<view class="content">
		<view class="text">
			<text>您是新会员，请填写入会申请表</text>
		</view>
			
		<button class="btn" @click="toApp">立即填写</button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			toApp(){
			uni.navigateTo({
					url:"./member"
			 	})
			}
		}
	}
</script>

<style lang="scss" scoped>
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
