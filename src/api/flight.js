import request from '@/utils/request'

export function fetchList(query) {
  return request({
    /*url: '/flight/list',
    method: 'get',
    params: query*/
    url: '/serve/route/list',
    content_type: 'application/json',
    data: query,
    method: 'post',
    params: query
  })
}
export function updateNews(data) {
  return request({
    url: '/flight/update',
    method: 'post',
    data
  })
}
export function createNews(data) {
  return request({
    url: '/flight/create',
    method: 'post',
    data
  })
}
