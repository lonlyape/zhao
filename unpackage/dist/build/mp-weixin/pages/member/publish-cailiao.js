(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/member/publish-cailiao"],{"62f9":function(e,t,n){"use strict";var o={uniPopup:function(){return n.e("components/uni-popup/uni-popup").then(n.bind(null,"48c4"))}},c=function(){var e=this,t=e.$createElement;e._self._c},r=[];n.d(t,"b",(function(){return c})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return o}))},7004:function(e,t,n){},"7c8c":function(e,t,n){"use strict";(function(e){n("cc73");o(n("66fd"));var t=o(n("c49f"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},8958:function(e,t,n){"use strict";var o=n("7004"),c=n.n(o);c.a},c49f:function(e,t,n){"use strict";n.r(t);var o=n("62f9"),c=n("fe37");for(var r in c)"default"!==r&&function(e){n.d(t,e,(function(){return c[e]}))}(r);n("8958");var i,u=n("f0c5"),a=Object(u["a"])(c["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],i);t["default"]=a.exports},f666:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n("2f62");function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var u=function(){n.e("components/member/annotation/zhaohuo").then(function(){return resolve(n("36ee"))}.bind(null,n)).catch(n.oe)},a=function(){n.e("components/uni-popup/uni-popup").then(function(){return resolve(n("48c4"))}.bind(null,n)).catch(n.oe)},s=function(){n.e("components/member/popup-cate").then(function(){return resolve(n("71b9"))}.bind(null,n)).catch(n.oe)},l=function(){n.e("components/member/popup-region").then(function(){return resolve(n("67c1"))}.bind(null,n)).catch(n.oe)},h=function(){n.e("components/member/choose-team").then(function(){return resolve(n("3e11"))}.bind(null,n)).catch(n.oe)},p=function(){Promise.all([n.e("common/vendor"),n.e("components/member/upload-image")]).then(function(){return resolve(n("4e0d"))}.bind(null,n)).catch(n.oe)},f=function(){n.e("components/member/publish-tcp").then(function(){return resolve(n("dc8c"))}.bind(null,n)).catch(n.oe)},m=n("553c"),d={data:function(){return{team:"",cateName:"",cateId:"",mtId:"",mtName:"",regionId:"",regionName:"",pgId:"",pgName:"",imageList:[],imageList2:[],isTcp:"",tcpStatus:1,isTextAreaShow:!0,textAreaContent:"",textAreaContent2:""}},computed:r({},(0,o.mapState)(["hasLogin","userInfo"])),components:{zhaoHuo:u,uniPopup:a,popupCate:s,popupRegion:l,chooseTeam:h,uploadImage:p,publishTcp:f},onLoad:function(){},methods:{togglePopup:function(e,t){"object"==typeof e?(this.isTextAreaShow=!0,this.$refs[e.ref].close()):"close"==e&&t?(this.isTextAreaShow=!0,this.$refs[t].close()):(this.isTextAreaShow=!1,console.log(t),this.$refs[t].open())},confirmCateChoose:function(e){this.cateId=e.cateId,this.cateName=e.cateName},confirmMt:function(e){this.mtId=e.cateId,this.mtName=e.cateName},confirmPg:function(e){this.pgId=e.cateId,this.pgName=e.cateName},confirmRegionChoose:function(e){this.regionId=e.regionId,this.regionName=e.regionName},getChooseTeamVal:function(e){this.team=e.team},getImageUrl:function(e){this.imageList=e},getImageUrl2:function(e){this.imageList2=e,console.log(e)},getPublishTcpValue:function(e){this.isTcp=e.value,this.tcpStatus=e.status,this.isTextAreaShow=e.isTextAreaShow},bindTextArea:function(e){this.textAreaContent=e.detail.value},bindTextArea2:function(e){this.textAreaContent2=e.detail.value},formSubmit:function(t){var n=[{name:"title",checkType:"notnull",checkRule:"",errorMsg:"请输入标题"},{name:"cate_id",checkType:"notnull",checkRule:"",errorMsg:"请选择所属分类"},{name:"mt_id",checkType:"notnull",checkRule:"",errorMsg:"请选择所属材料"},{name:"pg_id",checkType:"notnull",checkRule:"",errorMsg:"请选择包装规格"},{name:"price",checkType:"notnull",checkRule:"",errorMsg:"输入价格"},{name:"company_name",checkType:"notnull",checkRule:"",errorMsg:"输入店名"},{name:"region_id",checkType:"notnull",checkRule:"",errorMsg:"请选择产地"},{name:"contact",checkType:"notnull",checkRule:"",errorMsg:"请输入联系人"},{name:"phone",checkType:"notnull",checkRule:"",errorMsg:"请输入联系电话"},{name:"phone",checkType:"reg",checkRule:"^[1][3-9]{1}[0-9]{9}$",errorMsg:"请正确输入联系电话"},{name:"content1",checkType:"notnull",checkRule:"",errorMsg:"请输入详情信息"},{name:"content2",checkType:"notnull",checkRule:"",errorMsg:"请输入订购说明"}];this.tcpStatus&&n.push({name:"is_tcp",checkType:"notnull",checkRule:"",errorMsg:"请认真阅读招老板平台发布协议"});var o=t.detail.value,c=m.check(o,n);c?(e.showLoading({title:"发布中",mask:!0}),this.request.post(this.api.publishMaterial,{data:o}).then((function(t){e.hideLoading(),e.showModal({title:"提示",content:t.msg,showCancel:!1,success:function(t){t.confirm&&e.redirectTo({url:"publish-cailiao-list"})}})})).catch((function(t){console.log(t),e.hideLoading(),e.showModal({title:"提示",content:"网络错误",showCancel:!1})}))):this.func.msg(m.error)}}};t.default=d}).call(this,n("543d")["default"])},fe37:function(e,t,n){"use strict";n.r(t);var o=n("f666"),c=n.n(o);for(var r in o)"default"!==r&&function(e){n.d(t,e,(function(){return o[e]}))}(r);t["default"]=c.a}},[["7c8c","common/runtime","common/vendor"]]]);