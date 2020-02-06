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
    component: () => import ('../views/tab-bar'), // 按需加载
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import('../views/home')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('../views/qa')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('../views/video')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('../views/my')
      }

    ]
  },

  {
    path: '/search',
    component: () => import('@/views/search') // 按需加载
  },

  {
    path: '/detail/:articleId',
    name: 'article',
    component: () => import('@/views/detail'), // 按需加载
    props: true
  },

  {
    path: '/user',
    component: () => import ('../views/user')
  },
  // 我的收藏/历史/作品路由
  {
    path: '/my-article/:type?', // ？是第二段路径可有可无
    component: () => import ('../views/user-articles'),
    props: true
  }

  // {
  //   path: '/my-article/collect',
  //   component: () => import ('../views/user-articles')
  // },
  // {
  //   path: '/my-article/history',
  //   component: () => import ('../views/user-articles')
  // }

]

const router = new VueRouter({
  routes
})

export default router
