
// 搜索接口模块

import request from '../utils/request'

// 联想建议
export const getSuggestion = q => {
  return request({
    url: '/app/v1_0/suggestion',
    method: 'get',
    params: {
      q
    }
  })
}

// 搜索结果

export const getSearchResult = params => {
  return request({
    url: '/app/v1_0/search',
    method: 'get',
    params
  })
}

// 搜索历史记录
export const getSearchHistories = () => {
  return request({
    url: '/app/v1_0/search/histories',
    method: 'get'
  })
}
