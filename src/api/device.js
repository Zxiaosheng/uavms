import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/get/device/list',
    method: 'get',
    params: query
  })
}

export function createDev(data) {
  return request({
    url: '/device/add',
    method: 'post',
    data
  })
}

export function uploadFile(data) {
  return request({
    url: '/upload/dev/file',
    method: 'post',
    data
  })
}
