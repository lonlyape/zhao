(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/popup-login"],{1179:function(e,t,n){"use strict";n.r(t);var o=n("4eb0"),i=n.n(o);for(var r in o)"default"!==r&&function(e){n.d(t,e,(function(){return o[e]}))}(r);t["default"]=i.a},"4eb0":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n("2f62");function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var c={props:{isPopupLogin:{type:Boolean,default:!1}},data:function(){return{isShow:!1,code:"",interval:null}},watch:{isPopupLogin:function(e){var t=this;this.isShow=e,e?(this.getCode(),this.interval=setInterval((function(){t.getCode()}),5e3)):clearInterval(this.interval)}},methods:r({getCode:function(){var t=this;e.login({provider:"weixin",success:function(e){t.code=e.code,console.log(t.code)}})},close:function(){this.isShow=!1,this.$emit("update:isPopupLogin",!1)},jump:function(t){e.navigateTo({url:t})}},(0,o.mapMutations)(["login","logout"]),{wxLogin:function(t){var n=this;if(e.showLoading({title:"登录中",mask:!0}),"getUserInfo:ok"==t.detail.errMsg){var o=t.detail.encryptedData,i=t.detail.signature,r=t.detail.iv,a=t.detail.userInfo.nickName,c=t.detail.userInfo.avatarUrl,u=t.detail.userInfo.gender;console.log(this.code);var s=this.code,l={encryptedData:o,signature:i,iv:r,name:a,head_img:c,gender:u,code:s};console.log(l),n.request.post(n.api.wxAppLogin,{data:l}).then((function(t){if(t.code){var o=t.data;e.hideLoading(),n.login(o),e.showToast({title:"登录成功"}),n.close(),e.getStorage({key:"return_url",success:function(t){e.navigateTo({url:t.data}),e.removeStorage({key:"return_url"})}})}else e.hideLoading(),e.showToast({title:t.data.msg,icon:"none"})})).catch((function(t){e.hideLoading(),console.log(t)}))}else e.hideLoading(),e.showModal({title:"提示",content:"获取用户信息失败",showCancel:!1})}})};t.default=c}).call(this,n("543d")["default"])},5181:function(e,t,n){"use strict";n.r(t);var o=n("d9ba"),i=n("1179");for(var r in i)"default"!==r&&function(e){n.d(t,e,(function(){return i[e]}))}(r);n("a2ee");var a,c=n("f0c5"),u=Object(c["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);t["default"]=u.exports},"8f3c":function(e,t,n){},a2ee:function(e,t,n){"use strict";var o=n("8f3c"),i=n.n(o);i.a},d9ba:function(e,t,n){"use strict";var o,i=function(){var e=this,t=e.$createElement;e._self._c},r=[];n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return o}))}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/popup-login-create-component',
    {
        'components/popup-login-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("5181"))
        })
    },
    [['components/popup-login-create-component']]
]);
