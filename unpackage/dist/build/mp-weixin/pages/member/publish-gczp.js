(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/member/publish-gczp"],{"24e3":function(e,n,i){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var t=i("2f62");function a(e,n){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),i.push.apply(i,t)}return i}function u(e){for(var n=1;n<arguments.length;n++){var i=null!=arguments[n]?arguments[n]:{};n%2?a(Object(i),!0).forEach((function(n){o(e,n,i[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):a(Object(i)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(i,n))}))}return e}function o(e,n,i){return n in e?Object.defineProperty(e,n,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[n]=i,e}var l=function(){i.e("components/member/annotation/gczp").then(function(){return resolve(i("9ad7"))}.bind(null,i)).catch(i.oe)},c=function(){i.e("components/uni-popup/uni-popup").then(function(){return resolve(i("7c73"))}.bind(null,i)).catch(i.oe)},r=function(){i.e("components/member/choose-region").then(function(){return resolve(i("773d"))}.bind(null,i)).catch(i.oe)},s=function(){i.e("components/member/publish-tcp").then(function(){return resolve(i("15bc"))}.bind(null,i)).catch(i.oe)},h=i("7d61"),g={data:function(){return{region_id:"",team_value:"",xinzileixing:[{name:"面议",value:0},{name:"月/元",value:1},{name:"日/元",value:2}],xinzi_placeholder:"格式，例：3000-5000",xinzileixing_value:1,xinzi_value:"",gczpRestsData:{},xueliyaoqiu_status:!1,xueliyaoqiu_index:0,xueliyaoqiu_value:"",gongzuonianxian_status:!1,gongzuonianxian_index:0,gongzuonianxian_value:"",gongzuoleixing_value:[],zhiweifuli_value:[],imageList:[],isTcp:"",tcpStatus:1,isTextAreaShow:!0,textAreaContent:""}},computed:u({},(0,t.mapState)(["hasLogin","userInfo"])),components:{gczp:l,uniPopup:c,chooseRegion:r,publishTcp:s},onLoad:function(){var n=this,i="gczpRestsData",t=this;function a(e){if(e.welfare){var n=e.welfare.filter((function(e){return e.length>2})),i=e.welfare.filter((function(e){return e.length<=2}));n.splice(2,0,i[0]),n.splice(5,0,i[1]),e.welfare=n}}e.getStorage({key:i,success:function(e){t.gczpRestsData=e.data,a(t.gczpRestsData)},fail:function(u){n.request.get(n.api.getGczpRestsData,{data:{}}).then((function(n){t.gczpRestsData=n.data,a(t.gczpRestsData),e.setStorage({key:i,data:n.data})}))}})},methods:{togglePopup:function(e,n){"object"==typeof e?(this.isTextAreaShow=!0,this.$refs[e.ref].close()):(this.isTextAreaShow=!1,this.$refs[n].open())},bindTeamInput:function(e){this.team_value=e.detail.value},bindTeamChange:function(e){e.detail.value.length?this.team_value="0":this.team_value=""},bindXinzileixingChange:function(e){this.xinzi_value="","0"==e.detail.value?(this.xinzileixing_value="0",this.xinzi_placeholder=""):"1"==e.detail.value?(this.xinzileixing_value="1",this.xinzi_placeholder="格式，例：3000-5000"):"2"==e.detail.value&&(this.xinzileixing_value="2",this.xinzi_placeholder="请输入薪资")},bindXinziInput:function(e){this.xinzi_value=e.detail.value},bindEducationChange:function(e){this.xueliyaoqiu_status=!0,this.xueliyaoqiu_index=e.detail.value,this.xueliyaoqiu_value=this.gczpRestsData.education[e.detail.value]},bindTermChange:function(e){this.gongzuonianxian_status=!0,this.gongzuonianxian_index=e.detail.value,this.gongzuonianxian_value=this.gczpRestsData.term[e.detail.value]},bindGongzuoleixingChange:function(e){this.gongzuoleixing_value=e.detail.value},bindZhiweifuliChange:function(e){this.zhiweifuli_value=e.detail.value},getChooseRegionVal:function(e){this.region_id=e.region_id},getImageUrl:function(e){this.imageList=e},getPublishTcpValue:function(e){this.isTcp=e.value,this.tcpStatus=e.status,this.isTextAreaShow=e.isTextAreaShow},bindTextArea:function(e){this.textAreaContent=e.detail.value},formSubmit:function(n){var i=n.detail.value,t=[{name:"title",checkType:"notnull",checkRule:"",errorMsg:"请输入标题"},{name:"team",checkType:"notnull",checkRule:"",errorMsg:"请输入招聘人数"},{name:"xueliyaoqiu",checkType:"notnull",checkRule:"",errorMsg:"请选择学历要求"},{name:"gongzuonianxian",checkType:"notnull",checkRule:"",errorMsg:"请选择工作年限"},{name:"contact",checkType:"notnull",checkRule:"",errorMsg:"请输入联系人"},{name:"phone",checkType:"notnull",checkRule:"",errorMsg:"请输入联系电话"},{name:"phone",checkType:"reg",checkRule:"^[1][3-9]{1}[0-9]{9}$",errorMsg:"请正确输入联系电话"},{name:"region_id",checkType:"notnull",checkRule:"",errorMsg:"请选择工作地址"},{name:"details_address",checkType:"notnull",checkRule:"",errorMsg:"请输入详细地址"},{name:"content",checkType:"notnull",checkRule:"",errorMsg:"请输入详情"}];"0"!=i.xinzileixing&&t.push({name:"xinzi",checkType:"notnull",checkRule:"",errorMsg:"请输入薪资"}),this.tcpStatus&&t.push({name:"is_tcp",checkType:"notnull",checkRule:"",errorMsg:"请认真阅读招老板平台发布协议"});var a=h.check(i,t);a?(i.more={xinzi:i.xinzi,xinzileixing:i.xinzileixing,xueliyaoqiu:i.xueliyaoqiu,gongzuonianxian:i.gongzuonianxian,gongzuoleixing:i.gongzuoleixing?i.gongzuoleixing.split(","):[],zhiweifuli:i.zhiweifuli?i.zhiweifuli.split(","):[],details_address:i.details_address},delete i.xinzi,delete i.xinzileixing,delete i.xueliyaoqiu,delete i.gongzuonianxian,delete i.gongzuoleixing,delete i.zhiweifuli,delete i.details_address,e.showLoading({title:"发布中",mask:!0}),this.request.post(this.api.publishGczp,{data:i}).then((function(n){e.hideLoading(),e.showModal({title:"提示",content:n.msg,showCancel:!1,success:function(n){n.confirm&&e.redirectTo({url:"publish-gczp-list"})}})})).catch((function(n){console.log(n),e.hideLoading(),e.showModal({title:"提示",content:"网络错误",showCancel:!1})}))):this.func.msg(h.error)}}};n.default=g}).call(this,i("543d")["default"])},"88b9":function(e,n,i){"use strict";i.r(n);var t=i("24e3"),a=i.n(t);for(var u in t)"default"!==u&&function(e){i.d(n,e,(function(){return t[e]}))}(u);n["default"]=a.a},b0d4:function(e,n,i){"use strict";i.r(n);var t=i("c65a"),a=i("88b9");for(var u in a)"default"!==u&&function(e){i.d(n,e,(function(){return a[e]}))}(u);var o,l=i("f0c5"),c=Object(l["a"])(a["default"],t["b"],t["c"],!1,null,null,null,!1,t["a"],o);n["default"]=c.exports},c523:function(e,n,i){"use strict";(function(e){i("e6e1");t(i("66fd"));var n=t(i("b0d4"));function t(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,i("543d")["createPage"])},c65a:function(e,n,i){"use strict";var t,a=function(){var e=this,n=e.$createElement;e._self._c},u=[];i.d(n,"b",(function(){return a})),i.d(n,"c",(function(){return u})),i.d(n,"a",(function(){return t}))}},[["c523","common/runtime","common/vendor"]]]);