<template>
	<view>
		<view class="content">
			<view class="row">
				<view class="nominal">
					收件人
				</view>
				<view class="input">
					<input placeholder="请输入收件人姓名" type="text" v-model="nickName" />
				</view>
			</view>
			<view class="row">
				<view class="nominal">
					电话号码
				</view>
				<view class="input">
					<input placeholder="请输入收件人电话号码" type="text" v-model="mobilePhone" />
				</view>
			</view>
			<view class="row">
				<view class="nominal">
					所在地区
				</view>
				<view class="input">
					<input placeholder="请输入地址" type="text" v-model="region" />
				</view>
			</view>
			<view class="row">
				<view class="nominal">
					详细地址
				</view>
				<view class="input">
					<textarea v-model="detailAddress" auto-height="true" placeholder="输入详细地址"></textarea>
				</view>
			</view>
			<view class="row">
				<view class="nominal">
					设置默认地址
				</view>
				<view class="input switch">
					<switch color="#f06c7a" :checked="isDefault" @change=isDefaultChange />
				</view>
			</view>
			<view class="row" v-if="editType=='edit'" @tap="del">
				<view class="del">
					删除收货地址
				</view>
			</view>
		</view>
		<view class="save" @tap="save">
			<view class="btn">
				保存地址
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	// 获取公共域名地址
	import serverUrl from '@/common/serveUrl.js';
	export default {
		data() {
			return {
				editType:'edit',
				id:'',
				nickName:'',
				mobilePhone:'',
				detailAddress:'',
				isDefault:false,
				cityPickerValue: [0, 0, 1],
				themeColor: '#007AFF',
				region: '',
				defaultFlag: '',
				globalData: {},
			};
		},
		onLoad(e) {
			this.globalData = app.globalData
			//获取传递过来的参数
			this.editType = e.type;
			let title = '';
			if(e.type=='edit'){
				title = '编辑收货地址'
				uni.setNavigationBarTitle({
				 	title
				})
				uni.getStorage({
					key:'address',
					success: (e) => {
						// console.log(e)
						this.id = e.data.id;
						this.nickName = e.data.nickName;
						this.mobilePhone = e.data.mobilePhone;
						this.detailAddress = e.data.detailAddress;
						this.isDefault = e.data.isDefault;
						this.region = e.data.region;
					}
				})
			} else {
				title = '新增收货地址'
				uni.setNavigationBarTitle({
					title
				})
			}
		},
		methods: {
			//默认地址
			isDefaultChange(e){
				
				this.isDefault = e.detail.value;
				if (this.isDefault = true) {
					this.defaultFlag = 1
				} else {
					this.defaultFlag = 0
				}
			},
			//删除
			del(){
				console.log(this.id)
				const url = serverUrl.serverUrl;
				var id = this.id;
				uni.showModal({
					title: '删除提示',
					content: '你将删除这个收货地址',
					success: (res)=>{
						if (res.confirm) {
							uni.request({
								
								// key:'delAddress',
								// url: url + '/app/appAddress/delete',
								url:"https://wx.zzsnqyjxh.org/test/app/appAddress/delete?id="+id,
								// data:{id:this.id},
								method:"POST",
								success(res) {
									console.log(res)
									uni.showToast({
										title:res.data.msg,
										duration:5000
									})
									// uni.navigateBack({
									// 	animationDuration:2000
									// })
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
			},
			//保存地址
			save(){
				const url = serverUrl.serverUrl;
				let data={"nickName":this.nickName,"mobilePhone":this.mobilePhone,"region":this.region,"detailAddress":this.detailAddress,"isDefault":this.isDefault};
				console.log( data.nickName);
				if(!data.nickName){
					uni.showToast({title:'请输入收件人姓名',icon:'none'});
					return ;
				}
				if(!data.mobilePhone){
					uni.showToast({title:'请输入收件人电话号码',icon:'none'});
					return ;
				}
				if(!data.detailAddress){
					uni.showToast({title:'请输入收件人详细地址',icon:'none'});
					return ;
				}
				if(!data.region){
					uni.showToast({title:'请输入地址',icon:'none'});
					return ;
				}
				if(this.editType=='edit'){
					data.id = this.id
					uni.request({
						// url: url + '/app/appAddress/edit',
						url: "https://wx.zzsnqyjxh.org/test/app/appAddress/edit?nickName="
						+data.nickName+"&userId=1"+"&defaultFlag=0"+"&id="+data.id+"&mobilePhone="+data.mobilePhone+"&region="+data.region+"&detailAddress="+data.detailAddress,
						// data: {
						// 	// data: data,
						// 	nickName:this.nickName,
						// 	id: data.id,
						// 	userId: this.globalData.userInfo.id,
						// 	defaultFlag: this.defaultFlag
						// },
						method: 'POST',
						success: res => {
							console.log(res)
							if (res.data.code == 200) {
								uni.showToast({
									title:res.data.msg,
									duration:1500
								})
							}
						}
					})
				} else {
					uni.request({
						// url: url + '/app/appAddress/add',
						url:"https://wx.zzsnqyjxh.org/test/app/appAddress/add?nickName="
						+data.nickName+"&mobilePhone="+data.mobilePhone+"&region="+data.region+"&detailAddress="+data.detailAddress+"&userId=1"+"&defaultFlag=0",
						
						
						// data: {
						// 	//data: data,
						// 	// userId: this.data.globalData.userInfo.id,
						// 	userId:1,
						// 	mobilePhone:data.mobilePhone,
						// 	region:data.region,
						// 	detailAddress:data.detailAddress,
						// 	defaultFlag: data.defaultFlag,
						// 	nickName:data.nickName
						// },
						method: 'POST',
						success: res => {
							console.log(res)
							if (res.data.code == 200) {
								// console.log(res.data.msg)
								uni.showToast({
									title:res.data.msg,
									duration:1500
								})
								// uni.navigateBack({ delta: 1});
							}
						}
					})
				}
			}
		}
	};
</script>
<style lang="scss">

.save{
		view{
			display: flex;
		}
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 120upx;
		display: flex;
		justify-content: center;
		align-items: center;
		.btn{
			box-shadow: 0upx 5upx 10upx rgba(0,0,0,0.4);
			width: 70%;
			height: 80upx;
			border-radius: 80upx;
			background-color: #f06c7a;
			color: #fff;
			justify-content: center;
			align-items: center;
			.icon{
				height: 80upx;
				color: #fff;
				font-size: 30upx;
				justify-content: center;
				align-items: center;
			}
			font-size: 30upx;
		}
	}
	.content{
		display: flex;
		flex-wrap: wrap;
		view{
			display: flex;
		}
		.row{
			width: 94%;
			
			margin: 0 3%;
			border-top: solid 1upx #eee;
			.nominal{
				width: 30%;
				height: 120upx;
				font-weight: 200;
				font-size: 30upx;
				align-items: center;
			}
			.input{
				width: 70%;
				padding: 20upx 0;
				align-items: center;
				font-size: 30upx;
				&.switch{
					justify-content: flex-end;
				}
				.textarea{
					margin: 20upx 0;
					min-height: 120upx;
				}
			}
			.del{
				width: 100%;
				height: 100upx;
				justify-content: center;
				align-items: center;
				font-size: 36upx;
				color: #f06c7a;
				background-color: rgba(255,0,0,0.05);
				border-bottom: solid 1upx #eee;
			}
		}
	}
	
</style>
