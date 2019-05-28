import request from '@/utils/request'

export function fetchNewsList(query) {
  let { page,limit }=query;
  let params={ page,limit }
  console.log(query)
  return request({
    url: '/serve/trouble/list',
    method: 'post',
    params: params,
    data: query
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
export function deleteNews(data) {
  return request({
    url: '/serve/trouble/delete',
    method: 'post',
    data
  })
}
