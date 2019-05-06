import request from '@/utils/request'
//导出新闻列表页的数据
export function userList(query) {
  return request({
    url: '/userList',
    method: 'get',
    params: query
  })
}
//导出新闻视图页的数据
export function userMap(query) {
  return request({
    url: '/userMap',
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
