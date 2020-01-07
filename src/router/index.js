import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login/index' // 这里是按需加载
Vue.use(VueRouter)

// 配置路由表
const routes = [

  {
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
