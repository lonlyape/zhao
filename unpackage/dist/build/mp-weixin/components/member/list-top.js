(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/member/list-top"],{"37c7":function(n,e,t){"use strict";t.r(e);var o=t("947d"),u=t.n(o);for(var c in o)"default"!==c&&function(n){t.d(e,n,(function(){return o[n]}))}(c);e["default"]=u.a},"607f":function(n,e,t){},"947d":function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=function(){t.e("components/member/annotation/zhaogong").then(function(){return resolve(t("2f93"))}.bind(null,t)).catch(t.oe)},u=function(){t.e("components/member/annotation/zhaohuo").then(function(){return resolve(t("8508"))}.bind(null,t)).catch(t.oe)},c=function(){t.e("components/member/annotation/chengbao").then(function(){return resolve(t("0bcc"))}.bind(null,t)).catch(t.oe)},i=function(){t.e("components/member/annotation/gczh").then(function(){return resolve(t("a426"))}.bind(null,t)).catch(t.oe)},a=function(){t.e("components/member/annotation/gczp").then(function(){return resolve(t("4e65"))}.bind(null,t)).catch(t.oe)},r=function(){t.e("components/member/annotation/ershou").then(function(){return resolve(t("0c1b"))}.bind(null,t)).catch(t.oe)},l=function(){t.e("components/member/annotation/cailiao").then(function(){return resolve(t("e7be"))}.bind(null,t)).catch(t.oe)},s={data:function(){return{list:[{name:"已发布工程承包",type:"chengbao",url:"publish-chengbao-list",img:"published-zh"},{name:"已发布招工信息",type:"zhaogong",url:"publish-zhaogong-list",img:"published-zg"},{name:"已发布工人找活",type:"zhaohuo",url:"publish-zhaohuo-list",img:"published-zh"},{name:"已发布找厂工信息",type:"gczh",url:"publish-gczh-list",img:"published-ershou"},{name:"已发布工厂直聘",type:"gczp",url:"publish-gczp-list",img:"published-ershou"},{name:"已发布材料",type:"cailiao",url:"publish-cailiao-list",img:"published-ershou"}]}},name:"list-top",components:{zhaoGong:o,zhaoHuo:u,chengBao:c,gczh:i,gczp:a,erShou:r,cailiao:l},props:{defaultActive:{type:String,default:""}},computed:{title:function(){switch(this.defaultActive){case"chengbao":return"工程承包";case"zhaogong":return"招工信息";case"zhaohuo":return"工人找活";case"gczh":return"厂工信息";case"gczp":return"工厂直聘";case"ershou":return"二手交易";case"cailiao":return"材料"}},publishUrl:function(){switch(this.defaultActive){case"chengbao":return"publish-chengbao";case"zhaogong":return"publish-zhaogong";case"zhaohuo":return"publish-zhaohuo";case"gczh":return"publish-gczh";case"gczp":return"publish-gczp";case"ershou":return"publish-ershou";case"cailiao":return"publish-cailiao"}}},methods:{jump:function(e,t){"publish-cailiao"==e?n.showModal({title:"提示",content:"材料发布请联系官方",success:function(n){console.log(n)}}):t?n.navigateTo({url:e}):n.redirectTo({url:e})}}};e.default=s}).call(this,t("543d")["default"])},"98c7":function(n,e,t){"use strict";var o,u=function(){var n=this,e=n.$createElement;n._self._c},c=[];t.d(e,"b",(function(){return u})),t.d(e,"c",(function(){return c})),t.d(e,"a",(function(){return o}))},ba0e:function(n,e,t){"use strict";t.r(e);var o=t("98c7"),u=t("37c7");for(var c in u)"default"!==c&&function(n){t.d(e,n,(function(){return u[n]}))}(c);t("d571");var i,a=t("f0c5"),r=Object(a["a"])(u["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],i);e["default"]=r.exports},d571:function(n,e,t){"use strict";var o=t("607f"),u=t.n(o);u.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/member/list-top-create-component',
    {
        'components/member/list-top-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("ba0e"))
        })
    },
    [['components/member/list-top-create-component']]
]);
