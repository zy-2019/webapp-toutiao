
// 封装文章接口模块儿

import request from '../utils/request'

export const getArticles = params => {
  return request({
    url: '/app/v1_1/articles',
    method: 'get',
    params
  })
}

// 根据id获取文章详情
export const getArticleById = articleId => {
  return request({
    url: `/app/v1_0/articles/${articleId}`,
    method: 'get'
  })
}

// 根据id收藏文章
export const addCollect = target => {
  return request({
    url: '/app/v1_0/article/collections',
    method: 'post',
    data: {
      target
    }
  })
}

// 根据id取消收藏文章

export const delCollect = target => {
  return request({
    url: `/app/v1_0/article/collections/${target}`,
    method: 'DELETE'
  })
}

// 点赞文章
export const addLikings = articleId => {
  return request({
    url: '/app/v1_0/article/likings',
    method: 'POST',
    data: {
      target: articleId
    }
  })
}

// 取消点赞
export const delLikings = target => {
  return request({
    url: `/app/v1_0/article/collections/${target}`,
    method: 'DELETE'
  })
}
