<template>
	<view style="background: #fff;min-height: 800px;">
		<view class="content">
			<view class="comment">
			    <textarea placeholder="请输入企业信息" v-model="content"></textarea>
				<view class="uni-uploader-info">{{ content.length }}/140</view>
			</view>
			<view class="btn" @click="slogned">
				完成
			</view>
		</view>
	</view>
</template>

		
<script>
	export default {
		data() {
			return {
				//宣传语
				content: '',
				titleMaxLength: 140
			}
		},
		methods: {
			//提交宣传语
			slogned() {
			    if (this.content.length < 1) {
			       uni.showModal({ content: '内容不能为空', showCancel: false, });
			       return;
			    } 
				uni.showLoading({title:'上传中'});
				
			}
		},
		watch: {
		    title() {
		        if (this.title.length > this.titleMaxLength) {
		            this.title = String(this.title).slice(0, this.titleMaxLength);
		        }
		    }
		}
	}
</script>

<style lang="scss" scoped>
	.slogan {
		width: 100%;
		height: 50rpx;
		font-size: $font-sm + 5upx;
		text {
			float: right;
			color: red;
		}
	}
	.content {
		min-height: 800px;
		padding: 15px;
	}
	.comment {
		border: 1px solid #ccc;
		padding:  22rpx;
	    textarea {
			width: 100%;
			height: 230rpx;
			margin-top: 0;
	    }      
	}
	.uni-uploader-info {
		color: #787878;
		font-size: $font-sm;
		text-align: right;
	}
	.btn {
		width: 100%;
		height: 70rpx;
		color: #fff;
		background: #FF106A;
		font-size: 14px;
		text-align: center;
		line-height: 70rpx;
		margin: 0 auto;
		margin-top: 15px;
		border-radius: 5px;
	}
</style>
