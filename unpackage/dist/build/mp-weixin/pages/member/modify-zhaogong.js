(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/member/modify-zhaogong"],{"187a":function(e,n,t){"use strict";t.r(n);var o=t("caed"),c=t("c37a");for(var r in c)"default"!==r&&function(e){t.d(n,e,(function(){return c[e]}))}(r);var i,a=t("f0c5"),u=Object(a["a"])(c["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],i);n["default"]=u.exports},a615:function(e,n,t){"use strict";(function(e){t("cc73");o(t("66fd"));var n=o(t("187a"));function o(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("543d")["createPage"])},a61f:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=r(t("4795")),c=t("2f62");function r(e){return e&&e.__esModule?e:{default:e}}function i(e,n,t,o,c,r,i){try{var a=e[r](i),u=a.value}catch(l){return void t(l)}a.done?n(u):Promise.resolve(u).then(o,c)}function a(e){return function(){var n=this,t=arguments;return new Promise((function(o,c){var r=e.apply(n,t);function a(e){i(r,o,c,a,u,"next",e)}function u(e){i(r,o,c,a,u,"throw",e)}a(void 0)}))}}function u(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?u(Object(t),!0).forEach((function(n){s(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):u(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var f=function(){t.e("components/member/annotation/zhaogong").then(function(){return resolve(t("a70e"))}.bind(null,t)).catch(t.oe)},d=function(){t.e("components/uni-popup/uni-popup").then(function(){return resolve(t("48c4"))}.bind(null,t)).catch(t.oe)},h=function(){t.e("components/member/popup-cate").then(function(){return resolve(t("71b9"))}.bind(null,t)).catch(t.oe)},p=function(){t.e("components/member/choose-region").then(function(){return resolve(t("3605"))}.bind(null,t)).catch(t.oe)},m=function(){Promise.all([t.e("common/vendor"),t.e("components/member/upload-image")]).then(function(){return resolve(t("4e0d"))}.bind(null,t)).catch(t.oe)},g=t("553c"),b={data:function(){return{data:[],region_id:"",cateName:"",cateId:"",isTextAreaShow:!0,textAreaContent:""}},computed:l({},(0,c.mapState)(["hasLogin","userInfo"])),components:{zhaoGong:f,uniPopup:d,popupCate:h,chooseRegion:p,uploadImage:m},onLoad:function(e){this.loadData(e)},methods:{loadData:function(n){var t=this;return a(o.default.mark((function c(){var r,i;return o.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return i=function(e){var n=[];""!=e.region.province_id&&n.push(e.region.province_id),""!=e.region.city_id&&n.push(e.region.city_id),r.team=e.team,r.cateId=e.cate.id,r.cateName=e.cate.name,r.region_id=n.join(","),r.textAreaContent=e.content},r=t,e.showLoading({title:"数据加载中"}),o.next=5,t.request.post(t.api.findWorkOneData,{data:{work_id:n.work_id,user_id:t.userInfo.uid}}).then((function(n){n.code?(t.data=n.data,i(n.data)):e.showModal({title:"提示",content:n.msg,showCancel:!1,success:function(n){n.confirm&&e.navigateBack()}})})).catch((function(e){console.log("Error:",e)}));case 5:e.hideLoading();case 6:case"end":return o.stop()}}),c)})))()},togglePopup:function(e,n){"object"==typeof e?(this.isTextAreaShow=!0,this.$refs[e.ref].close()):(this.isTextAreaShow=!1,this.$refs[n].open())},confirmChoose:function(e){this.cateId=e.cateId,this.cateName=e.cateName},getChooseRegionVal:function(e){this.region_id=e.region_id},bindTextArea:function(e){this.textAreaContent=e.detail.value},formSubmit:function(n){var t=n.detail.value,o=[{name:"title",checkType:"notnull",checkRule:"",errorMsg:"请输入标题"},{name:"cate_id",checkType:"notnull",checkRule:"",errorMsg:"请选择所需工种"},{name:"region_id",checkType:"notnull",checkRule:"",errorMsg:"请选择地区"},{name:"contact",checkType:"notnull",checkRule:"",errorMsg:"请输入联系人"},{name:"phone",checkType:"notnull",checkRule:"",errorMsg:"请输入联系电话"},{name:"phone",checkType:"reg",checkRule:"^[1][3-9]{1}[0-9]{9}$",errorMsg:"请正确输入联系电话"},{name:"company_name",checkType:"notnull",checkRule:"",errorMsg:"请输入单位名称"},{name:"content",checkType:"notnull",checkRule:"",errorMsg:"请输入招工详情"}],c=g.check(t,o);c?(e.showLoading({title:"修改中",mask:!0}),this.request.post(this.api.modifyZhaoGong,{data:t}).then((function(n){e.hideLoading(),e.showModal({title:"提示",content:n.msg,showCancel:!1,success:function(n){n.confirm&&e.redirectTo({url:"publish-zhaogong-list"})}})})).catch((function(n){console.log(n),e.hideLoading(),e.showModal({title:"提示",content:"网络错误",showCancel:!1})}))):this.func.msg(g.error)}}};n.default=b}).call(this,t("543d")["default"])},c37a:function(e,n,t){"use strict";t.r(n);var o=t("a61f"),c=t.n(o);for(var r in o)"default"!==r&&function(e){t.d(n,e,(function(){return o[e]}))}(r);n["default"]=c.a},caed:function(e,n,t){"use strict";var o={uniPopup:function(){return t.e("components/uni-popup/uni-popup").then(t.bind(null,"48c4"))}},c=function(){var e=this,n=e.$createElement;e._self._c},r=[];t.d(n,"b",(function(){return c})),t.d(n,"c",(function(){return r})),t.d(n,"a",(function(){return o}))}},[["a615","common/runtime","common/vendor"]]]);