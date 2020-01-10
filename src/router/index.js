import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login/index' // 这里可以是按需加载
Vue.use(VueRouter)

// 配置路由表
const routes = [

  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    name: 'tab-bar',
    component: () => import ('../views/tab-bar') // 按需加载
  }
]

const router = new VueRouter({
  routes
})

export default router
