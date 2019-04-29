import request from '@/utils/request'

export function fetchNewsList(query) {
  return request({
    url: '/rode/list',
    method: 'get',
    params: query
  })
}
export function updateNews(data) {
  return request({
    url: '/rode/update',
    method: 'post',
    data
  })
}
export function createNews(data) {
  return request({
    url: '/rode/create',
    method: 'post',
    data
  })
}
