import request from '@/utils/request'

export function fetchTasklist(query) {
  let {limit,page}=query
  return request({
    // url: process.env.VUE_APP_BASE_API+'/taskdev/search',
    url: '/serve'+'/taskdev/search',
    method: 'post',
    params: {limit
    ,page},
    data:query
  })
}
export function fetchTaskTypelist() {
  return request({
    url: '/serve'+'/tasktype/getall',

    method: 'get',
  })
}
export function fetchDevicelist() {
  return request({
    url: '/serve'+'/taskdev/deviceall',
    method: 'get',
  })
}
export function taskDelete(query) {
  return request({
    url: '/serve'+'/taskdev/delete',
    method: 'get',
    params:query
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
    url:process.env.VUE_APP_BASE_API+ '/task/create',
    method: 'post',
    data
  })
}
export function getTaskCount(){
  return request({
    url: process.env.VUE_APP_BASE_API+'/task/count',
    method: 'get'
  })
}
