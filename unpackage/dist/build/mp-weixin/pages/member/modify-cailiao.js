(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/member/modify-cailiao"],{"1cff":function(e,t,n){"use strict";(function(e){n("e6e1");o(n("66fd"));var t=o(n("3c8a"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"350f":function(e,t,n){"use strict";var o={uniPopup:function(){return n.e("components/uni-popup/uni-popup").then(n.bind(null,"7c73"))}},c=function(){var e=this,t=e.$createElement;e._self._c},i=[];n.d(t,"b",(function(){return c})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return o}))},"3c8a":function(e,t,n){"use strict";n.r(t);var o=n("350f"),c=n("8872");for(var i in c)"default"!==i&&function(e){n.d(t,e,(function(){return c[e]}))}(i);n("4aa8");var r,a=n("f0c5"),u=Object(a["a"])(c["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],r);t["default"]=u.exports},"4aa8":function(e,t,n){"use strict";var o=n("b14b"),c=n.n(o);c.a},8872:function(e,t,n){"use strict";n.r(t);var o=n("d17b"),c=n.n(o);for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);t["default"]=c.a},b14b:function(e,t,n){},d17b:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=i(n("4795")),c=n("2f62");function i(e){return e&&e.__esModule?e:{default:e}}function r(e,t,n,o,c,i,r){try{var a=e[i](r),u=a.value}catch(s){return void n(s)}a.done?t(u):Promise.resolve(u).then(o,c)}function a(e){return function(){var t=this,n=arguments;return new Promise((function(o,c){var i=e.apply(t,n);function a(e){r(i,o,c,a,u,"next",e)}function u(e){r(i,o,c,a,u,"throw",e)}a(void 0)}))}}function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var m=function(){n.e("components/member/annotation/zhaohuo").then(function(){return resolve(n("d257"))}.bind(null,n)).catch(n.oe)},f=function(){n.e("components/uni-popup/uni-popup").then(function(){return resolve(n("7c73"))}.bind(null,n)).catch(n.oe)},h=function(){n.e("components/member/popup-cate").then(function(){return resolve(n("455d"))}.bind(null,n)).catch(n.oe)},d=function(){n.e("components/member/popup-region").then(function(){return resolve(n("d9ca"))}.bind(null,n)).catch(n.oe)},p=function(){n.e("components/member/choose-team").then(function(){return resolve(n("dca4"))}.bind(null,n)).catch(n.oe)},g=function(){Promise.all([n.e("common/vendor"),n.e("components/member/upload-image")]).then(function(){return resolve(n("8712"))}.bind(null,n)).catch(n.oe)},b=function(){n.e("components/member/publish-tcp").then(function(){return resolve(n("15bc"))}.bind(null,n)).catch(n.oe)},v=n("7d61"),k={data:function(){return{team:"",title:"",cateName:"",cateId:"",mtId:"",mtName:"",regionId:"",regionName:"",pgId:"",pgName:"",imageList:[],imageList2:[],isTcp:"",tcpStatus:0,isTextAreaShow:!0,textAreaContent:"",textAreaContent2:"",detailData:null,more:{}}},computed:s({},(0,c.mapState)(["hasLogin","userInfo"])),components:{zhaoHuo:m,uniPopup:f,popupCate:h,popupRegion:d,chooseTeam:p,uploadImage:g,publishTcp:b},onLoad:function(e){this.loadData(e)},methods:{loadData:function(t){var n=this;return a(o.default.mark((function c(){var i,r;return o.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return r=function(e){console.log(e);var t=[];""!=e.region.province_id&&t.push(e.region.province_id),""!=e.region.city_id&&t.push(e.region.city_id);var n="",o="";e.mt instanceof Array?e.mt.forEach((function(e){n=n?","+e.name:e.name,o=o?","+e.id:e.ids})):(n=e.mt.name,o=e.mt.id);var c="",r="";e.pg instanceof Array?e.pg.forEach((function(e){c=n?","+e.name:e.name,r=o?","+e.id:e.ids})):(c=e.pg.name,r=e.pg.id),i.mtId=o,i.mtName=n,i.pgName=c,i.pgId=r,i.regionId=t.join(","),i.imageList=e.image,i.imageList2=e.image1||[],i.title=e.title,i.textAreaContent=e.content1,i.textAreaContent2=e.content2,i.cateId=e.cate.id,i.cateName=e.cate.name},i=n,e.showLoading({title:"数据加载中"}),o.next=5,n.request.post(n.api.findWorkOneData,{data:{work_id:t.work_id,user_id:n.userInfo.uid}}).then((function(t){t.code?(n.detailData=t.data,n.more=n.detailData.more,r(t.data)):e.showModal({title:"提示",content:t.msg,showCancel:!1,success:function(t){t.confirm&&e.navigateBack()}})})).catch((function(e){console.log("Error:",e)}));case 5:e.hideLoading();case 6:case"end":return o.stop()}}),c)})))()},togglePopup:function(e,t){"object"==typeof e?(this.isTextAreaShow=!0,this.$refs[e.ref].close()):"close"==e&&t?(this.isTextAreaShow=!0,this.$refs[t].close()):(this.isTextAreaShow=!1,console.log(t),this.$refs[t].open())},confirmCateChoose:function(e){this.cateId=e.cateId,this.cateName=e.cateName},confirmMt:function(e){this.mtId=e.cateId,this.mtName=e.cateName},confirmPg:function(e){this.pgId=e.cateId,this.pgName=e.cateName},confirmRegionChoose:function(e){this.regionId=e.regionId,this.regionName=e.regionName},getChooseTeamVal:function(e){this.team=e.team},getImageUrl:function(e){this.imageList=e},getImageUrl2:function(e){this.imageList2=e,console.log(e)},getPublishTcpValue:function(e){this.isTcp=e.value,this.tcpStatus=e.status,this.isTextAreaShow=e.isTextAreaShow},bindTextArea:function(e){this.textAreaContent=e.detail.value},bindTextArea2:function(e){this.textAreaContent2=e.detail.value},formSubmit:function(t){var n=[{name:"title",checkType:"notnull",checkRule:"",errorMsg:"请输入标题"},{name:"cate_id",checkType:"notnull",checkRule:"",errorMsg:"请选择所属分类"},{name:"mt_id",checkType:"notnull",checkRule:"",errorMsg:"请选择所属材料"},{name:"pg_id",checkType:"notnull",checkRule:"",errorMsg:"请选择包装规格"},{name:"more-price",checkType:"notnull",checkRule:"",errorMsg:"输入价格"},{name:"more-company_name",checkType:"notnull",checkRule:"",errorMsg:"输入店名"},{name:"region_id",checkType:"notnull",checkRule:"",errorMsg:"请选择产地"},{name:"contact",checkType:"notnull",checkRule:"",errorMsg:"请输入联系人"},{name:"phone",checkType:"notnull",checkRule:"",errorMsg:"请输入联系电话"},{name:"phone",checkType:"reg",checkRule:"^[1][3-9]{1}[0-9]{9}$",errorMsg:"请正确输入联系电话"},{name:"content1",checkType:"notnull",checkRule:"",errorMsg:"请输入详情信息"},{name:"content2",checkType:"notnull",checkRule:"",errorMsg:"请输入订购说明"}];this.tcpStatus&&n.push({name:"is_tcp",checkType:"notnull",checkRule:"",errorMsg:"请认真阅读招老板平台发布协议"});var o=t.detail.value,c=v.check(o,n);if(c){var i={image1:o.img1Url};for(var r in delete o.img1Url,o)/\more-/.test(r)&&(i[r.replace("more-","")]=o[r],delete o[r]);o.more=i,o.id=this.detailData.id,e.showLoading({title:"发布中",mask:!0}),this.request.post(this.api.modifyMaterial,{data:o}).then((function(t){e.hideLoading(),e.showModal({title:"提示",content:t.msg,showCancel:!1,success:function(t){t.confirm&&e.redirectTo({url:"publish-cailiao-list"})}})})).catch((function(t){console.log(t),e.hideLoading(),e.showModal({title:"提示",content:"网络错误",showCancel:!1})}))}else this.func.msg(v.error)}}};t.default=k}).call(this,n("543d")["default"])}},[["1cff","common/runtime","common/vendor"]]]);