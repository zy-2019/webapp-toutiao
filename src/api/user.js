
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

// 获取用户频道列表
export const getUserChannels = () => {
  return request({
    url: '/app/v1_0/user/channels',
    method: 'get'
  })
}

// 关注用户
export const addFollowing = userId => {
  return request({
    url: '/app/v1_0/user/followings',
    method: 'post',
    data: {
      target: userId
    }
  })
}

// 取消关注
export const delFollowing = userId => {
  return request({
    url: `/app/v1_0/user/followings/${userId}`,
    method: 'DELETE'
  })
}

// 编辑用户资料---获取用户信息
export const UpdateUserInfo = target => {
  return request({
    url: `/app/v1_0/user/profile`,
    method: 'GET',
    target
  })
}

// 编辑用户资料--修改用户昵称
export const PutNickName = data => {
  return request({
    url: `/app/v1_0/user/profile`,
    method: 'PATCH',
    data
  })
}

// 编辑用户资料--修改用户头像
export const PutUserPhoto = data => {
  return request({
    url: `/app/v1_0/user/photo`,
    method: 'PATCH',
    data
  })
}

// 我的收藏

export const MyCollect = params => {
  return request({
    url: `/app/v1_0/article/collections`,
    method: 'GET',
    params
  })
}
// 我的历史

export const MyHistory = params => {
  return request({
    url: `/app/v1_0/user/histories`,
    method: 'GET',
    params
  })
}

// 我的作品
export const MyArticles = params => {
  return request({
    url: `/app/v1_0/user/articles`,
    method: 'GET',
    params
  })
}
