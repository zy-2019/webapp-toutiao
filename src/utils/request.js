
// 封装axios请求模块

import axios from 'axios'
import jsonBig from 'json-bigint'

import store from '@/store'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径
})

// transformResponse 是axios专门提供的api  支持用户来决定如何转换后端返回的数据
request.defaults.transformResponse = [function (data) {
  try {
    return jsonBig.parse(data)
  } catch (err) {
    return {}
  }
}]

// 请求拦截器   拿到token放进去
request.interceptors.request.use(function (config) {
  // 统一设置token
  const { user } = store.state
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
export default request
