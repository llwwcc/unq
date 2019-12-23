<template>
	<view class="content">
		<view class="top" v-for="(item,index) in topList" :key="index">
			<text class="red">{{item.title}}</text>
			<text class="bom" style="margin-top:20upx;">{{item.content}}</text>
		</view>
		<view style="height:30upx;"></view>
		<view style="height:30upx;background:rgba(245,245,245,1);"></view>
		<form @submit="formSubmit" @reset="formReset">
		<view class="nav nav-con navd" @click="operator">
			<text>企业LOGO</text>
			<image src="../../static/list_Middle_Button.png" style="margin-top:1.5%;"></image>
			
			<image class="prr" style="margin-right:10upx;margin-top:1%;width:50upx;height:50upx;" src="../../static/code_pic_head%20portrait.png" v-if="isShow"></image>
			
			<image class="prr" style="margin-right:10upx;margin-top:1%;width:50upx;height:50upx;" :src="'https://wx.zzsnqyjxh.org/test'+img" v-if="isTrue"></image>
		
		</view>
		<view class="nav"
			v-for="(item,index) in firmList"
			:key="index"
		>
			<view class="nav-con" @click="topath(item.id)">
				<text>{{item.status}}</text>

				<image src="imgUrl+'/static/list_Middle_Button.png'" style="margin-top:1.5%;"></image>
				
				<image class="prr" style="margin-right:10upx;margin-top:1%;width:50upx;height:50upx;" src="imgUrl+'/upload/static/code_pic_head%20portrait.png'" v-if="isShow"></image>
				
				<image class="prr" style="margin-right:10upx;margin-top:1%;width:50upx;height:50upx;" :src="'https://wx.zzsnqyjxh.org/test'+img" v-if="isTrue"></image>
			

			</view>
		</view>
		<view class="card">
			<view class="title">
				<view class="wall"></view>
				<text>基本信息</text>
			</view>
			<view class="img" @click="operator">
				<text>个人照片</text>
				<image style="margin-top:1%;width:40upx;height:40upx;" src="imgUrl+'/upload/static/list_Middle_Button.png'"></image>
				<image style="margin-right:10upx;" src="imgUrl+'/upload/static/1/1.png'"></image>
			</view>
			<view class="img">
				<text>姓名</text>
				<input type="text" placeholder="请输入姓名" v-model="form.realName" />
			</view>
			<view class="img">
				<text>性别</text>
				<label>
					<checkbox color="red" style="margin-left:15upx;" value="女"/><text style="margin-left:-5upx;">女</text>
					<checkbox color="red" value="男"/><text style="margin-left:-5upx;">男</text>
				</label>
			</view>
			<view class="rm">
				<text style="margin-top:3%;">出生日期</text>
				<picker mode="date" v-model="form.cardImg" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
			        <view class="uni-input">{{date}}</view>
			    </picker>
				<image src="imgUrl+'/upload/static/rl.png'"></image>
			</view>
			<view class="img">
				<text>政治面貌</text>
				<input type="text" placeholder="请输入政治面貌" v-model="form.politic">
			</view>
			<view class="img" id="input" >
				<text>学历</text>
				<!-- <xfl-select 
					:list="list"
					:clearable="false"
					:showItemNum="5" 
					:listShow="false"
					:isCanInput="true"  
					:style_Container="'height: 60upx; font-size: 24upx;'"
					:placeholder = "'请选择学历'"
					:selectHideType="'hideAll'"
				>
				
				</xfl-select> -->
				<input type="text" placeholder="'请选择学历'">
				<view class="icon">
					<image src="imgUrl+'/upload/static/image_arrow_mine.png'" @click="getshuju"></image>
					<view class="list" v-if="isshow"
					v-for="(item,index) in list"
					:key="index"
					@confirm=getshuju
					>
						{{item.remarks}}
					</view>
				</view>
				  <view class="por">
				    <view class="selectBox" style="width: 400px;">
				      <view class="selectBox_show" v-on:click.stop="arrowDown">
				        <p title="请选择">{{unitName}}</p>
				        <input type="hidden" name="unit" v-model="form.unitModel">
				      </view>
				      <view class="selectBox_list" v-show="isShowSelect"
				           style="max-height: 240px; width: 398px; display: block;">
				        <view class="selectBox_listLi" v-for="(item, index) in dataList"
				             @click.stop="select(item, index)">{{item.value}}
				        </view>
				      </view>
				    </view>
				  </view>
				
					
			</view>
			<view class="img">
				<text>民族</text>
				<input type="text" placeholder="请输入民族" v-model="form.education">
			</view>
			<view class="rm">
				<text>入会推荐人姓名</text>
				<input type="text" placeholder="请输入入会推荐人姓名" v-model="form.joinRecom">
			</view>
		</view>
		<view class="card">
			<view class="title">
				<view class="wall"></view>
				<text>企业信息</text>
			</view>
			<view class="img">
				<text>单位全称</text>
				<input type="text" v-model="form.comName" placeholder="请输入单位全称">
			</view>
			<view class="img">
				<text>单位职务</text>
				<input type="text" v-model="form.comPost" placeholder="请输入单位职务">
			</view>
			<view class="img">
				<text>单位地址</text>
				<input type="text" v-model="form.comAddress" placeholder="请输入单位地址">
			</view>
			<view class="rm">
				<text>营业执照注册时间</text>
				<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
		            <view class="uni-input">{{date}}</view>
		        </picker>
				<image src="imgUrl+'/upload/static/rl.png'" mode=""></image>
			</view>
			<view class="img">
				<text>注册资金</text>
				<input type="text" v-model="form.busLicenceRegistMoney" placeholder="请输入注册资金">
			</view>
			<view class="img">
				<text>法人姓名</text>
				<input type="text" v-model="form.comLegalName" placeholder="请输入法人姓名">
			</view>
			<view class="rm">
				<text>与法人关系</text>
				<input type="text" v-model="form.legalRelation" placeholder="请输入法人关系">
			</view>
			<view class="rm">
				<text>企业所有制性质</text>
				<label>
					<checkbox style="margin-left:35upx;" value="国有" /><text style="margin-left:-5upx;">国有</text>
					<checkbox value="民营" /><text style="margin-left:-5upx;">民营</text>
					<checkbox value="上市公司" /><text style="margin-left:-5upx;">上市公司</text>
				</label>
			</view>
			<view class="rm">
				<text>本人持股比例</text>
				<input type="text" v-model="form.holdMoney" placeholder="请输入本人持股比例">
			</view>
			<view class="img">
				<text>行业类别</text>
				<xfl-select
					:list="guildList"
					:clearable="false"
					:showItemNum="5" 
					:listShow="false"
					:isCanInput="true"  
					:style_Container="'height: 30px; font-size: 16px;'"
					:placeholder = "'请选择行业类别'"
					:selectHideType="'hideAll'"
				>
				</xfl-select>
			</view>
			<view class="img">
				<text>主营业务</text>
				<input type="text" v-model="form.comMainBus" placeholder="请输入主营业务">
			</view>
			<view class="img">
				<text>营业额</text>
				<input type="text" v-model="form.comTurnover" placeholder="请输入营业额">
			</view>
			<view class="img">
				<text>纳税额</text>
				<input type="text" v-model="form.comRatal" placeholder="请输入纳税额">
			</view>
			<view class="rm">
				<text>是否为集团化公司</text>
				<label>
					<checkbox style="margin-left:35upx;" value="是" /><text>是</text>
					<checkbox value="否" /><text>否</text>
				</label>
			</view>
			<view class="rm">
				<text>分公司名称</text>
				<input type="text" v-model="form.comBranchName" placeholder="请输入分公司名称">
			</view>
			<view class="img" style="height:210upx;">
				<text>公司产品</text>
				<textarea v-model="form.comProduct" placeholder="请输入公司产品"/>
			</view>
			<view class="rm">
				<text>在职员工数</text>
				<input type="text" v-model="form.comStaff" placeholder="请输入在职员工数">
			</view>
			<view class="img">
				<text>男女比例</text>
				<text style="margin-left:-35upx;">男</text>
				<input type="text" v-model="form.comStaffMale" style="left:29%;width:90upx;height:50upx;">
				<text style="margin-left:25upx;">%</text>
				<text>女</text>
				<input type="text" v-model="form.comStaffFemale" style="right:22.5%;width:90upx;height:50upx;">
				<text style="margin-left:25upx;">%</text>
			</view>
			<view class="img">
				<text>是否为员工缴纳社保</text><br>
				<label>
					<checkbox class="con" value="是" /><text style="margin-left:-5upx;">是</text>
					<checkbox value="否" /><text style="margin-left:-5upx;">否</text>
				</label>
			</view>
			<view class="img">
				<text>企业家及企业是否有重大失信记录</text><br>
				<label>
					<checkbox class="con" value="是" /><text>是</text>
					<checkbox value="否" /><text>否</text>
				</label>
			</view>
			<view class="img">
				<text>是否在企业内部成立党支部、妇联、工会</text><br>
				<label>
					<checkbox class="con" value="党支部" /><text style="margin-left:-5upx;">党支部</text>
					<checkbox value="妇联" /><text style="margin-left:-5upx;">妇联</text>
					<checkbox value="工会"/><text style="margin-left:-5upx;">工会</text>
				</label>
			</view>
		</view>
		<view class="card">
			<view class="title">
				<view class="wall"></view>
				<text>担任社会职务</text>
			</view>
			<view class="img">
				<text>政府</text>
				<input type="text" placeholder="请输入政府">
			</view>
			<view class="img">
				<text>社会组织</text>
				<input type="text" placeholder="请输入社会组织">
			</view>
		</view>
		<view class="card">
			<view class="title">
				<view class="wall"></view>
				<text>申请人联系方式</text>
			</view>
			<view class="img">
				<text>微信号</text>
				<input type="text" v-model="form.weixin" placeholder="请输入微信号">
			</view>
			<view class="img">
				<text>手机号</text>
				<input type="text" v-model="form.mobilePhone" placeholder="请输入手机号">
			</view>
			<view class="img">
				<text>邮箱</text>
				<input type="text" v-model="form.email" placeholder="请输入邮箱">
			</view>
			<view class="rm">
				<text>第二联系人姓名</text>
				<input type="text" v-model="form.secondName" placeholder="请输入第二联系人姓名">
			</view>
			<view class="rm">
				<text>第二联系人电话</text>
				<input type="text" v-model="form.secondPhone" placeholder="请输入第二联系人电话">
			</view>
		</view>
		<view class="card">
			<view class="title">
				<view class="wall"></view>
				<text>个人简历及荣誉</text>
			</view>
			<view class="hon">
				<text>简历</text>
				<textarea type="text" v-model="form.resume" placeholder="请输入简历(非必填项)"/>
			</view>
		</view>
		<view class="card">
			<view class="title">
				<view class="wall"></view>
				<text>企业荣誉</text>
			</view>
			<view class="hon">
				<text>企业荣誉</text>
				<textarea type="text" v-model="form.comHonour" placeholder="请输入企业荣誉(非必填项)"/>
			</view>
		</view>
		<view class="card">
			<view class="title">
				<view class="wall"></view>
				<text>公益</text>
			</view>
			<view class="hon">
				<text>公益列举</text>
				<textarea v-model="form.publicList" placeholder="请输入公益列举(非必填项)"/>
			</view>
		</view>
		<view class="card">
			<view class="title">
				<view class="wall"></view>
				<text>入会第一需求</text>
			</view>
			<view class="hon">
				<text>学习</text>
				<textarea type="text" v-model="form.requirLearning"  placeholder="请输入内容"/>
			</view>
			<view class="hon">
				<text>找资源</text>
				<textarea type="text" v-model="form.requirResouce" placeholder="请输入内容"/>
			</view>
			<view class="hon">
				<text>参加活动</text>
				<textarea type="text" v-model="form.requirActivity" placeholder="请输入内容"/>
			</view>
			<view class="hon">
				<text>认识朋友</text>
				<textarea type="text" v-model="form.requirFriends" placeholder="请输入内容"/>
			</view>
			<view class="hon">
				<text>获得荣誉</text>
				<textarea type="text" v-model="form.requirHonor" placeholder="请输入内容"/>
			</view>
			<view class="hon">
				<text>其他补充</text>
				<textarea type="text" v-model="form.requirOthers" placeholder="请输入内容"/>
			</view>
		</view>
		<button form-type="submit" class="btn">提交资料</button>
	</form>
		<view style="height:60upx;"></view>
		</view>
	</view>
