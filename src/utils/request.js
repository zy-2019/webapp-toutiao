
// 封装axios请求模块

import axios from 'axios'
import jsonBig from 'json-bigint'

import store from '@/store'
import router from '../router'
// import router from '@/router'
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
request.interceptors.response.use(function (response) {
  return response
},
async function (err) {
  if (err.response && err.response.status === 401) {
    // 如果没有refrsh直接跳转登录页
    const user = store.state.user
    if (!user || user.refresh_token) {
      redirectLogin()
      return
    }

    // 如果有refresh_token则请求更新token
    try {
      const { data } = await axios({
        method: 'PUT',
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      // 刷新token成功，则把token更新到容器中
      console.log('刷新 token  成功', data)
      store.commit('setUser', {
        token: data.data.token, // 最新获取的可用 token
        ...user // 还是原来的refresh_token
      })
      // 把之前失败的用户请求继续发出去
      // config 是一个对象，其中包含本次失败请求相关的那些配置信息，例如 url、method 都有
      // return 把 request 的请求结果继续返回给发请求的具体位置
      request(err.config)
    } catch (err) {
      // 如果获取失败，直接跳转 登录页
      console.log('请求刷新 token 失败', err)
      // router.push('/login')
      redirectLogin()
    }
  }
  return Promise.reject(err)
})

function redirectLogin () {
  // router.currentRoute 当前路由对象，和你在组件中访问的 this.$route 是同一个东西
  // query 参数的数据格式就是：?key=value&key=value
  router.push('/login?redirect=' + router.currentRoute.fullPath)
}
// 导出
export default request
