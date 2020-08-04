(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/member/choose-region"],{

/***/ 472:
/*!*************************************************************!*\
  !*** D:/part-time/zhao/components/member/choose-region.vue ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _choose_region_vue_vue_type_template_id_0fbcdc20___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./choose-region.vue?vue&type=template&id=0fbcdc20& */ 473);
/* harmony import */ var _choose_region_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./choose-region.vue?vue&type=script&lang=js& */ 475);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _choose_region_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _choose_region_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 11);

var renderjs




/* normalize component */

var component = Object(_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _choose_region_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _choose_region_vue_vue_type_template_id_0fbcdc20___WEBPACK_IMPORTED_MODULE_0__["render"],
  _choose_region_vue_vue_type_template_id_0fbcdc20___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _choose_region_vue_vue_type_template_id_0fbcdc20___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "components/member/choose-region.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 473:
/*!********************************************************************************************!*\
  !*** D:/part-time/zhao/components/member/choose-region.vue?vue&type=template&id=0fbcdc20& ***!
  \********************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_choose_region_vue_vue_type_template_id_0fbcdc20___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./choose-region.vue?vue&type=template&id=0fbcdc20& */ 474);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_choose_region_vue_vue_type_template_id_0fbcdc20___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_choose_region_vue_vue_type_template_id_0fbcdc20___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_choose_region_vue_vue_type_template_id_0fbcdc20___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_choose_region_vue_vue_type_template_id_0fbcdc20___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 474:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/part-time/zhao/components/member/choose-region.vue?vue&type=template&id=0fbcdc20& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 475:
/*!**************************************************************************************!*\
  !*** D:/part-time/zhao/components/member/choose-region.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_choose_region_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./choose-region.vue?vue&type=script&lang=js& */ 476);
/* harmony import */ var _C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_choose_region_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_choose_region_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_choose_region_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_choose_region_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_86182_Downloads_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_choose_region_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 476:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/part-time/zhao/components/member/choose-region.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; //
//
//
//
//
//
//
//
//
//
//
//
var _default2 =
{
  data: function data() {
    return {
      regionArray: [],
      regionIndex: [0, 0],
      regionStatus: false,
      regionValue: '',
      province: [],
      city: [] };

  },
  name: 'choose-region',
  props: {
    defaultSelectedVal: {
      type: Object,
      default: function _default() {
        return { province_id: '', city_id: '' };
      } },

    title: {
      type: String,
      default: '选择地区' } },


  onReady: function onReady() {var _this2 = this;
    setTimeout(function () {
      _this2.requestRegion();
    }, 300);
  },
  created: function created() {

  },
  methods: {
    // 请求地区
    requestRegion: function requestRegion() {var _this3 = this;
      var storageName = 'allRegion';
      var _this = this;
      uni.getStorage({
        key: storageName,
        success: function success(res) {
          var region = res.data.all;
          disposeRegion(region);
        },
        fail: function fail(err) {
          _this3.request.post(_this3.api.getAllRegion, {
            data: {} }).
          then(function (res) {
            if (res.code) {
              uni.setStorage({
                key: storageName,
                data: res.data });

              disposeRegion(res.data.all);
            }
          }).catch(function (error) {
            console.log('Error:', error);
          });
        } });

      function disposeRegion(region) {
        var city = [];
        var province = [];
        var selected_val = _this.defaultSelectedVal;
        var c = [];
        for (var i = 0; i < region.length; i++) {
          for (var j = 0; j < region[i].child.length; j++) {
            var r1 = region[i].child[j];
            var r2 = region[i].child[j].child;
            province.push(r1);
            city.push(r2);
          }
        }
        if (selected_val.province_id != '') {
          for (var i = 0; i < province.length; i++) {
            if (selected_val.province_id == province[i].id) {
              c = province[i].child;
              _this.regionStatus = true;
              _this.regionIndex.splice(0, 1, i);
            }
          }
        }
        if (selected_val.city_id != '' && c.length >= 1) {
          for (var i = 0; i < c.length; i++) {
            if (selected_val.city_id == c[i].id) {
              _this.regionIndex.splice(1, 1, i);
            }
          }
        }
        _this.province = province;
        _this.city = city;
        _this.regionArray.push(province, c);
      }
    },
    regionConfirm: function regionConfirm(e) {//监听地区确定
      var value = e.detail.value;
      var regionValue = [];
      var province_id = this.regionArray[0][value[0]].id;
      var city_id = this.regionArray[1].length != 0 ? this.regionArray[1][value[1]].id : '';
      var province_name = this.regionArray[0][value[0]].name;
      var city_name = this.regionArray[1].length != 0 ? this.regionArray[1][value[1]].name : '';
      if (city_id == '') {
        regionValue.push(province_id);
      } else {
        regionValue.push(province_id, city_id);
      }
      this.regionStatus = true;
      this.regionIndex = value;
      this.regionValue = regionValue.join(',');
      this.$emit('confirm', { region_id: this.regionValue, region_name: province_name + city_name });
    },
    regionColumnChange: function regionColumnChange(e) {//监听地区滑动
      var value = e.detail.value;
      var column = e.detail.column;
      if (column == 0) {
        this.regionArray = [];
        this.regionArray.push(this.province, this.city[value]);
        this.regionIndex[1] = 0;
        this.regionIndex[0] = value;
      }
    } } };exports.default = _default2;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ })

}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/member/choose-region.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/member/choose-region-create-component',
    {
        'components/member/choose-region-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(472))
        })
    },
    [['components/member/choose-region-create-component']]
]);
