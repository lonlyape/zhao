(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/shop/details"],{"06e2":function(t,e,n){"use strict";var a,o=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return a}))},2463:function(t,e,n){"use strict";var a=n("85a6"),o=n.n(a);o.a},"43ba":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=o(n("4795"));function o(t){return t&&t.__esModule?t:{default:t}}function i(t){if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(t=r(t))){var e=0,n=function(){};return{s:n,n:function(){return e>=t.length?{done:!0}:{done:!1,value:t[e++]}},e:function(t){throw t},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,o,i=!0,c=!1;return{s:function(){a=t[Symbol.iterator]()},n:function(){var t=a.next();return i=t.done,t},e:function(t){c=!0,o=t},f:function(){try{i||null==a.return||a.return()}finally{if(c)throw o}}}}function r(t,e){if(t){if("string"===typeof t)return c(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?c(t,e):void 0}}function c(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}function s(t,e,n,a,o,i,r){try{var c=t[i](r),s=c.value}catch(u){return void n(u)}c.done?e(s):Promise.resolve(s).then(a,o)}function u(t){return function(){var e=this,n=arguments;return new Promise((function(a,o){var i=t.apply(e,n);function r(t){s(i,a,o,r,c,"next",t)}function c(t){s(i,a,o,r,c,"throw",t)}r(void 0)}))}}var d=function(){n.e("components/share").then(function(){return resolve(n("3a6d"))}.bind(null,n)).catch(n.oe)},l={data:function(){return{specClass:"none",specSelected:[],data:[],favorite:!0,shareList:[{type:1,icon:"/static/temp/share_wechat.png",text:"微信好友"},{type:2,icon:"/static/temp/share_moment.png",text:"朋友圈"},{type:3,icon:"/static/temp/share_qq.png",text:"QQ好友"},{type:4,icon:"/static/temp/share_qqzone.png",text:"QQ空间"}],specList:[{id:1,name:"尺寸"},{id:2,name:"颜色"}],specChildList:[{id:1,pid:1,name:"XS"},{id:2,pid:1,name:"S"},{id:3,pid:1,name:"M"},{id:4,pid:1,name:"L"},{id:5,pid:1,name:"XL"},{id:6,pid:1,name:"XXL"},{id:7,pid:2,name:"白色"},{id:8,pid:2,name:"珊瑚粉"},{id:9,pid:2,name:"草木绿"}]}},components:{share:d},onLoad:function(t){this.loadData(t.id)},methods:{loadData:function(e){var n=this;return u(a.default.mark((function o(){return a.default.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.showLoading({title:"数据加载中"}),a.next=3,n.request.get(n.api.getToolShopDetails,{data:{goods_id:e}}).then((function(t){t.code&&(n.data=t.data,""!=n.data.content&&(n.data.content=n.func.formatRichText(n.data.content)))})).catch((function(t){console.log(t)}));case 3:n.specList.forEach((function(t){var e,a=i(n.specChildList);try{for(a.s();!(e=a.n()).done;){var o=e.value;if(o.pid===t.id){n.$set(o,"selected",!0),n.specSelected.push(o);break}}}catch(r){a.e(r)}finally{a.f()}})),t.hideLoading();case 5:case"end":return a.stop()}}),o)})))()},toggleSpec:function(){var t=this;"show"===this.specClass?(this.specClass="hide",setTimeout((function(){t.specClass="none"}),250)):"none"===this.specClass&&(this.specClass="show")},selectSpec:function(t,e){var n=this,a=this.specChildList;a.forEach((function(t){t.pid===e&&n.$set(t,"selected",!1)})),this.$set(a[t],"selected",!0),this.specSelected=[],a.forEach((function(t){!0===t.selected&&n.specSelected.push(t)}))},share:function(){this.$refs.share.toggleMask()},toFavorite:function(){this.favorite=!this.favorite},buy:function(){t.navigateTo({url:"/pages/order/createOrder"})},stopPrevent:function(){},call:function(e){t.makePhoneCall({phoneNumber:e})},copy:function(e){t.setClipboardData({data:e,success:function(){console.log("success")}})}},onShareAppMessage:function(t){return{title:"全国建筑工程承包 找活 招工",path:"/pages/shop/details?id=".concat(this.data.id)}}};e.default=l}).call(this,n("543d")["default"])},"85a6":function(t,e,n){},"8ca4":function(t,e,n){"use strict";(function(t){n("cc73");a(n("66fd"));var e=a(n("94c8"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"94c8":function(t,e,n){"use strict";n.r(e);var a=n("06e2"),o=n("da64");for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);n("2463");var r,c=n("f0c5"),s=Object(c["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],r);e["default"]=s.exports},da64:function(t,e,n){"use strict";n.r(e);var a=n("43ba"),o=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=o.a}},[["8ca4","common/runtime","common/vendor"]]]);