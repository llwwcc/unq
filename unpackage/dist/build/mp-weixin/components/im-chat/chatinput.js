(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/im-chat/chatinput"],{"32ad":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={name:"chat-input",data:function(){return{inputValue:""}},props:{placeholder:{type:String,required:!0},focus:{type:Boolean,required:!0}},methods:{blur:function(){this.$emit("blur")},startRecognize:function(){var t={},n=this;t.engine="iFly",n.inputValue="",plus.speech.startRecognize(t,function(t){console.log(t),n.inputValue+=t},function(t){console.log("语音识别失败："+t.message)})},sendMessge:function(){if(this.inputValue){var n=this;this.$emit("send-message",{type:"text",content:n.inputValue}),n.inputValue=""}else t.showModal({content:"还没有输入内容哦!",showCancel:!1})}}};n.default=e}).call(this,e("543d")["default"])},5902:function(t,n,e){"use strict";e.r(n);var u=e("32ad"),a=e.n(u);for(var i in u)"default"!==i&&function(t){e.d(n,t,function(){return u[t]})}(i);n["default"]=a.a},"862c":function(t,n,e){"use strict";e.r(n);var u=e("9fb4"),a=e("5902");for(var i in a)"default"!==i&&function(t){e.d(n,t,function(){return a[t]})}(i);e("f7b6");var o=e("2877"),c=Object(o["a"])(a["default"],u["a"],u["b"],!1,null,null,null);n["default"]=c.exports},"9fb4":function(t,n,e){"use strict";var u=function(){var t=this,n=t.$createElement;t._self._c},a=[];e.d(n,"a",function(){return u}),e.d(n,"b",function(){return a})},da09:function(t,n,e){},f7b6:function(t,n,e){"use strict";var u=e("da09"),a=e.n(u);a.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/im-chat/chatinput-create-component',
    {
        'components/im-chat/chatinput-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("862c"))
        })
    },
    [['components/im-chat/chatinput-create-component']]
]);
