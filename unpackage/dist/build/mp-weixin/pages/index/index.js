(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"2b82":function(t,e,n){"use strict";var a={uniSearchBar:function(){return n.e("components/uni-search-bar/uni-search-bar").then(n.bind(null,"8357"))},uniLoadMore:function(){return n.e("components/uni-load-more/uni-load-more").then(n.bind(null,"4fd7"))}},i=function(){var t=this,e=t.$createElement;t._self._c},r=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return a}))},"3c45":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(n("4795"));function i(t){return t&&t.__esModule?t:{default:t}}function r(t,e,n,a,i,r,o){try{var s=t[r](o),u=s.value}catch(c){return void n(c)}s.done?e(u):Promise.resolve(u).then(a,i)}function o(t){return function(){var e=this,n=arguments;return new Promise((function(a,i){var o=t.apply(e,n);function s(t){r(o,a,i,s,u,"next",t)}function u(t){r(o,a,i,s,u,"throw",t)}s(void 0)}))}}function s(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function u(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?s(Object(n),!0).forEach((function(e){c(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function c(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var l=function(){n.e("components/index/contract").then(function(){return resolve(n("6d78"))}.bind(null,n)).catch(n.oe)},f=function(){n.e("components/index/construction").then(function(){return resolve(n("cd39"))}.bind(null,n)).catch(n.oe)},h=function(){n.e("components/index/worker").then(function(){return resolve(n("c2a8"))}.bind(null,n)).catch(n.oe)},p=function(){n.e("components/index/materials").then(function(){return resolve(n("552c"))}.bind(null,n)).catch(n.oe)},d=function(){n.e("components/uni-load-more/uni-load-more").then(function(){return resolve(n("4fd7"))}.bind(null,n)).catch(n.oe)},m=function(){n.e("components/tabbar").then(function(){return resolve(n("8b53"))}.bind(null,n)).catch(n.oe)},b=function(){n.e("components/filtrate-top-new").then(function(){return resolve(n("4273"))}.bind(null,n)).catch(n.oe)},g={components:{worker:h,contract:l,materials:p,uniLoadMore:d,construction:f,filtrateTop:b,tabBar:m},data:function(){return{alive:0,bannerStyle:"",dataList:[],refreshing:!1,params:{},fileOption:{type:"chengbao",isRequireTeam:!0,isClearChooseParam:!1,isRequireCate:!1}}},computed:{loadStatus:function(){var t=this.dataList[this.alive];return t?t.status:"more"}},watch:{alive:function(t){var e=this.dataList[t];0==e.list.length&&"more"===e.status&&this.getData(),this.setFileOption()}},onLoad:function(t){this.setStyle(),this.initDataList(),this.getData()},onPullDownRefresh:function(){this.refreshing=!0,this.dataList.forEach((function(t){t.list=[],t.page=0,t.status="more"})),this.getData()},onReachBottom:function(){"nomore"!=this.dataList[this.alive].status&&this.getData()},methods:{setFileOption:function(){switch(this.alive){case 0:this.fileOption={type:"chengbao",isRequireTeam:!0,isRequireCate:!0,isClearChooseParam:!1};break;case 1:this.fileOption={type:"zhaogong",isRequireTeam:!1,isRequireCate:!0,isClearChooseParam:!0};break;case 2:this.fileOption={type:"zhaohuo",isRequireTeam:!0,isRequireCate:!0,isClearChooseParam:!0};break;case 3:this.fileOption={type:"gczp",isRequireTeam:!0,isRequireCate:!1,isClearChooseParam:!1};break;case 4:this.fileOption={type:"zhaogong",isRequireTeam:!1,isRequireCate:!1,isClearChooseParam:!1};break;case 5:this.fileOption={type:"",isRequireTeam:!1,isRequireCate:!1,isClearChooseParam:!1};break}},selectTab:function(t){this.alive=t},search:function(t){console.log(t),this.params=u({},this.params,{keyword:t.value}),this.initQuery(),this.getData()},filterParam:function(t){var e={};for(var n in this.params.keyword&&(e.keyword=this.params.keyword),t)t[n]&&(e[n]=t[n]);this.params=e,this.initQuery(),this.getData()},setStyle:function(){var e=this;t.getSystemInfo({success:function(t){var n="width:100%;",a=t.windowWidth/2.2;n+="height:"+a+"px",e.bannerStyle=n}})},initDataList:function(){var t=[{tabName:"综合承包",list:[],page:1,pageSize:10,status:"more",url:this.api.getWorkList+"?type=3"},{tabName:"工地招工",list:[],page:1,pageSize:10,status:"more",url:this.api.getWorkList+"?type=1"},{tabName:"工人找活",list:[],page:1,pageSize:10,status:"more",url:this.api.getWorkList+"?type=2"},{tabName:"工厂招聘",list:[],page:1,pageSize:10,status:"more",url:this.api.getWorkList+"?type=5"},{tabName:"找工人",list:[],page:1,pageSize:10,status:"more",url:this.api.getWorkList+"?type=4"},{tabName:"材料采购",list:[],page:1,pageSize:10,status:"more",url:this.api.getWorkList+"?type=10"}];this.dataList=t},initQuery:function(){this.dataList.forEach((function(t){t.page=1,t.status="more"}))},getData:function(){var e=this;return o(a.default.mark((function n(){var i,r,o;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return i=e.alive,r=e.dataList[i],o=u({page:r.page++},e.params),r.status="loading",n.next=6,e.request.get(r.url,{data:o}).then((function(n){n.code?(n.data&&n.data.forEach((function(t){t.phone=t.phone.substring(0,3)+"*****"+t.phone.substring(7)})),1==o.page?(n.data&&(r.list=n.data),e.refreshing&&(t.stopPullDownRefresh(),e.refreshing=!1)):n.data&&(r.list=r.list.concat(n.data)),r.list.length==n.count?r.status="nomore":r.status="more"):("无数据"===n.msg&&(1==o.page?(r.list=[],r.status="nomore"):r.status="nomore"),r.status="nomore")}));case 6:case"end":return n.stop()}}),n)})))()}}};e.default=g}).call(this,n("543d")["default"])},"6ead":function(t,e,n){"use strict";n.r(e);var a=n("3c45"),i=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);e["default"]=i.a},d276:function(t,e,n){},e701:function(t,e,n){"use strict";(function(t){n("e6e1");a(n("66fd"));var e=a(n("e8f3"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},e86b:function(t,e,n){"use strict";var a=n("d276"),i=n.n(a);i.a},e8f3:function(t,e,n){"use strict";n.r(e);var a=n("2b82"),i=n("6ead");for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);n("e86b");var o,s=n("f0c5"),u=Object(s["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],o);e["default"]=u.exports}},[["e701","common/runtime","common/vendor"]]]);