(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/article/details"],{"2a29":function(t,n,e){"use strict";e.r(n);var a=e("a591"),r=e("6405");for(var u in r)"default"!==u&&function(t){e.d(n,t,(function(){return r[t]}))}(u);e("3b7b");var i,c=e("f0c5"),o=Object(c["a"])(r["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],i);n["default"]=o.exports},"31ed":function(t,n,e){"use strict";(function(t){e("c74e");a(e("66fd"));var n=a(e("2a29"));function a(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},"3b7b":function(t,n,e){"use strict";var a=e("68f4"),r=e.n(a);r.a},6405:function(t,n,e){"use strict";e.r(n);var a=e("d572"),r=e.n(a);for(var u in a)"default"!==u&&function(t){e.d(n,t,(function(){return a[t]}))}(u);n["default"]=r.a},"68f4":function(t,n,e){},a591:function(t,n,e){"use strict";var a,r=function(){var t=this,n=t.$createElement;t._self._c},u=[];e.d(n,"b",(function(){return r})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return a}))},d572:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=r(e("4795"));function r(t){return t&&t.__esModule?t:{default:t}}function u(t,n,e,a,r,u,i){try{var c=t[u](i),o=c.value}catch(d){return void e(d)}c.done?n(o):Promise.resolve(o).then(a,r)}function i(t){return function(){var n=this,e=arguments;return new Promise((function(a,r){var i=t.apply(n,e);function c(t){u(i,a,r,c,o,"next",t)}function o(t){u(i,a,r,c,o,"throw",t)}c(void 0)}))}}var c={data:function(){return{data:[]}},onLoad:function(t){this.loadData(t)},methods:{loadData:function(n){var e=this;return i(a.default.mark((function r(){return a.default.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.showLoading({title:"数据加载中"}),a.next=3,e.request.get(e.api.getArticleDetails,{data:{article_id:n.article_id}}).then((function(t){t.code&&(e.data=t.data)})).catch((function(t){console.log("Error:",t)}));case 3:t.hideLoading();case 4:case"end":return a.stop()}}),r)})))()}},onShareAppMessage:function(t){return{title:"全国建筑工程承包 找活 招工",path:"/pages/article/details?article_id=".concat(this.data.id)}}};n.default=c}).call(this,e("543d")["default"])}},[["31ed","common/runtime","common/vendor"]]]);