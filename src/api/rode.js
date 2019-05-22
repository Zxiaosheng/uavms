import request from '@/utils/request'

//获取路线列表
export function fetchRodeList(query) {
  return request({
    url: theBaseUrl+'/route/list',
    content_type: 'application/json',
    data: query,
    method: 'post',
    params: query
  })
}
//获取所有任务类型
export function fetchTaskType(query) {
  return request({
    url: theBaseUrl+'/tasktype/getall',
    method: 'get',
    params: query
  })
}

//获取所有的地点
export function fetchLocation(query) {
  return request({
    url: 'http://localhost:8088/location/all',
    method: 'get',
    params: query
  })
}
//修改路线状态
export function setLocationStatus(query) {
  return request({
    url: theBaseUrl+'/route/setstaus',
    method: 'post',
    content_type: 'application/json',
    data: query,
    params: query
  })
}
//修改
export function updateNews(data) {
  return request({
    url: theBaseUrl+'/route/updatelist',
    method: 'post',
    data
  })
}
//新增
export function createNews(data) {
  return request({
    url: theBaseUrl+'/route/addlist',
    content_type: 'application/json',
    method: 'post',
    data
  })
}
