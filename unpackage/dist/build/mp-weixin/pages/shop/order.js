(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/shop/order"],{"38e1":function(e,t,o){"use strict";o.r(t);var s=o("d958"),n=o.n(s);for(var a in s)"default"!==a&&function(e){o.d(t,e,function(){return s[e]})}(a);t["default"]=n.a},a266:function(e,t,o){"use strict";var s=function(){var e=this,t=e.$createElement,o=(e._self._c,e._f("toFixed")(e.goodsPrice)),s=e._f("toFixed")(e.deduction),n=e._f("toFixed")(e.sumPrice);e.$mp.data=Object.assign({},{$root:{f0:o,f1:s,f2:n}})},n=[];o.d(t,"a",function(){return s}),o.d(t,"b",function(){return n})},a2ca:function(e,t,o){"use strict";var s=o("cb3b"),n=o.n(s);n.a},bd4f:function(e,t,o){"use strict";o.r(t);var s=o("a266"),n=o("38e1");for(var a in n)"default"!==a&&function(e){o.d(t,e,function(){return n[e]})}(a);o("a2ca");var r=o("2877"),d=Object(r["a"])(n["default"],s["a"],s["b"],!1,null,"fc765a74",null);t["default"]=d.exports},cb3b:function(e,t,o){},d958:function(e,t,o){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=n(o("7516"));function n(e){return e&&e.__esModule?e:{default:e}}var a=getApp(),r=(a.globalData.openid,{data:function(){return{address:[],buylist:[],goodsPrice:0,sumPrice:0,freight:12,note:"",int:1200,deduction:0,recinfo:{},isShow:!0,userId:"",addressId:"",goodsId:"",openId:"1",number:""}},onLoad:function(t){var o=this;this.globalData=a.globalData;var n=s.default.serverUrl,r=this;e.request({url:n+"/app/appAddress/queryDefault?userId=1",method:"POST",success:function(e){var t=e.data.data;r.address=t,r.userId=e.data.data[0].userId,r.addressId=e.data.data[0].id,o.recinfo.length>0&&(o.isShow=!1)}})},onShow:function(){var t=this;console.log(this.openId),e.getStorage({key:"buylist",success:function(e){t.buylist=e.data,console.log("........",e.data[0]),t.goodsId=e.data[0].id,t.number=e.data[0].number,t.goodsPrice=0;for(var o=t.buylist.length,s=0;s<o;s++)t.goodsPrice=t.goodsPrice+t.buylist[s].number*t.buylist[s].price;t.deduction=t.int/100,t.sumPrice=t.goodsPrice-t.deduction+t.freight}}),e.getStorage({key:"selectAddress",success:function(o){t.recinfo=o.data,e.removeStorage({key:"selectAddress"})}})},onHide:function(){},onBackPress:function(){this.clearOrder()},filters:{toFixed:function(e){return parseFloat(e).toFixed(2)}},methods:{write:function(e){e.detail.value;this.value=this.note},clearOrder:function(){var t=this;e.removeStorage({key:"buylist",success:function(e){t.buylist=[],console.log("remove buylist success")}})},toPay:function(){for(var t=this,o=[],s=[],n=this.buylist.length,a=0;a<n;a++)o.push(this.buylist[a]),s.push(this.buylist[a].id);0!=o.length?(e.showLoading({title:"正在提交订单..."}),setTimeout(function(){e.setStorage({key:"paymentOrder",data:o,success:function(){e.hideLoading(),e.redirectTo({url:"/pages/money/pay?userId="+t.userId+"&addressId="+t.addressId+"&goodsId="+t.goodsId+"&openid="+t.openId+"&num="+t.number+"&userMsg="+t.note+"&amount="+t.sumPrice})}})},1e3)):e.showToast({title:"订单信息有误，请重新购买",icon:"none"})},selectAddress:function(){e.navigateTo({url:"/pages/address/address?type=select"})}}});t.default=r}).call(this,o("543d")["default"])},f1e6:function(e,t,o){"use strict";(function(e){o("49a9"),o("921b");s(o("66fd"));var t=s(o("bd4f"));function s(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,o("543d")["createPage"])}},[["f1e6","common/runtime","common/vendor"]]]);