(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/member/upload-image"],{"3e7a":function(e,t,i){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=i("2f62"),s=i("5e56");function n(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,a)}return i}function o(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?n(Object(i),!0).forEach((function(t){c(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):n(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}function c(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}var r={data:function(){return{imageList:[],successList:[]}},name:"upload-image",props:{length:{type:Number,default:4},tips:{type:String,default:""},type:{type:String,default:""},image:{type:Array,default:function(){return[]}},dataId:{type:String,default:""},title:{type:String,default:"上传图片"},more_file_name:{type:String,default:""},imageStr:{type:String,default:""}},computed:o({},(0,a.mapState)(["hasLogin","userInfo"])),onReady:function(){var e=this;setTimeout((function(){if(""!=e.dataId)if(e.image.length)e.imageList=e.imageList.concat(e.image),e.successList=e.successList.concat(e.image);else if(e.imageStr){var t=e.imageStr.split(",");e.imageList=e.imageList.concat(t),e.successList=e.successList.concat(t)}}),200)},created:function(){},methods:{ChooseImage:function(){var t=this,i=this;e.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["camera","album"],success:function(a){e.showLoading({title:"上传中",mask:!0}),(0,s.pathToBase64)(a.tempFilePaths[0]).then((function(s){if(""!=i.dataId){var n="ershou"==i.type?i.api.modifyUsedImage:i.api.modifyWorkImage;"yingye"==i.type&&(n=i.api.modifyWorkImage2);var o="ershou"==i.type?"used":"work",c={base64ImgStr:s,data_id:i.dataId,type:o,user_id:i.userInfo.uid};t.more_file_name&&(c.more_file_name=t.more_file_name),i.request.post(n,{data:c}).then((function(t){e.hideLoading(),t.code?(e.showToast({title:t.msg}),i.successList.push(t.data),0!=i.imageList.length?i.imageList=i.imageList.concat(a.tempFilePaths):i.imageList=a.tempFilePaths,i.$emit("getImageUrl",i.successList)):e.showModal({title:"提示",content:t.msg,showCancel:!1})}))}else i.request.post(i.api.base64ToImg,{data:{base64ImgStr:s}}).then((function(t){e.hideLoading(),t.code?(i.successList.push(t.data),0!=i.imageList.length?i.imageList=i.imageList.concat(a.tempFilePaths):i.imageList=a.tempFilePaths,i.$emit("getImageUrl",i.successList)):e.showModal({title:"提示",content:t.msg,showCancel:!1})})).catch((function(t){console.log(t),e.hideLoading(),e.showModal({title:"提示",content:"网络错误",showCancel:!1})}))})).catch((function(t){console.log(t),e.showModal({title:"提示",content:t,showCancel:!1})}))}})},ViewImage:function(t){e.previewImage({urls:this.imageList,current:t.currentTarget.dataset.url})},DelImg:function(t){var i=this;e.showModal({title:"提示",content:"确定要删除此图片吗？",success:function(a){if(a.confirm)if(""!=i.dataId){var s="ershou"==i.type?i.api.deleteUsedImage:i.api.deleteWorkImage,n=i.successList[t],o=i.dataId,c=i.userInfo.uid,r="ershou"==i.type?"used":"work",u={file_path:n,data_id:o,type:r,user_id:c};i.more_file_name&&(u.more_file_name=i.more_file_name),i.request.post(s,{data:u}).then((function(a){a.code?(i.imageList.splice(t,1),i.successList.splice(t,1),e.showToast({title:a.msg})):e.showModal({title:"提示",content:a.msg,showCancel:!1})}))}else i.imageList.splice(t,1),i.successList.splice(t,1),i.$emit("getImageUrl",i.successList)}})}}};t.default=r}).call(this,i("543d")["default"])},4147:function(e,t,i){"use strict";var a,s=function(){var e=this,t=e.$createElement;e._self._c},n=[];i.d(t,"b",(function(){return s})),i.d(t,"c",(function(){return n})),i.d(t,"a",(function(){return a}))},"4e0d":function(e,t,i){"use strict";i.r(t);var a=i("4147"),s=i("8c36");for(var n in s)"default"!==n&&function(e){i.d(t,e,(function(){return s[e]}))}(n);i("f66f");var o,c=i("f0c5"),r=Object(c["a"])(s["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],o);t["default"]=r.exports},"5f2e":function(e,t,i){},"8c36":function(e,t,i){"use strict";i.r(t);var a=i("3e7a"),s=i.n(a);for(var n in a)"default"!==n&&function(e){i.d(t,e,(function(){return a[e]}))}(n);t["default"]=s.a},f66f:function(e,t,i){"use strict";var a=i("5f2e"),s=i.n(a);s.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/member/upload-image-create-component',
    {
        'components/member/upload-image-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("4e0d"))
        })
    },
    [['components/member/upload-image-create-component']]
]);
