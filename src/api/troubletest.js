import request from '@/utils/request'

export function fetchNewsList(query) {
  return request({
    url: '/trouble/test',
    method: 'get',
    params: query
  })
}
