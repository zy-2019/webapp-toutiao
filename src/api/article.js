
// 封装文章接口模块儿

import request from '../utils/request'

export const getArticles = params => {
  return request({
    url: '/app/v1_1/articles',
    method: 'get',
    params
  })
}
