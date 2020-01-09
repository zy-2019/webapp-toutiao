import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible' // 使用 amfe-flexible 动态设置 REM 基准值（html 标签的字体大小）
import './utils/register-vant'

import './styles/index.less'

import './utils/validation.js'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
