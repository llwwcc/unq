(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/jyf-Parser/trees"],{"0775":function(t,e,r){"use strict";r.r(e);var n=r("adf8"),o=r("c349");for(var i in o)"default"!==i&&function(t){r.d(e,t,function(){return o[t]})}(i);r("633f");var a=r("2877"),s=r("8b5d"),u=Object(a["a"])(o["default"],n["a"],n["b"],!1,null,null,null);"function"===typeof s["a"]&&Object(s["a"])(u),e["default"]=u.exports},"633f":function(t,e,r){"use strict";var n=r("ff17"),o=r.n(n);o.a},"8b5d":function(t,e,r){"use strict";var n=function(t){t.options.wxsCallMethods||(t.options.wxsCallMethods=[])};e["a"]=n},adf8:function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c},o=[];r.d(e,"a",function(){return n}),r.d(e,"b",function(){return o})},c349:function(t,e,r){"use strict";r.r(e);var n=r("e853"),o=r.n(n);for(var i in n)"default"!==i&&function(t){r.d(e,t,function(){return n[t]})}(i);e["default"]=o.a},e853:function(t,e,r){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=function(){return Promise.resolve().then(r.bind(null,"0775"))},o={components:{trees:n},name:"trees",data:function(){return{controls:{},imgLoad:!1}},props:{nodes:{type:Array,default:[]},imgMode:{type:String,default:"default"}},mounted:function(){this._top=this.$parent;while("parser"!=this._top.$options.name){if(this._top._top){this._top=this._top._top;break}this._top=this._top.$parent}},beforeDestroy:function(){this._observer&&this._observer.disconnect()},methods:{playEvent:function(t){if(this._top.videoContext.length>1&&this._top.autopause){var e=!0,r=!1,n=void 0;try{for(var o,i=this._top.videoContext[Symbol.iterator]();!(e=(o=i.next()).done);e=!0){var a=o.value;a.id!=t.currentTarget.dataset.id&&a.context.pause()}}catch(s){r=!0,n=s}finally{try{e||null==i.return||i.return()}finally{if(r)throw n}}}},previewEvent:function(e){if(!e.currentTarget.dataset.ignore){var r=!0;this._top.$emit("imgtap",{id:e.target.id,src:e.currentTarget.dataset.src,ignore:function(){return r=!1}}),r&&this._top.autopreview&&t.previewImage({current:parseInt(e.currentTarget.dataset.current),urls:this._top.imgList.length?this._top.imgList:[e.currentTarget.dataset.src]})}},tapEvent:function(e){var r=!0;this._top.$emit("linkpress",{href:e.currentTarget.dataset.href,ignore:function(){return r=!1}}),r&&e.currentTarget.dataset.href&&("#"==e.currentTarget.dataset.href[0]?this._top.useAnchor&&this._top.navigateTo({id:e.currentTarget.dataset.href.substring(1)}):/^http/.test(e.currentTarget.dataset.href)?this._top.autocopy&&t.setClipboardData({data:e.currentTarget.dataset.href,success:function(){t.showToast({title:"链接已复制"})}}):t.navigateTo({url:e.currentTarget.dataset.href}))},triggerError:function(t,e,r,n,o){this._top.$emit("error",{source:t,target:e,errMsg:r,errCode:n,context:o})},loadSource:function(t){return!this.controls[t.id]&&t.source.length>1?(this.$set(this.controls,t.id,{play:!1,index:1}),!0):!!(this.controls[t.id]&&t.source.length>this.controls[t.id].index+1)&&(this.$set(this.controls[t.id],"index",this.controls[t.id].index+1),!0)},adError:function(t){this.triggerError("ad",t.currentTarget,"",t.detail.errorCode)},videoError:function(e){!this.loadSource(e.currentTarget.dataset)&&this._top&&this.triggerError("video",e.currentTarget,e.detail.errMsg,void 0,t.createVideoContext(e.currentTarget.id,this))},audioError:function(t){this.loadSource(t.currentTarget.dataset)||this.triggerError("audio",t.currentTarget,t.detail.errMsg)},_loadVideo:function(t){this.$set(this.controls,t.currentTarget.dataset.id,{play:!0,index:0})}}};e.default=o}).call(this,r("543d")["default"])},ff17:function(t,e,r){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/jyf-Parser/trees-create-component',
    {
        'components/jyf-Parser/trees-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("0775"))
        })
    },
    [['components/jyf-Parser/trees-create-component']]
]);