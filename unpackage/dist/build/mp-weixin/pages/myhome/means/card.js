(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/myhome/means/card"],{"297c":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c},i=[];a.d(e,"a",function(){return n}),a.d(e,"b",function(){return i})},7071:function(t,e,a){"use strict";(function(t){a("49a9"),a("921b");n(a("66fd"));var e=n(a("8388"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])},8388:function(t,e,a){"use strict";a.r(e);var n=a("297c"),i=a("af09");for(var c in i)"default"!==c&&function(t){a.d(e,t,function(){return i[t]})}(c);a("eeb3");var u=a("2877"),o=Object(u["a"])(i["default"],n["a"],n["b"],!1,null,null,null);e["default"]=o.exports},a425:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n,i=c(a("7516"));function c(t){return t&&t.__esModule?t:{default:t}}getApp();var u=i.default.serverUrl,o={data:function(){return{imgUrl:this.$imgUrl,idCard1:imgUrl+"/upload/static/idcard1.png",idCard2:imgUrl+"/upload/static/idcard2.png",idCard3:imgUrl+"/upload/static/idcard1.png",idCard4:imgUrl+"/upload/static/idcard2.png"}},onLoad:function(){n=this},methods:{selectImg1:function(){t.chooseImage({count:1,success:function(t){n.idCard1=t.tempFilePaths[0]}})},selectImg2:function(){t.chooseImage({count:1,success:function(t){n.idCard2=t.tempFilePaths[0]}})},selectImg3:function(){t.chooseImage({count:1,success:function(t){n.idCard3=t.tempFilePaths[0]}})},selectImg4:function(){t.chooseImage({count:1,success:function(t){n.idCard4=t.tempFilePaths[0]}})},previewImg1:function(){t.previewImage({urls:[n.idCard1]})},previewImg2:function(){t.previewImage({urls:[n.idCard2]})},uploadCards:function(){if("imgUrl+'/upload/static/imgs/idcard1.png'"!=this.idCard1&&"imgUrl+'/upload/static/imgs/idcard2.png"!=this.idCard2){t.showLoading({title:"上传中"});t.uploadFile({url:u+"/app/user/fileUpload",filePath:n.idCard1,fileType:"image",name:"data",methods:"POST",success:function(t){console.log(t.data)}})}else t.showToast({title:"请选择身份证照片",icon:"none"})}}};e.default=o}).call(this,a("543d")["default"])},af09:function(t,e,a){"use strict";a.r(e);var n=a("a425"),i=a.n(n);for(var c in n)"default"!==c&&function(t){a.d(e,t,function(){return n[t]})}(c);e["default"]=i.a},eeb3:function(t,e,a){"use strict";var n=a("f95e"),i=a.n(n);i.a},f95e:function(t,e,a){}},[["7071","common/runtime","common/vendor"]]]);