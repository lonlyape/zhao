(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/work/details"],{"000f":function(t,e,n){"use strict";var i=n("7c42"),r=n.n(i);r.a},"1ba6":function(t,e,n){"use strict";n.r(e);var i=n("248a"),r=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,(function(){return i[t]}))}(s);e["default"]=r.a},"248a":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=s(n("4795")),r=n("2f62");function s(t){return t&&t.__esModule?t:{default:t}}function u(t,e,n,i,r,s,u){try{var a=t[s](u),o=a.value}catch(l){return void n(l)}a.done?e(o):Promise.resolve(o).then(i,r)}function a(t){return function(){var e=this,n=arguments;return new Promise((function(i,r){var s=t.apply(e,n);function a(t){u(s,i,r,a,o,"next",t)}function o(t){u(s,i,r,a,o,"throw",t)}a(void 0)}))}}function o(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function l(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?o(Object(n),!0).forEach((function(e){c(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function c(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var h=function(){n.e("components/detail").then(function(){return resolve(n("6e42"))}.bind(null,n)).catch(n.oe)},f={components:{detail:h},data:function(){return{datas:null,work_id:""}},computed:l({},(0,r.mapState)(["hasLogin","userInfo","isBindAccount"]),{title:function(){if(this.datas)return this.datas.title||"title"},type:function(){var t=this.datas;return t?t.type:""},user:function(){var t=this.datas,e=t?t.user:{};return l({},e,{phone:t&&t.phone,contact:t&&t.contact})},detailList:function(){var t=[],e="",n=this.datas;switch(this.type){case 3:e="发包工程详情";break;case 1:e="招工信息详情";break;case 5:e="工厂招聘详情";break;case 2:e="工人找活详情";break;case 4:e="找工人详情";break;default:e="详情"}return n&&n.content&&t.push({title:e,content:n.content}),n&&n.image&&t.push({title:"图片",img:n.image}),t},cellList:function(){var t=[],e=[],n=this.datas,i=n&&n.more||{};switch(this.type){case 1:if(n.region&&e.push(this.setCell("招工地区",n.region)),i.xinzi_text&&e.push(this.setCell("薪资",i.xinzi_text+i.xinzileixing_text)),5!=n.type&&n.work_cate){var r="所需工种",s="",u=n.work_cate;for(var a in u)a&&u[a]?s+=s?","+a+u[a]:a+u[a]:s+=s?","+a||!1:a||u[a];e.push(this.setCell(r,s))}e.length&&(t.push(e),e=[]),n.publish_time&&e.push(this.setCell("发布时间",n.publish_time)),t.push(e);break;case 2:if(n&&n.region&&e.push(this.setCell("可去地区",n.region)),5!=n.type&&n.work_cate){var o="专业工种",l="",c=n.work_cate;for(var h in c)h&&c[h]?l+=l?","+h+c[h]:h+c[h]:l+=l?","+h||!1:h||c[h];e.push(this.setCell(o,l))}if(e.length&&(t.push(e),e=[]),n.publish_time&&e.push(this.setCell("发布时间",n.publish_time)),n.team_text&&5!=n.type){var f=3==n.type?"所需人员构成":"人员构成";e.push(this.setCell(f,n.team_text))}t.push(e);break;case 5:i.xinzi_text&&e.push(this.setCell("薪资",i.xinzi_text+i.xinzileixing_text)),n.region&&e.push(this.setCell("工作地址",n.region)),i.zhiweifuli_text&&e.push(this.setCell("职位福利",i.zhiweifuli_text)),i.xueliyaoqiu&&e.push(this.setCell("学历要求",i.xueliyaoqiu)),i.gongzuonianxian&&e.push(this.setCell("工作经验",i.gongzuonianxian)),n.team_text&&e.push(this.setCell("招聘人数",n.team_text)),i.gongzuoleixing_text&&e.push(this.setCell("工作类型",i.gongzuoleixing_text)),n.publish_time&&e.push(this.setCell("发布时间",n.publish_time)),t.push(e);break;default:if(n.region&&e.push(this.setCell("地区",n.region)),i.cenggongzuodanwei&&e.push(this.setCell("曾工作单位",i.cenggongzuodanwei)),n.zhiweifuli_text&&e.push(this.setCell("职位福利",n.zhiweifuli_text)),n.publish_time&&e.push(this.setCell("发布时间",n.publish_time)),i.bidding_type&&e.push(this.setCell("发包类型",i.bidding_type)),n.team_text&&5!=n.type){var p=3==n.type?"所需人员构成":"人员构成";e.push(this.setCell(p,n.team_text))}if(3==n.type&&(i.contract_manner_text&&e.push(this.setCell("承包方式",i.contract_manner_text)),i.project_cost&&e.push(this.setCell("预计工程造价",i.project_cost+" w"))),5!=n.type&&n.work_cate){var d="",g="";1==n.type&&(d="所需工种"),3==n.type&&(d="工程类别"),2==n.type&&(d="专业工种");var _=n.work_cate;for(var b in _)b&&_[b]?g+=g?","+b+_[b]:b+_[b]:g+=g?","+b||!1:b||_[b];4==n.type&&(d="厂工工种",g=n.more.gongchanggongzhong),e.push(this.setCell(d,g))}t.push(e)}return t}}),onLoad:function(t){this.work_id=t.work_id,this.loadData(t)},methods:{setCell:function(t,e){return{label:t,value:e}},loadData:function(e){var n=this;return a(i.default.mark((function r(){var s;return i.default.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return t.showLoading({title:"数据加载中"}),s={work_id:e?e.work_id:n.work_id},void 0!=n.userInfo.uid&&(s.user_id=n.userInfo.uid),i.next=5,n.request.get(n.api.getWorkDetails,{data:s}).then((function(t){t.code&&(n.datas=t.data)})).catch((function(t){console.log("Error:",t)}));case 5:t.hideLoading();case 6:case"end":return i.stop()}}),r)})))()}}};e.default=f}).call(this,n("543d")["default"])},6910:function(t,e,n){"use strict";(function(t){n("c74e");i(n("66fd"));var e=i(n("f04a"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"75bb":function(t,e,n){"use strict";var i,r=function(){var t=this,e=t.$createElement;t._self._c},s=[];n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return s})),n.d(e,"a",(function(){return i}))},"7c42":function(t,e,n){},f04a:function(t,e,n){"use strict";n.r(e);var i=n("75bb"),r=n("1ba6");for(var s in r)"default"!==s&&function(t){n.d(e,t,(function(){return r[t]}))}(s);n("000f");var u,a=n("f0c5"),o=Object(a["a"])(r["default"],i["b"],i["c"],!1,null,"9d632e70",null,!1,i["a"],u);e["default"]=o.exports}},[["6910","common/runtime","common/vendor"]]]);