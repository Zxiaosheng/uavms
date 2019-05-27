import request from '@/utils/request'

export function fetchNewsList(query) {
  let { page,limit }=query;
  let params={ page,limit }
  return request({
    url: '/serve/trouble/list',
    method: 'get',
    params: params
  })
}
export function updateNews(data) {
  return request({
    url: '/serve/trouble/update',
    method: 'post',
    data
  })
}
export function createNews(data) {
  return request({
    url: '/serve/trouble/create',
    method: 'post',
    data
  })
}
