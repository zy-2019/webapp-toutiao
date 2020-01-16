
// 获取文章评论接口的模块儿
import request from '../utils/request'

export const getComments = params => {
  return request({
    url: '/app/v1_0/comments',
    method: 'get',
    params
  })
}
