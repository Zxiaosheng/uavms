import request from '@/utils/request'

export function fetchTasklist(query) {
  return request({
    url: '/task/list',
    method: 'get',
    params: query
  })
}
