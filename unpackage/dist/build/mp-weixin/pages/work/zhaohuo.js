(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/work/zhaohuo"],{3632:function(e,t,a){"use strict";a.r(t);var n=a("d1ca"),o=a.n(n);for(var r in n)"default"!==r&&function(e){a.d(t,e,(function(){return n[e]}))}(r);t["default"]=o.a},"5ede":function(e,t,a){"use strict";a.r(t);var n=a("bd5f"),o=a("3632");for(var r in o)"default"!==r&&function(e){a.d(t,e,(function(){return o[e]}))}(r);var i,s=a("f0c5"),u=Object(s["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],i);t["default"]=u.exports},bd5f:function(e,t,a){"use strict";var n,o=function(){var e=this,t=e.$createElement;e._self._c},r=[];a.d(t,"b",(function(){return o})),a.d(t,"c",(function(){return r})),a.d(t,"a",(function(){return n}))},d1ca:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=o(a("4795"));function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t,a,n,o,r,i){try{var s=e[r](i),u=s.value}catch(c){return void a(c)}s.done?t(u):Promise.resolve(u).then(n,o)}function i(e){return function(){var t=this,a=arguments;return new Promise((function(n,o){var i=e.apply(t,a);function s(e){r(i,n,o,s,u,"next",e)}function u(e){r(i,n,o,s,u,"throw",e)}s(void 0)}))}}var s=function(){a.e("components/search").then(function(){return resolve(a("1ee7"))}.bind(null,a)).catch(a.oe)},u=function(){a.e("components/filtrate-top").then(function(){return resolve(a("d2ab"))}.bind(null,a)).catch(a.oe)},c=function(){a.e("components/notice-roll").then(function(){return resolve(a("95ae"))}.bind(null,a)).catch(a.oe)},l={data:function(){return{refreshing:!1,loadMoreText:"",lists:[],page:1,noMoreData:!1,isRequireTeam:!0,fliterParam:"",isClearChooseParam:!1,isClearSearchValue:!1,keyword:""}},components:{search:s,filtrateTop:u,noticeRoll:c},onShow:function(){var t=this;e.getStorage({key:"leaveIsReload",success:function(a){a.data?t.t():e.setStorage({key:"leaveIsReload",data:!0})},fail:function(a){e.setStorage({key:"leaveIsReload",data:!0}),t.t()}})},onHide:function(){var t=this;this.isClearChooseParam=!1,this.isClearSearchValue=!1,e.getStorage({key:"leaveIsReload",success:function(e){e.data&&(t.lists=[],t.noMoreData=!1,t.loadMoreText="")}})},onPullDownRefresh:function(){this.refreshing=!0,this.getData(this.fliterParam)},onReachBottom:function(){this.noMoreData||this.getData(this.fliterParam,!0)},methods:{t:function(){this.keyword="",this.fliterParam="",this.isClearChooseParam=!0,this.isClearSearchValue=!0},getData:function(){var t=arguments,a=this;return i(n.default.mark((function o(){var r,i,s;return n.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=t.length>0&&void 0!==t[0]?t[0]:"",i=t.length>1&&void 0!==t[1]&&t[1],s={page:a.refreshing?1:a.page},e.showLoading({title:"数据加载中"}),r.keyword&&void 0!=r.keyword&&(s.keyword=r.keyword),r.region_id&&void 0!=r.region_id&&(s.region_id=r.region_id),r.cate_id&&void 0!=r.cate_id&&(s.cate_id=r.cate_id),r.team_id&&void 0!=r.team_id&&(s.team=r.team_id),0==i&&(a.page=1,s.page=a.page),n.next=11,a.request.get(a.api.getZhaoHuoList,{data:s}).then((function(t){t.code?(a.refreshing?(a.refreshing=!1,e.stopPullDownRefresh(),a.lists=t.data,a.page=2,a.noMoreData=!1):(a.lists=a.lists.concat(t.data),a.page+=1),a.lists.length==t.count&&(a.noMoreData=!0,a.loadMoreText="没有更多了")):a.lists.length||(a.loadMoreText="无数据")})).catch((function(e){console.log("Error:",e)}));case 11:e.hideLoading();case 12:case"end":return n.stop()}}),o)})))()},jump:function(t){e.setStorageSync("leaveIsReload",!1),e.navigateTo({url:t})},filterParam:function(e){this.lists=[],this.isClearChooseParam=!1,void 0!=e.keyword?this.keyword=e.keyword:this.keyword&&(e.keyword=this.keyword),this.getData(e),this.fliterParam=e}},onShareAppMessage:function(e){return{title:"全国建筑工程承包 找活 招工",path:"/pages/work/zhaohuo"}}};t.default=l}).call(this,a("543d")["default"])},fbb9:function(e,t,a){"use strict";(function(e){a("c74e");n(a("66fd"));var t=n(a("5ede"));function n(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,a("543d")["createPage"])}},[["fbb9","common/runtime","common/vendor"]]]);