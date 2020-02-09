import Vue from 'vue'
import Vuex from 'vuex'

import { getItem, setItem } from '../utils/storage'

import decodeJwt from 'jwt-decode'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 登录用户,是一个对象,包含 token 信息
    // user: JSON.parse(window.localStorage.getItem('user'))
    user: getItem('user'),
    cachePages: ['TabBar']
  },
  mutations: {
    setUser (state, data) {
      // 解析JWT中的数据 需要使用用户ID
      if (data && data.token) {
        // 解析data.token
        data.id = decodeJwt(data.token).user_id
      }
      state.user = data
      // 为了防止刷新数据丢失，要把数据放到本地存储持久化
      // window.localStorage.setItem('user', JSON.stringify(state.user))
      setItem('user', state.user)
    },
    // 添加缓存页面
    addCaChePage (state, name) {
      if (!state.cachePages.includes(name)) {
        state.cachePages.push(name)
      }
    },
    // 删除缓存页面
    removeCaChePage (state, name) {
      const index = state.cachePages.indexOf(name) // 通过indexof找到该元素
      if (index !== -1) {
        // 这里就是存在 所以要删除的
        state.cachePages.splice(index)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
