
// 封装api请求模块儿   和团队实战做法一样
import request from '../utils/request'

export const login = (data) => {
  return request({
    url: '/app/v1_0/authorizations',
    method: 'post',
    data
  })
}
