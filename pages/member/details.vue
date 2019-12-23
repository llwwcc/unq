<template>
	<view>
		<view class="means">
			<view class="means-head-l1"  @click="btnClick">
				<text :class="{'color':1 == anchorIndex}" data-index="1">个人信息</text>
				<text :class="{'color':2 == anchorIndex}" data-index="2">企业信息</text>
			</view>
			<view class="means-head-l2" v-show="isShow">
				<!-- 头像 -->
				<view class="photo">
					<p>头像</p>
					<image :src="means.url"/>
				</view>
				<view class="manage">
					<p>昵称<text>{{ means.username }}</text></p>
					<p>年龄<text>{{ means.age }}</text></p>
					<p>政治面貌<text>{{ means.mianmao }}</text></p>
					<p>学历<text>{{ means.study }}</text></p>
					<p>民族<text>{{ means.nation }}</text></p>
					<p>担任社会职务<text>{{ means.society }}</text></p>
					<p>微信号<text>{{ means.weixin }}</text></p>
					<p>手机号<text>{{ means.phone }}</text></p>
					<p>邮箱<text>{{ means.email }}</text></p>
				</view>
			</view>
			<view class="means-head-l3" v-show="!isShow">
				<view class="photo">
					<p>Logo</p>
					<image :src="url"/>
				</view>
				<view class="manage">
					<p>企业名称<text>{{ means.name }}</text></p>
					<p>职务<text>{{ means.zhiwu }}</text></p>
					<p>企业地址<text>{{ means.address }}</text></p>
					<p>企业所有制性质<text>{{ means.xingzhi }}</text></p>
					<p>行业类别<text>{{ means.leibie }}</text></p>
				</view>
				<!-- <view class="manage-p" v-for="item in list" :key="item.id" @click="navck(item.id)">
					<p>{{ item.status }}</p>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import serverUrl from '../../common/serveUrl.js'
	export default {
		data() {
			return {
				anchorIndex: '1',
				isShow: true,
				url: '../../../static/mine_icon_head portrait.png',
				//个人信息
				meansList: [
				],
				//企业信息
				manageList: [
				],
			}
		},
		onLoad(options) {
			var id = options.id
		},
		methods: {
			//点击按钮变色
			btnClick(e) {
				if(e.target.dataset.index != 2 ){
				    this.anchorIndex = 1;
				}else{
				    //获取当前点击事件的下标
				    this.anchorIndex =  e.target.dataset.index
				}
				if (e.target.dataset.index == 2) {
					this.isShow = false
				} else {
					this.isShow = true
				}
			},
			prr() {
				var url = serverUrl.serverUrl;
				uni.request({
					url: url + '/app/user/getUserById',
					data: {
						id: id
					},
					methods: 'POST',
					success: res => {
						console.log(res)
						if (res.data.code == 200) {
							this.means = res.data.data
						}
					}
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.means-head-l1 .color {
		color: #FF0060;
		border-bottom: 1px solid #FF0060;
	}
	.means {
		background: #fff;
	}
	.means-head-l1{
		width: inherit;
		height: 85rpx;
		line-height: 85rpx;
		cursor: pointer;
		text-align: center;
		border-bottom: 1px solid #F5F5F5;
	}
	.means-head-l1 text{
		float: left;
		display: block;
		width: 50%;
	    font-size: $font-sm + 5upx;
	    color: black;
	}
	.means-head-l2 {
		padding: 22rpx;
		p {
			height: 80rpx;
			line-height: 80rpx;
			color: #1E1E1E;
			font-size: $font-sm + 5upx;
			border-bottom: 1px solid #E6E6E6;
			position: relative;
		}
	}
	.means-head-l3 {
		padding: 22rpx;
		p {
			height: 80rpx;
			line-height: 80rpx;
			color: #1E1E1E;
			font-size: $font-sm + 5upx;
			border-bottom: 1px solid #E6E6E6;
			position: relative;
		}
	}
	.means-head-l2 text,
	.means-head-l3 text{
		position: absolute;
		left: 45%;
	}
	.manage-p {
		background: url(../../static/image_arrow_mine.png) no-repeat right;
		background-size: 8px;
	}
	.photo {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: url(../../static/image_arrow_mine.png) no-repeat right;
		background-size: 8px;
		border-bottom: 1px solid #E6E6E6;
		p {
			border: none;
		}
	}
	.photo image {
		width: 50px;
		height: 50px;
		border-radius: 5px;
		margin-right: 20px;
	}
</style>
