import request from '@/utils/request'

export function fetchNewsList(query) {
  return request({
    url: '/trouble/list',
    method: 'get',
    params: query
  })
}
export function updateNews(data) {
  return request({
    url: '/trouble/update',
    method: 'post',
    data
  })
}
export function createNews(data) {
  return request({
    url: '/trouble/create',
    method: 'post',
    data
  })
}
