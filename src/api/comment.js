
// 获取文章评论接口的模块儿
import request from '../utils/request'

export const getComments = params => {
  return request({
    url: '/app/v1_0/comments',
    method: 'get',
    params
  })
}

// 对评论点赞或取消点赞
export const addCommentLike = target => {
  return request({
    url: '/app/v1_0/comment/likings',
    method: 'post',
    data: {
      target // 评论ID
    }
  })
}
// 取消点赞
export const delCommentLike = params => {
  return request({
    url: `/app/v1_0/comment/likings/${params}`,
    method: 'DELETE'
  })
}

// 添加评论或评论回复

export function addComment (data) {
  return request({
    method: 'POST',
    url: '/app/v1_0/comments',
    data
  })
}
