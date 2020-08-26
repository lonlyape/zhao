import Vue from 'vue'
import App from './App'
import func from '@/common/func.js'
import api from '@/common/api.js'
import request from '@/common/extend/request.js'
import store from './store'

import '@/common/filter.js'

// http://laoban.zomsky.com/
// const api_url = 'http://laoban.zomsky.com';
// const api_url = 'http://www.zhaobossshop.net';
const api_url = 'https://www.zhaobossshop.net';
// const api_url = 'http://attractboss.io:88';
// 全局配置
request.setConfig({
  baseUrl: api_url,
  dataType: 'json', // 可删除，默认为json
  responseType: 'text', // 可删除，默认为text
  header:{'Device':'wxapp'}
})

Vue.config.productionTip = false
// 挂载到全局vue实例上
Vue.prototype.func = func;
Vue.prototype.api = api;
Vue.prototype.api_url = api_url;
Vue.prototype.request = request;
Vue.prototype.$store = store;

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()