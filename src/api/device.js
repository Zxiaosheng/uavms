import request from '@/utils/request'

export function fetchList(query) {

  let { page,limit }=query;
  let params={ page,limit }
  return request({
    url: theBaseUrl+'/dev/list',
    method: 'post',
    data: query,
    params: params
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