</template>
 <script>
	import xflSelect from '../../components/xfl-select/xfl-select.vue';
	import serverUrl from "../../common/serveUrl.js";
	const api = serverUrl.serverUrl
	export default{
		components: { xflSelect }, 
		data(){
			const currentDate = this.getDate({
			    format: true
			})
			return{
				imgUrl:this.$imgUrl,
				isTrue:false,
				isShow:true,
				img:'',
				isShowSelect: false,
				dataList: [
				          {key: -1, value: "请选择"},
				          {key: 0, value: "苹果"},
				          {key: 1, value: "香蕉"}
				        ],
				unitName:'请选择',
				isshow:false,
				form: {
					realName: '',
					headImgUrl:'',
					politic:'',
					education:'',
					nation:'',
					joinRecom:'',
					comName:'',
					comPost:'',
					comAddress:'',
					busLicenceRegistMoney:'',
					legalRelation:'',
					holdMoney:'',
					comMainBus:'',
					comTurnover:'',
					comRatal:'',
					comBranchName:'',
					comProduct:'',
					comStaff:'',
					comStaffMale:'',
					comStaffFemale:'',
					weixin:'',
					mobilePhone:'',
					email:'',
					secondName:'',
					secondPhone:'',
					resume:'',
					comHonour:'',
					publicList:'',
					requirLearning:'',
					requirResouce:'',
					requirActivity:'',
					requirFriends:'',
					requirHonor:'',
					requirOthers:''
				},
				title: 'picker',
				index: 0,
				date:'请选择日期',
				time: '12:01',
				selector:'请选择',
				list:[],
				guildList:[],
				topList:[
					{title:'郑州女企业家协会入会申请表'},
					{content:'请您积极配合如下数据调查，并认真填写'},
					{content:'我们承诺：保证您所有信息的安全，绝不外泄！'},
				],
				firmList:[
					{status:"身份证照片",id:1},
					{status:"营业执照",id:2},
					{status:"企业宣传语",id:3},
					{status:"企业相册",id:4}
				],
			}
		},
		onLoad(){
			// uni.request({
			// 	method:'POST',
			// 	url:api+"/app/user/findByType?type=com_industry_type",
			// 	data:{},
			// 	success: (res) => {
			// 		for(let i=0;i<res.data.data.length;i++){
			// 			this.guildList.push(res.data.data[i].label)
			// 		}
			// 		console.log(res)
			// 	},
			// })
		},
		computed: {
		    startDate() {
		        return this.getDate('start');
		    },
		    endDate() {
		        return this.getDate('end');
		    }
		},
		methods: {
			 btn() {
				 uni.request({
				 	url: api + '/app/user/fileUpload',
					data: {
						ref: this.from
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: res => {
						console.log(res)
						if (res.data.code == 200) {
							this.form = res.data.data
						}
					}
				 })
			 },
			 arrowDown() {
			        this.isShowSelect = !this.isShowSelect;
			      },
			      select(item, index) {
			        this.isShowSelect = false;
			        console.log(item);
			        console.log(index);
			        this.unitModel = index;
			        this.unitName = item.value;
			      },
	
			
			getshuju(e){
				console.log(e)
				var that = this;
				if(that.isshow !=true){
					that.isshow=true;
				}else{
					that.isshow=false;
				}
				uni.request({
					url:'https://wx.zzsnqyjxh.org/test/app/user/findByType?type=app_user_education',
					method:"POST",
					success(res) {
						console.log(res.data.data)
						var list = res.data.data
						that.list =list
					}
				})
				
			},
			// 修改头像
			operator() {
				var that  =this;
				uni.chooseImage({
				    success: (chooseImageRes) => {
				        const tempFilePaths = chooseImageRes.tempFilePaths;
				        uni.uploadFile({
				            url: api+'/app/user/fileUpload', //仅为示例，非真实的接口地址
				            filePath: tempFilePaths[0],
				            name: 'file',
				            formData: {
				                'user': 'test'
				            },
				            success: (uploadFileRes) => {
								var imgage = JSON.parse(uploadFileRes.data)
								var img = imgage.data;
								that.img = img
								that.isshow=false;
								that.isTrue=true;
								
				            }
				        });
				    }
				});
			},
			formSubmit: function(e) {
			    // console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
			    // var formdata = e.detail.value
			    // uni.showModal({
			    //     content: '表单数据内容：' + JSON.stringify(formdata),
			    //     showCancel: false
			    // });
				uni.request({
					method:'POST',
					url:api+"/app/user/applyJoin",
					data:{
						form: this.from
					},
					success: (res => {
						console.log(res)
					}),
				})
			},
			topath(id) {
				if (id == 1) {
					uni.navigateTo({
						url: '/pages/myhome/means/card'
					})
				} else if (id == 2) {
					uni.navigateTo({
						url: '/pages/myhome/means/license'
					})
				} else if (id == 3) {
					uni.navigateTo({
						url: '/pages/myhome/means/tagline'
					})
				} else if (id == 4) {
					uni.navigateTo({
						url: '/pages/myhome/means/album'
					})
				} 
			},
			bindPickerChange: function(e) {
			            console.log('picker发送选择改变，携带值为', e.target.value)
			            this.index = e.target.value
			        },
			        bindDateChange: function(e) {
			            this.date = e.target.value
			        },
			        bindTimeChange: function(e) {
			            this.time = e.target.value
			        },
			        getDate(type) {
			            const date = new Date();
			            let year = date.getFullYear();
			            let month = date.getMonth() + 1;
			            let day = date.getDate();
			
			            if (type === 'start') {
			                year = year - 60;
			            } else if (type === 'end') {
			                year = year + 2;
			            }
			            month = month > 9 ? month : '0' + month;;
			            day = day > 9 ? day : '0' + day;
			            return `${year}-${month}-${day}`;
			        }
			    }
	}
</script>
<style lang="scss">
	.navd {
		height: 35px;
		border-bottom: 1px solid #ccc;
	}
	.content{
		width:100%;
		background:#FFFFFF;
		.con{
			margin-left:128upx;
		}
		textarea{
			box-sizing: border-box;
			position: absolute;
			right:60upx;
			top:6%;
			width:470upx;
			height:150upx;
			border-radius:2px;
			border:1px solid rgba(210,210,210,1);
			font-size:12px;
			font-family:PingFangSC-Light,PingFang SC;
			font-weight:300;
			color:rgba(120,120,120,1);
			line-height:17px;
			padding-left:20upx;
			padding-top:8upx;
		}
		.btn{
			margin-top:60upx;
			width:90%;
			height:100upx;
			background:rgba(255,16,106,1);
			border-radius:25px;
			font-size:36upx;
			font-family:PingFangSC-Medium,PingFang SC;
			font-weight:500;
			color:rgba(255,255,255,1);
			line-height:100upx;
		}
		.select{
			box-sizing: border-box;
			width:470upx;
			border-radius:4upx;
			border:1px solid rgba(210,210,210,1);
			position:absolute;
			right:80upx;
			// width: 100%;
			// height: 10rpx;
			top:23%;
			padding-left:20upx;
			font-family:PingFangSC-Light,PingFang SC;
			font-weight:300;
			color:rgba(120,120,120,1);
			line-height:34upx;
		}
		input{
			box-sizing: border-box;
			width:470upx;
			height:50upx;
			border-radius:4upx;
			border:1px solid rgba(210,210,210,1);
			position:absolute;
			right:60upx;
			top:23%;
			padding-left:20upx;
			font-size:24upx;
			font-family:PingFangSC-Light,PingFang SC;
			font-weight:300;
			color:rgba(120,120,120,1);
			line-height:34upx;
		}
		.top{
			width:92%;
			margin-left:30upx;
			.red{
				font-size:32upx;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(255,0,96,1);
				margin-bottom:10upx;
			}
			.bom{
				font-size:28upx;
				font-family:PingFangSC-Light,PingFang SC;
				font-weight:300;
				color:rgba(30,30,30,1);
			}
		}
		.nav{
			width:92%;
			margin-left:30upx;
			.nav-con{
				line-height:200%;
				border-bottom:1px solid rgba(230,230,230,1);
				position: relative;
			}
			text{
				font-size:32upx;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(50,50,50,1);
			}
			image{
				width:40upx;
				height:40upx;
				margin-top:3%;
				position: absolute;
				right: 0;
			}
			.prr {
				position: absolute;
				right: 6%;
			}
		}
		.card{
			width:92%;
			margin-left:30upx;
			.wall{
				float:left;
				margin-top: 4.6%;
				width:8upx;
				height:40upx;
				background:rgba(255,0,96,1);
				border-radius:5px;
			}
			.title{
				text{
					margin-left:10upx;
				}
				width:100%;
				height:100upx;
				line-height:100upx;
			}
			.img{
				min-height:70upx;
				line-height:70upx;
				position:relative;
				text{
					margin-left:15upx;
					margin-right:78upx;
					font-size:28upx;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(50,50,50,1);
				}
				.icon image{
					position: absolute;
					top: 32upx;
					right: 80upx;
					width:20upx;
					height: 20upx;
				}
				.list{
					width: 466upx;
					height: 48upx;
					// position: absolute;
					top:76upx;
					left: 164upx;
					font-size: 28upx;
					font-weight:400;
					color:#787878;
					line-height: 48upx;
					padding-left: 20upx;
					border: 2upx solid #000000;
					box-sizing: border-box;
					margin-top: 20pupx;
				}
				image{
					float: right;
					width:50upx;
					height:50upx;
				}
			}
			.rm{
				position:relative;
				text{
					margin-left:15upx;
					display:inline-block;
					width:115upx;
					min-height:80upx;
					font-size:28upx;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(50,50,50,1);
					line-height:40upx;
				}
				image{
					 width:40upx;
					 height:35upx;
					 position:absolute;
					 top:28upx;
					 right:70upx;
				}
				picker{
					position:absolute;
					top:20upx;
					right:60upx;
					width:470upx;
					height:50upx;
					border-radius:2px;
					border:1px solid rgba(210,210,210,1);
					box-sizing: border-box;
					.uni-input{
						font-size:24upx;
						padding-left:20upx;
						line-height: 50upx;
						color:#8B8B8B;
					}
				}
			}
		}
		.hon{
			height:180upx;
			position:relative;
			text{
				margin-left:15upx;
				margin-right:78upx;
				font-size:28upx;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(50,50,50,1);
			}
			input{
				width:470upx;
				height:150upx;
				border-radius:4upx;
				border:1px solid rgba(210,210,210,1);
				top:5%;
			}
		}
	}
</style>