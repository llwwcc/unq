<!-- <template>
    
    <wiew>
        <view class="touxiangicon"   @click="upload">
            <image  class="huiyuan_img" :src="url" mode=""></image>
        </view>
        <view class="queding"><button class="save" @click="save">保存</button></view>
    </wiew>
    
    
</template>

<script>
    export default {
            data(){
				return {
					iconcheck: 0,//头像是否改变
					url: this.httpUrl+'file/static/uptouxiang.png', //默认头像
				}
			},
      
    }
</script>
<style lang="scss" scoped>
	
</style> -->
<template>
    <view>
  <view>
   <progress :percent="percent" stroke-width="10"></progress>
  </view>
  <view>
   <button type="primary" :loading="loading" :disabled="disabled" @click="upload">选择照片</button>
  </view>
 </view>
 
</template>
<script>
var _self;
export default {
 data:{
  percent:0,
  loading:false,
  disabled:false
 },
 methods : {
  upload : function(){
   _self = this;
   uni.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album'], //从相册选择
    success: function (res) {
     const tempFilePaths = res.tempFilePaths;
     const uploadTask = uni.uploadFile({
      url : 'https://demo.hcoder.net/index.php?c=uperTest',
      filePath: tempFilePaths[0],
      name: 'file',
      formData: {
       'user': 'test'
      },
      success: function (uploadFileRes) {
       console.log(uploadFileRes.data);
      }
     });
 
     uploadTask.onProgressUpdate(function (res) {
      _self.percent = res.progress;
      console.log('上传进度' + res.progress);
      console.log('已经上传的数据长度' + res.totalBytesSent);
      console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
     });
    },
    error : function(e){
     console.log(e);
    }
   });
  }
 },
    onLoad:function(){
  
    }
}
</script>