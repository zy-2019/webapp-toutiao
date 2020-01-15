
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
