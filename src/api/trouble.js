import request from '@/utils/request'

export function fetchNewsList(query) {
  return request({
    url: '/trouble/list',
    method: 'get',
    params: query
  })
}
