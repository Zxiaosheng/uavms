import request from '@/utils/request'

export function fetchTasklist(query) {
  return request({
    url: '/task/list',
    method: 'get',
    params: query
  })
}
export function updateTask(data) {
  return request({
    url: '/task/update',
    method: 'post',
    data
  })
}
export function createTask(data) {
  return request({
    url: '/task/create',
    method: 'post',
    data
  })
}
export function getTaskCount(){
  return request({
    url:'/task/count',
    method: 'get'
  })
}
export function getReportSuccCount(){
  return request({
    url:'/task/report/success/count',
    method:'get'
  })
}
export function getReportFailCount(){
  return request({
    url:'/task/report/fail/count',
    method:'get'
  })
}
