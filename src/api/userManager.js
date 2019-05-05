import request from '@/utils/request'

export function userList(query) {
  return request({
    url: '/userList',
    method: 'get',
    params: query
  })
}

export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}
