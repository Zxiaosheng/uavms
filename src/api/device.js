import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/get/device/list',
    method: 'get',
    params: query
  })
}
