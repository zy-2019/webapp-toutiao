
import request from '../utils/request'

export const ChannelListAll = () => {
  return request({
    url: '/app/v1_0/channels',
    method: 'get'
  })
}
