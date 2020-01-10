
// 封装api请求模块儿   和团队实战做法一样
import request from '../utils/request'

export const login = (data) => {
  return request({
    url: '/app/v1_0/authorizations',
    method: 'post',
    data
  })
}

export const getSmsCode = mobile => {
  return request({
    url: `/app/v1_0/sms/codes/${mobile}`,
    method: 'get'
  })
}

// 获取用户自己的信息
export const getUserInfo = () => {
  return request({
    url: '/app/v1_0/user',
    method: 'get'
  })
}
