(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/ershou/index"],{"08e9":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=a(n("4795"));function a(e){return e&&e.__esModule?e:{default:e}}function r(e,t,n,o,a,r,i){try{var s=e[r](i),c=s.value}catch(u){return void n(u)}s.done?t(c):Promise.resolve(c).then(o,a)}function i(e){return function(){var t=this,n=arguments;return new Promise((function(o,a){var i=e.apply(t,n);function s(e){r(i,o,a,s,c,"next",e)}function c(e){r(i,o,a,s,c,"throw",e)}s(void 0)}))}}var s=function(){n.e("components/search").then(function(){return resolve(n("5ed1"))}.bind(null,n)).catch(n.oe)},c=function(){n.e("components/filtrate-top").then(function(){return resolve(n("3972"))}.bind(null,n)).catch(n.oe)},u=function(){n.e("components/notice-roll").then(function(){return resolve(n("d0fc"))}.bind(null,n)).catch(n.oe)},l={data:function(){return{refreshing:!1,loadMoreText:"",lists:[],page:1,noMoreData:!1,fliterParam:"",isClearChooseParam:!1,isClearSearchValue:!1,keyword:""}},components:{search:s,filtrateTop:c,noticeRoll:u},onShow:function(){var t=this;e.getStorage({key:"leaveIsReload",success:function(n){n.data?t.t():e.setStorage({key:"leaveIsReload",data:!0})},fail:function(n){e.setStorage({key:"leaveIsReload",data:!0}),t.t()}})},onUnload:function(){this.isClearChooseParam=!1,this.isClearSearchValue=!1,this.lists=[],this.noMoreData=!1,this.loadMoreText=""},onPullDownRefresh:function(){this.refreshing=!0,this.getData(this.fliterParam)},onReachBottom:function(){this.noMoreData||this.getData(this.fliterParam,!0)},methods:{t:function(){this.keyword="",this.fliterParam="",this.isClearChooseParam=!0,this.isClearSearchValue=!0},getData:function(){var t=arguments,n=this;return i(o.default.mark((function a(){var r,i,s;return o.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return r=t.length>0&&void 0!==t[0]?t[0]:"",i=t.length>1&&void 0!==t[1]&&t[1],s={page:n.refreshing?1:n.page},e.showLoading({title:"数据加载中"}),r.keyword&&void 0!=r.keyword&&(s.keyword=r.keyword),r.region_id&&void 0!=r.region_id&&(s.region_id=r.region_id),r.cate_id&&void 0!=r.cate_id&&(s.cate_id=r.cate_id),0==i&&(n.page=1,s.page=n.page),o.next=10,n.request.get(n.api.getUsedList,{data:s}).then((function(t){t.code?(n.refreshing?(n.refreshing=!1,e.stopPullDownRefresh(),n.lists=t.data,n.page=2,n.noMoreData=!1):(n.lists=n.lists.concat(t.data),n.page+=1),n.lists.length==t.count&&(n.noMoreData=!0,n.loadMoreText="没有更多了")):n.lists.length||(n.loadMoreText="无数据")})).catch((function(e){console.log("Error:",e)}));case 10:e.hideLoading();case 11:case"end":return o.stop()}}),a)})))()},jump:function(t){e.setStorageSync("leaveIsReload",!1),e.navigateTo({url:t})},filterParam:function(e){this.lists=[],this.isClearChooseParam=!1,void 0!=e.keyword?this.keyword=e.keyword:this.keyword&&(e.keyword=this.keyword),this.getData(e),this.fliterParam=e}},onShareAppMessage:function(e){return{title:"全国建筑工程承包 找活 招工",path:"/pages/ershou/index"}}};t.default=l}).call(this,n("543d")["default"])},"3a9e":function(e,t,n){"use strict";n.r(t);var o=n("08e9"),a=n.n(o);for(var r in o)"default"!==r&&function(e){n.d(t,e,(function(){return o[e]}))}(r);t["default"]=a.a},"41ef":function(e,t,n){"use strict";var o,a=function(){var e=this,t=e.$createElement;e._self._c},r=[];n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return o}))},f20e:function(e,t,n){"use strict";n.r(t);var o=n("41ef"),a=n("3a9e");for(var r in a)"default"!==r&&function(e){n.d(t,e,(function(){return a[e]}))}(r);var i,s=n("f0c5"),c=Object(s["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],i);t["default"]=c.exports},fbcc:function(e,t,n){"use strict";(function(e){n("cc73");o(n("66fd"));var t=o(n("f20e"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])}},[["fbcc","common/runtime","common/vendor"]]]);