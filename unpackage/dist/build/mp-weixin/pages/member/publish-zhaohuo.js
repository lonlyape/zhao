(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/member/publish-zhaohuo"],{2558:function(e,t,n){"use strict";n.r(t);var o=n("613e"),c=n("b8af");for(var r in c)"default"!==r&&function(e){n.d(t,e,(function(){return c[e]}))}(r);var u,i=n("f0c5"),a=Object(i["a"])(c["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],u);t["default"]=a.exports},"448b":function(e,t,n){"use strict";(function(e){n("c74e");o(n("66fd"));var t=o(n("2558"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"613e":function(e,t,n){"use strict";var o={uniPopup:function(){return n.e("components/uni-popup/uni-popup").then(n.bind(null,"6cce"))}},c=function(){var e=this,t=e.$createElement;e._self._c},r=[];n.d(t,"b",(function(){return c})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return o}))},8842:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n("2f62");function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){u(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var i=function(){n.e("components/member/annotation/zhaohuo").then(function(){return resolve(n("8508"))}.bind(null,n)).catch(n.oe)},a=function(){n.e("components/uni-popup/uni-popup").then(function(){return resolve(n("6cce"))}.bind(null,n)).catch(n.oe)},s=function(){n.e("components/member/popup-cate").then(function(){return resolve(n("3b89"))}.bind(null,n)).catch(n.oe)},l=function(){n.e("components/member/popup-region").then(function(){return resolve(n("7d18"))}.bind(null,n)).catch(n.oe)},h=function(){n.e("components/member/choose-team").then(function(){return resolve(n("08dc"))}.bind(null,n)).catch(n.oe)},p=function(){Promise.all([n.e("common/vendor"),n.e("components/member/upload-image")]).then(function(){return resolve(n("1c21"))}.bind(null,n)).catch(n.oe)},f=function(){n.e("components/member/publish-tcp").then(function(){return resolve(n("c4f9"))}.bind(null,n)).catch(n.oe)},m=n("2ceb"),d={data:function(){return{team:"",cateName:"",cateId:"",regionId:"",regionName:"",imageList:[],idCardImageList:[],isTcp:"",tcpStatus:1,isTextAreaShow:!0,textAreaContent:""}},computed:r({},(0,o.mapState)(["hasLogin","userInfo"])),components:{zhaoHuo:i,uniPopup:a,popupCate:s,popupRegion:l,chooseTeam:h,uploadImage:p,publishTcp:f},onLoad:function(){},methods:{togglePopup:function(e,t){"object"==typeof e?(this.isTextAreaShow=!0,this.$refs[e.ref].close()):(this.isTextAreaShow=!1,this.$refs[t].open())},confirmCateChoose:function(e){this.cateId=e.cateId,this.cateName=e.cateName},confirmRegionChoose:function(e){this.regionId=e.regionId,this.regionName=e.regionName},getChooseTeamVal:function(e){this.team=e.team},getImageUrl:function(e){this.imageList=e},getIdCardImageUrl:function(e){this.idCardImageList=e},getPublishTcpValue:function(e){this.isTcp=e.value,this.tcpStatus=e.status,this.isTextAreaShow=e.isTextAreaShow},bindTextArea:function(e){this.textAreaContent=e.detail.value},formSubmit:function(t){var n=t.detail.value,o=[{name:"title",checkType:"notnull",checkRule:"",errorMsg:"请输入标题"},{name:"cate_id",checkType:"notnull",checkRule:"",errorMsg:"请选择专业工种"},{name:"region_id",checkType:"notnull",checkRule:"",errorMsg:"请选择接活区域"},{name:"team",checkType:"notnull",checkRule:"",errorMsg:"请选择人员构成"},{name:"contact",checkType:"notnull",checkRule:"",errorMsg:"请输入联系人"},{name:"phone",checkType:"notnull",checkRule:"",errorMsg:"请输入联系电话"},{name:"phone",checkType:"reg",checkRule:"^[1][3-9]{1}[0-9]{9}$",errorMsg:"请正确输入联系电话"},{name:"content",checkType:"notnull",checkRule:"",errorMsg:"请输入找活详情"}];this.tcpStatus&&o.push({name:"is_tcp",checkType:"notnull",checkRule:"",errorMsg:"请认真阅读招老板平台发布协议"});var c=m.check(n,o);c?(e.showLoading({title:"发布中",mask:!0}),this.request.post(this.api.publishZhaoHuo,{data:n}).then((function(t){e.hideLoading(),e.showModal({title:"提示",content:t.msg,showCancel:!1,success:function(t){t.confirm&&e.redirectTo({url:"publish-zhaohuo-list"})}})})).catch((function(t){console.log(t),e.hideLoading(),e.showModal({title:"提示",content:"网络错误",showCancel:!1})}))):this.func.msg(m.error)}}};t.default=d}).call(this,n("543d")["default"])},b8af:function(e,t,n){"use strict";n.r(t);var o=n("8842"),c=n.n(o);for(var r in o)"default"!==r&&function(e){n.d(t,e,(function(){return o[e]}))}(r);t["default"]=c.a}},[["448b","common/runtime","common/vendor"]]]);