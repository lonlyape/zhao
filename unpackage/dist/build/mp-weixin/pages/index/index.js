(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"28c2":function(e,t,n){"use strict";var a={uniSearchBar:function(){return n.e("components/uni-search-bar/uni-search-bar").then(n.bind(null,"8357"))},uniLoadMore:function(){return n.e("components/uni-load-more/uni-load-more").then(n.bind(null,"4fd7"))}},i=function(){var e=this,t=e.$createElement;e._self._c},r=[];n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return a}))},"3c45":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=i(n("4795"));function i(e){return e&&e.__esModule?e:{default:e}}function r(e,t,n,a,i,r,o){try{var s=e[r](o),u=s.value}catch(c){return void n(c)}s.done?t(u):Promise.resolve(u).then(a,i)}function o(e){return function(){var t=this,n=arguments;return new Promise((function(a,i){var o=e.apply(t,n);function s(e){r(o,a,i,s,u,"next",e)}function u(e){r(o,a,i,s,u,"throw",e)}s(void 0)}))}}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){c(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var l=function(){n.e("components/index/contract").then(function(){return resolve(n("6d78"))}.bind(null,n)).catch(n.oe)},f=function(){n.e("components/index/construction").then(function(){return resolve(n("cd39"))}.bind(null,n)).catch(n.oe)},h=function(){n.e("components/index/worker").then(function(){return resolve(n("c2a8"))}.bind(null,n)).catch(n.oe)},p=function(){n.e("components/index/materials").then(function(){return resolve(n("552c"))}.bind(null,n)).catch(n.oe)},d=function(){n.e("components/uni-load-more/uni-load-more").then(function(){return resolve(n("4fd7"))}.bind(null,n)).catch(n.oe)},m=function(){n.e("components/tabbar").then(function(){return resolve(n("8b53"))}.bind(null,n)).catch(n.oe)},g=function(){n.e("components/filtrate-top-new").then(function(){return resolve(n("4273"))}.bind(null,n)).catch(n.oe)},b={components:{worker:h,contract:l,materials:p,uniLoadMore:d,construction:f,filtrateTop:g,tabBar:m},data:function(){return{alive:0,bannerStyle:"",dataList:[],refreshing:!1,params:{},fileOption:{type:"chengbao",isRequireTeam:!0,isClearChooseParam:!1,isRequireCate:!1}}},computed:{loadStatus:function(){var e=this.dataList[this.alive];return e?e.status:"more"}},watch:{alive:function(e){var t=this.dataList[e];0==t.list.length&&"more"===t.status&&this.getData(),this.setFileOption()}},onLoad:function(e){this.setStyle(),this.initDataList(),this.getData()},onPullDownRefresh:function(){this.refreshing=!0,this.dataList.forEach((function(e){e.list=[],e.page=0,e.status="more"})),this.getData()},onReachBottom:function(){"nomore"!=this.dataList[this.alive].status&&this.getData()},methods:{setFileOption:function(){switch(this.alive){case 0:this.fileOption={type:"chengbao",isRequireTeam:!0,isRequireCate:!1,isClearChooseParam:!1};break;case 1:this.fileOption={type:"zhaogong",isRequireTeam:!1,isRequireCate:!0,isClearChooseParam:!0};break;case 2:this.fileOption={type:"zhaohuo",isRequireTeam:!0,isRequireCate:!0,isClearChooseParam:!0};break;case 3:this.fileOption={type:"gczp",isRequireTeam:!0,isRequireCate:!1,isClearChooseParam:!1};break;case 4:this.fileOption={type:"zhaogong",isRequireTeam:!1,isRequireCate:!1,isClearChooseParam:!1};break;case 5:this.fileOption={type:"",isRequireTeam:!1,isRequireCate:!1,isClearChooseParam:!1};break}},selectTab:function(e){this.alive=e},search:function(e){console.log(e),this.params=u({},this.params,{keyword:e.value}),this.initQuery(),this.getData()},filterParam:function(e){var t={};for(var n in this.params.keyword&&(t.keyword=this.params.keyword),e)e[n]&&(t[n]=e[n]);this.params=t,this.initQuery(),this.getData()},setStyle:function(){var t=this;e.getSystemInfo({success:function(e){var n="width:100%;",a=e.windowWidth/2.2;n+="height:"+a+"px",t.bannerStyle=n}})},initDataList:function(){var e=[{tabName:"综合承包",list:[],page:1,pageSize:10,status:"more",url:this.api.getWorkList+"?type=3"},{tabName:"工地招工",list:[],page:1,pageSize:10,status:"more",url:this.api.getWorkList+"?type=1"},{tabName:"工人找活",list:[],page:1,pageSize:10,status:"more",url:this.api.getWorkList+"?type=2"},{tabName:"工厂招聘",list:[],page:1,pageSize:10,status:"more",url:this.api.getWorkList+"?type=5"},{tabName:"找厂工",list:[],page:1,pageSize:10,status:"more",url:this.api.getWorkList+"?type=4"},{tabName:"材料采购",list:[],page:1,pageSize:10,status:"more",url:this.api.getWorkList+"?type=10"}];this.dataList=e},initQuery:function(){this.dataList.forEach((function(e){e.page=1,e.status="more"}))},getData:function(){var t=this;return o(a.default.mark((function n(){var i,r,o;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return i=t.alive,r=t.dataList[i],o=u({page:r.page++},t.params),0==i&&o.team_id&&(o.team=o.team_id,delete o.team_id),r.status="loading",n.next=7,t.request.get(r.url,{data:o}).then((function(n){n.code?(n.data&&n.data.forEach((function(e){e.phone=e.phone.substring(0,3)+"*****"+e.phone.substring(7)})),1==o.page?(n.data&&(r.list=n.data),t.refreshing&&(e.stopPullDownRefresh(),t.refreshing=!1)):n.data&&(r.list=r.list.concat(n.data)),r.list.length==n.count?r.status="nomore":r.status="more"):("无数据"===n.msg&&(1==o.page?(r.list=[],r.status="nomore"):r.status="nomore"),r.status="nomore")}));case 7:case"end":return n.stop()}}),n)})))()}},onShareAppMessage:function(e){return{title:"全国建筑工程承包 找活 招工",path:"/pages/index/index"}}};t.default=b}).call(this,n("543d")["default"])},"6ead":function(e,t,n){"use strict";n.r(t);var a=n("3c45"),i=n.n(a);for(var r in a)"default"!==r&&function(e){n.d(t,e,(function(){return a[e]}))}(r);t["default"]=i.a},d276:function(e,t,n){},e701:function(e,t,n){"use strict";(function(e){n("e6e1");a(n("66fd"));var t=a(n("e8f3"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},e86b:function(e,t,n){"use strict";var a=n("d276"),i=n.n(a);i.a},e8f3:function(e,t,n){"use strict";n.r(t);var a=n("28c2"),i=n("6ead");for(var r in i)"default"!==r&&function(e){n.d(t,e,(function(){return i[e]}))}(r);n("e86b");var o,s=n("f0c5"),u=Object(s["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],o);t["default"]=u.exports}},[["e701","common/runtime","common/vendor"]]]);