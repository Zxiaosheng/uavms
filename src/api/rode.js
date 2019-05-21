import request from '@/utils/request'

//获取路线列表
export function fetchRodeList(query) {
  return request({
    url: 'http://localhost:8088/route/list',
    content_type: 'application/json',
    data: query,
    method: 'post',
    params: query
  })
}
//获取所有路线类型
export function fetchTaskType(query) {
  return request({
    url: 'http://localhost:8088/tasktype/getall',
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
