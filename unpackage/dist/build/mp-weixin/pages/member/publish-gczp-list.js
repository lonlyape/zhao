(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/member/publish-gczp-list"],{"3f28":function(t,e,n){"use strict";n.r(e);var o=n("5044"),r=n.n(o);for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);e["default"]=r.a},"49e7":function(t,e,n){"use strict";var o=n("5ebf"),r=n.n(o);r.a},5044:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=i(n("4795")),r=n("2f62");function i(t){return t&&t.__esModule?t:{default:t}}function s(t,e,n,o,r,i,s){try{var a=t[i](s),c=a.value}catch(u){return void n(u)}a.done?e(c):Promise.resolve(c).then(o,r)}function a(t){return function(){var e=this,n=arguments;return new Promise((function(o,r){var i=t.apply(e,n);function a(t){s(i,o,r,a,c,"next",t)}function c(t){s(i,o,r,a,c,"throw",t)}a(void 0)}))}}function c(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function u(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(Object(n),!0).forEach((function(e){f(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function f(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var l=function(){n.e("components/member/list-top").then(function(){return resolve(n("a2a3"))}.bind(null,n)).catch(n.oe)},d={data:function(){return{refreshing:!1,loadMoreText:"",lists:[],page:1,noMoreData:!1,settingName:"设为已招到",top_config:[]}},computed:u({},(0,r.mapState)(["hasLogin","userInfo"])),components:{listTop:l},onLoad:function(){this.getData()},onPullDownRefresh:function(){this.refreshing=!0,this.getData()},onReachBottom:function(){this.noMoreData||this.getData()},methods:{getData:function(){var e=this;return a(o.default.mark((function n(){var r;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(t.showLoading({title:"数据加载中"}),r={user_id:e.userInfo.uid,type:5,page:e.refreshing?1:e.page},!e.refreshing&&1!=e.page){n.next=5;break}return n.next=5,e.request.post(e.api.getTopConfig,{data:{isApi:!0}}).then((function(t){e.top_config=t.data}));case 5:return n.next=7,e.request.post(e.api.getUserWrokList,{data:r}).then((function(n){n.code?(e.refreshing?(e.refreshing=!1,t.stopPullDownRefresh(),e.lists=n.data,e.page=2,e.noMoreData=!1):(e.lists=e.lists.concat(n.data),e.page+=1),e.lists.length==n.count&&(e.noMoreData=!0,e.loadMoreText="没有更多了")):e.lists.length||(e.loadMoreText="无数据")})).catch((function(t){console.log("Error:",t)}));case 7:t.hideLoading();case 8:case"end":return n.stop()}}),n)})))()},setting:function(e){var n=this,o=this,r={work_id:e.id,user_id:this.userInfo.uid,status:3};function i(){o.lists.forEach((function(t){t.id==e.id&&(o.$set(e,"status",3),o.$set(e,"status_text","已招到"))}))}t.showModal({title:"提示",content:"确定要"+this.settingName+"吗？",success:function(t){t.confirm&&n.request.post(n.api.updateWorkStatus,{data:r}).then((function(t){t.code?(i(),n.func.msg(t.msg)):n.func.msg(t.msg)})).catch((function(t){console.log(t)}))}})},top:function(e){var n=this,o=e.id,r=e.type,i=e.title,s=e.is_top,a=e.top_time,c=this.top_config.deduct_bean;function u(e,i){t.showModal({title:"提示",content:e,success:function(e){e.confirm&&n.request.post(n.api.isTopWork,{data:{data_id:o,type:r,tab:"work",first:i,user_id:n.userInfo.uid}}).then((function(e){e.code?(n.refreshing=!0,n.getData(),t.showToast({title:e.msg})):t.showModal({title:"提示",content:e.msg,showCancel:!1})}))}})}s>=1?t.showModal({title:i+" 已在置顶中",content:"置顶时间："+a,confirmText:"再次置顶",success:function(t){t.confirm&&u("需要 "+c+" 豆币方可再次置顶，确定再次置顶吗?","no")}}):u("需要 "+c+" 豆币方可置顶，确定置顶吗?","yes")},deletes:function(e,n){var o=this,r=e.id;t.showModal({title:"提示",content:"确定要删除此信息吗?",success:function(e){e.confirm&&o.request.post(o.api.deleteWorkInfo,{data:{work_id:r,user_id:o.userInfo.uid}}).then((function(e){e.code?(o.lists.splice(n,1),t.showToast({title:e.msg})):t.showModal({title:"提示",content:e.msg,showCancel:!1})}))}})},jump:function(e){var n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];n?t.navigateTo({url:e}):t.redirectTo({url:e})}}};e.default=d}).call(this,n("543d")["default"])},"5ebf":function(t,e,n){},afed:function(t,e,n){"use strict";(function(t){n("cc73");o(n("66fd"));var e=o(n("ebfb"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},dfd7:function(t,e,n){"use strict";var o,r=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return o}))},ebfb:function(t,e,n){"use strict";n.r(e);var o=n("dfd7"),r=n("3f28");for(var i in r)"default"!==i&&function(t){n.d(e,t,(function(){return r[t]}))}(i);n("49e7");var s,a=n("f0c5"),c=Object(a["a"])(r["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],s);e["default"]=c.exports}},[["afed","common/runtime","common/vendor"]]]);