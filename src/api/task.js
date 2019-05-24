import request from '@/utils/request'

export function fetchTasklist(query) {
  return request({
    url:process.env.VUE_APP_BASE_API+ '/task/list',
    method: 'get',
    params: query
  })
}
export function updateTask(data) {
  return request({
    url: process.env.VUE_APP_BASE_API+'/task/update',
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
    url: '/task/count',
    method: 'get'
  })
}
