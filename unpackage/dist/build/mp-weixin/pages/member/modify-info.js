(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/member/modify-info"],{"02dc":function(e,n,t){"use strict";t.r(n);var o=t("429f"),i=t("2ba9");for(var s in i)"default"!==s&&function(e){t.d(n,e,(function(){return i[e]}))}(s);t("7c21");var c,u=t("f0c5"),r=Object(u["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],c);n["default"]=r.exports},"217e":function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=t("2f62");function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){c(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var u=function(){t.e("components/uni-popup/uni-popup").then(function(){return resolve(t("48c4"))}.bind(null,t)).catch(t.oe)},r={data:function(){return{config:{},user_id:"",getCodeText:"获取验证码",inputAccount:"",lock:!1}},computed:s({},(0,o.mapState)(["hasLogin","userInfo"])),components:{uniPopup:u},onReady:function(){this.config=this.request.getConfig(),this.user_id=this.userInfo.uid},methods:s({},(0,o.mapMutations)(["login"]),{uploadImg:function(){var n=this,t=this.config.baseUrl+this.api.modifyInfo;n.userInfo.account?e.chooseImage({success:function(o){var i=o.tempFilePaths;e.showLoading({title:"上传中",mask:!0}),e.uploadFile({url:t,filePath:i[0],name:"head_img",formData:{user_id:n.user_id},success:function(t){var o=JSON.parse(t.data);o.code?(e.hideLoading(),e.showToast({title:"上传成功"}),n.userInfo.head_img=o.data.head_img,n.login(n.userInfo)):(e.hideLoading(),e.showModal({title:"提示",content:o.msg,showCancel:!1}))},fail:function(n){e.hideLoading(),e.showModal({title:"提示",content:n,showCancel:!1})}})}}):this.func.msg("请先绑定手机号码")},popupFormSubmit:function(n){var t=n.detail.value,o=t.type,i=this;switch(t.user_id=i.user_id,t.open_id=i.userInfo.open_id,o){case"modify-name":if(""==t.new_name)return void this.func.msg("请输入姓名");if(t.new_name===i.userInfo.name)return void i.togglePopup("close",o);break;case"modify-corp_name":if(""==t.corp_name)return void this.func.msg("请输入公司名称");if(t.corp_name===i.userInfo.corp_name)return void i.togglePopup("close",o);break;case"modify-account":if(""==t.new_account)return void this.func.msg("请输入手机号码");if(t.new_account===i.userInfo.account)return void i.togglePopup("close",o);var s=/^[1][3-9]{1}[0-9]{9}$/;if(!s.test(t.new_account))return void this.func.msg("请正确输入手机号码");if(""==t.code)return void this.func.msg("请输入验证码");if(""==t.new_password)return void this.func.msg("请输入密码");if(void 0!=t.new_password&&t.new_password.length<6)return void this.func.msg("密码不能少于6位数");i.userInfo.account?t.is_bind="false":t.is_bind="true";break;case"modify-password":if(""==t.old_password)return void this.func.msg("请输入旧密码");if(""==t.new_password)return void this.func.msg("请输入新密码");if(t.new_password.length<6)return void this.func.msg("新密码不能少于6位数");if(""==t.con_password)return void this.func.msg("请输入确认密码");if(t.new_password!=t.con_password)return void this.func.msg("两次输入的密码不一致");break}e.showLoading({title:"修改中",mask:!0}),this.request.post(this.api.modifyInfo,{data:t}).then((function(n){if(e.hideLoading(),n.code){switch(e.showToast({title:"修改成功"}),o){case"modify-name":i.userInfo.name=n.data.name;break;case"modify-corp_name":i.userInfo.corp_name=n.data.corp_name;break;case"modify-account":i.userInfo.account=n.data.account,i.userInfo.phone=n.data.phone,i.userInfo.uid=n.data.uid;break}i.login(i.userInfo),i.togglePopup("close",o),e.redirectTo({url:"modify-info"})}else e.showModal({title:"提示",content:n.msg,showCancel:!1})})).catch((function(n){e.hideLoading(),console.log(n)}))},togglePopup:function(e,n){"modify-account"==n||this.userInfo.account?"close"==e?this.$refs[n].close():this.$refs[n].open():this.func.msg("请先绑定手机号码")},monitorAccount:function(e){this.inputAccount=e.detail.value},sendSms:function(){var n,t=60,o=this,i="171185997";if(this.userInfo.account&&(i="171185774"),!o.lock){if(""==this.inputAccount)return void this.func.msg("请输入手机号码");if(this.inputAccount===this.userInfo.account)return void this.func.msg("请不要输入相同的手机号码");var s=/^[1][3,4,5,7,8][0-9]{9}$/;if(!s.test(this.inputAccount))return void this.func.msg("请正确输入手机号码");o.lock=!0,e.showLoading({title:"获取验证码中",mask:!0}),n=setInterval((function(){t<=1?(o.lock=!1,t=60,o.getCodeText="获取验证码",clearInterval(n)):(--t,o.getCodeText=t+"秒后重试")}),1e3),this.request.post(this.api.sendSms,{data:{phone:this.inputAccount,templateCode:i}}).then((function(n){n.code?e.showToast({title:"发送成功"}):e.showModal({title:"提示",content:n.msg,showCancel:!1})})).catch((function(e){console.log(e)})),e.hideLoading()}}})};n.default=r}).call(this,t("543d")["default"])},"2ba9":function(e,n,t){"use strict";t.r(n);var o=t("217e"),i=t.n(o);for(var s in o)"default"!==s&&function(e){t.d(n,e,(function(){return o[e]}))}(s);n["default"]=i.a},3139:function(e,n,t){"use strict";(function(e){t("cc73");o(t("66fd"));var n=o(t("02dc"));function o(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("543d")["createPage"])},"429f":function(e,n,t){"use strict";var o={uniPopup:function(){return t.e("components/uni-popup/uni-popup").then(t.bind(null,"48c4"))}},i=function(){var e=this,n=e.$createElement;e._self._c},s=[];t.d(n,"b",(function(){return i})),t.d(n,"c",(function(){return s})),t.d(n,"a",(function(){return o}))},"7c21":function(e,n,t){"use strict";var o=t("8e48"),i=t.n(o);i.a},"8e48":function(e,n,t){}},[["3139","common/runtime","common/vendor"]]]);