(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/enroll/engage"],{"0dff":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return o})},"418c":function(t,e,n){"use strict";var i=n("8e85"),o=n.n(i);o.a},"50ee":function(t,e,n){"use strict";(function(t){n("49a9"),n("921b");i(n("66fd"));var e=i(n("5e6a"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"5e6a":function(t,e,n){"use strict";n.r(e);var i=n("0dff"),o=n("c8e6");for(var s in o)"default"!==s&&function(t){n.d(e,t,function(){return o[t]})}(s);n("418c");var u=n("2877"),a=Object(u["a"])(o["default"],i["a"],i["b"],!1,null,"55b5e647",null);e["default"]=a.exports},"8e85":function(t,e,n){},c8e6:function(t,e,n){"use strict";n.r(e);var i=n("fac7"),o=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);e["default"]=o.a},fac7:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=o(n("5592"));function o(t){return t&&t.__esModule?t:{default:t}}var s=function(){return n.e("components/im-chat/chatinput").then(n.bind(null,"862c"))},u={components:{chatInput:s},data:function(){return{anchorIndex:2,posts:i.default,user_id:4,username:"Liuxy",index:"",comment_index:"",input_placeholder:"评论",focus:!1,is_reply:!1,showInput:!1,screenHeight:"",platform:"",windowHeight:"",loadMoreText:"加载中...",showLoadMore:!1,imgUrl:this.$imgUrl}},mounted:function(){t.getStorage({key:"posts",success:function(t){console.log(t.data),this.posts=t.data}})},onLoad:function(){var e=this;t.getSystemInfo({success:function(t){e.screenHeight=t.screenHeight,e.platform=t.platform}}),t.startPullDownRefresh()},onShow:function(){var e=this;t.onWindowResize(function(t){"ios"===e.platform?(e.windowHeight=t.size.windowHeight,e.adjust()):e.screenHeight-t.size.windowHeight>60&&e.windowHeight<=t.size.windowHeight&&(e.windowHeight=t.size.windowHeight,e.adjust())})},onHide:function(){t.offWindowResize()},onUnload:function(){this.max=0,this.data=[],this.loadMoreText="加载更多",this.showLoadMore=!1},onReachBottom:function(){var t=this;console.log("onReachBottom"),this.showLoadMore=!0,setTimeout(function(){t.posts.length<20?t.posts=t.posts.concat(t.posts):t.loadMoreText="暂无更多"},1e3)},onPullDownRefresh:function(){console.log("onPullDownRefresh"),setTimeout(function(){t.stopPullDownRefresh()},1e3)},onNavigationBarButtonTap:function(t){0==t.index&&this.navigateTo("../publish/publish")},computed:{},methods:{btnClick:function(e){2!=e.target.dataset.index?(this.anchorIndex=1,t.navigateBack({})):(this.anchorIndex=e.target.dataset.index,t.navigateTo({url:"/pages/enroll/engage"}))},test:function(){this.navigateTo("../test/test")},navigateTo:function(e){t.navigateTo({url:e})},like:function(t){0===this.posts[t].islike?(this.posts[t].islike=1,this.posts[t].like.push({uid:this.user_id,username:","+this.username})):(this.posts[t].islike=0,this.posts[t].like.splice(this.posts[t].like.indexOf({uid:this.user_id,username:","+this.username}),1))},comment:function(t){this.showInput=!0,this.focus=!0,this.index=t},adjust:function(){},reply:function(t,e){this.is_reply=!0,this.showInput=!0;var n=this.posts[t].comments.comment[e].username;this.input_placeholder="回复"+n,this.index=t,this.comment_index=e,this.focus=!0},blur:function(){this.init_input()},send_comment:function(t){if(this.is_reply)var e=this.posts[this.index].comments.comment[this.comment_index].username,n="回复"+e+":"+t.content;else n=t.content;this.posts[this.index].comments.total+=1,this.posts[this.index].comments.comment.push({uid:this.user_id,username:this.username,content:n}),this.init_input()},init_input:function(){this.showInput=!1,this.focus=!1,this.input_placeholder="评论",this.is_reply=!1},previewImage:function(e,n){var i=e[n];t.previewImage({current:i,urls:e})},goPublish:function(){t.navigateTo({url:"./publish/publish",success:function(t){},fail:function(){},complete:function(){}})}}};e.default=u}).call(this,n("543d")["default"])}},[["50ee","common/runtime","common/vendor"]]]);