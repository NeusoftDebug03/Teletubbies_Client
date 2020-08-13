import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import './plugins/element.js'
import './assets/css/global.css'

// 导入NProgress 包对应的js和css
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import axios from 'axios'
// axios.defaults.baseURL = 'http://47.101.58.129:8282/api/'
axios.defaults.baseURL = 'http://127.0.0.1:8282/api/'
// 在request 拦截器中，展示进度条 NProgress.start()
axios.interceptors.request.use(config => {
  NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 必须返回config
  return config
})
// 在response 拦截器中，隐藏进度条 NProgress.done()
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})
Vue.prototype.$http = axios
Vue.config.productionTip = false

// 全局时间格式过滤器
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
