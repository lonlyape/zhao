(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/filtrate-top-new"],{"69cf":function(e,t,a){"use strict";a.r(t);var i=a("6ff6"),o=a.n(i);for(var n in i)"default"!==n&&function(e){a.d(t,e,(function(){return i[e]}))}(n);t["default"]=o.a},"6ff6":function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={data:function(){return{region:[],team:[],cate:[],isShowShade:!1,isShowRegion:!1,isShowCate:!1,isShowTeam:!1,region_pid:"",cate_pid:"",regionName:"全国",cateName:"工程专业",teamName:"",changeTeamName:""}},name:"filtrate-top",computed:{},props:{type:{type:String,default:""},isRequireTeam:{type:Boolean,default:!1},isRequireCate:{type:Boolean,default:!0},isClearChooseParam:{type:Boolean,default:!1}},watch:{isShowRegion:function(t){var a=this;if(t){var i="allRegion";e.getStorage({key:i,success:function(e){var t=e.data.all;a.region=t},fail:function(t){a.request.post(a.api.getAllRegion,{data:{}}).then((function(t){t.code&&(e.setStorage({key:i,data:t.data}),a.region=t.data.all)})).catch((function(e){console.log("Error:",e)}))}})}},isShowCate:function(e){e&&this.requestCate()},isShowTeam:function(t){var a=this,i=this;if(t){var o=function(e){switch(i.type){case"chengbao":i.team=e.chengbao;break;case"zhaohuo":i.team=e.zhaohuo;break;case"gczp":i.team=e.gczp;break}},n="staffComposition";e.getStorage({key:n,success:function(e){o(e.data)},fail:function(t){a.request.get(a.api.getStaffComposition,{data:{}}).then((function(t){e.setStorage({key:n,data:t.data}),o(t.data)}))}})}},isClearChooseParam:function(t){t&&(e.removeStorage({key:"filterParam"}),this.filterParam())},type:{handler:function(e){this.teamName=this.defaultTeamName(),this.close()},immediate:!0}},methods:{requestCate:function(){var t=this,a=this;if("chengbao"===this.type){var i="allContractCate";e.getStorage({key:i,success:function(e){a.cate=e.data},fail:function(o){t.request.get(t.api.getAllContractCate,{data:{}}).then((function(t){e.setStorage({key:i,data:t.data}),a.cate=t.data}))}})}else if("ershou"==this.type){var o="allUsedCate";e.getStorage({key:o,success:function(e){a.cate=e.data},fail:function(i){t.request.get(t.api.getAllUsedCate,{data:{}}).then((function(t){e.setStorage({key:o,data:t.data}),a.cate=t.data}))}})}else{var n="allWorkCate";e.getStorage({key:n,success:function(e){a.cate=e.data},fail:function(i){t.request.get(t.api.getAllWorkCate,{data:{}}).then((function(t){e.setStorage({key:n,data:t.data}),a.cate=t.data}))}})}},clickShow:function(e){switch(e){case 1:this.isShowRegion?(this.isShowRegion=!1,this.isShowShade=!1):(this.isShowRegion=!0,this.isShowShade=!0),this.isShowCate=!1,this.isShowTeam=!1;break;case 2:this.isShowCate?(this.isShowCate=!1,this.isShowShade=!1):(this.isShowCate=!0,this.isShowShade=!0),this.isShowRegion=!1,this.isShowTeam=!1;break;case 3:this.isShowTeam?(this.isShowTeam=!1,this.isShowShade=!1):(this.isShowTeam=!0,this.isShowShade=!0),this.isShowRegion=!1,this.isShowCate=!1;break}},close:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";this.isShowRegion=!1,this.isShowCate=!1,this.isShowTeam=!1,this.isShowShade=!1,void 0!=e.type&&"region"==e.type&&0==e.ischild?this.region_pid="":void 0!=e.type&&"cate"==e.type&&0==e.ischild&&(this.cate_pid="")},toggleShowChild:function(e,t){"region"==t?this.region_pid=e:"cate"==t&&(this.cate_pid=e)},filterParam:function(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",n="filterParam",s=e.getStorageSync(n),c=e.getStorageSync("positionRegion");"All"==a?a="":"object"==typeof a?a=a:void 0!=s.region?a=s.region:c.id&&void 0!=c.id&&(a=c),"All"==i?i="":"object"==typeof i?i=i:void 0!=s.region&&(i=s.cate),"All"==o?o="":"object"==typeof o?o=o:void 0!=s.team&&(o=s.team),this.cl(a,i,o),e.setStorage({key:n,data:{region:a,cate:i,team:o}}),this.$emit("filterParam",{region_id:void 0!=a.id?a.id:"",cate_id:void 0!=i.id?i.id:"",team_id:void 0!=o.id?o.id:""}),this.close(t)},cl:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";this.regionName=void 0!=e.name?e.name:"全国",this.cateName=void 0!=t.name?t.name:"工程专业",this.teamName=void 0!=a.name?a.name:this.defaultTeamName(),""==a&&(this.changeTeamName=this.defaultTeamName())},defaultTeamName:function(){switch(this.type){case"chengbao":return"班组/单位";case"gczp":return"班组/单位";case"zhaohuo":return"建筑工人/厂工";case"zhaogong":return"建筑工人/厂工"}}}};t.default=a}).call(this,a("543d")["default"])},"7d15":function(e,t,a){"use strict";a.r(t);var i=a("f8f0"),o=a("69cf");for(var n in o)"default"!==n&&function(e){a.d(t,e,(function(){return o[e]}))}(n);a("a1a2");var s,c=a("f0c5"),h=Object(c["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],s);t["default"]=h.exports},a1a2:function(e,t,a){"use strict";var i=a("b15e"),o=a.n(i);o.a},b15e:function(e,t,a){},f8f0:function(e,t,a){"use strict";var i,o=function(){var e=this,t=e.$createElement;e._self._c},n=[];a.d(t,"b",(function(){return o})),a.d(t,"c",(function(){return n})),a.d(t,"a",(function(){return i}))}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/filtrate-top-new-create-component',
    {
        'components/filtrate-top-new-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("7d15"))
        })
    },
    [['components/filtrate-top-new-create-component']]
]);
