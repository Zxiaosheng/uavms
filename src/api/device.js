import request from '@/utils/request'

export function fetchList(query) {

  let { page,limit }=query;
  let params={ page,limit }
  return request({
    url: '/serve/dev/list',
    method: 'post',
    data: query,
    params: params
  })
}

export function editDev(data) {
  return request({
    url: '/serve/dev/edit',
    method: 'post',
    data
  })
}

export function editStatus(data) {
  return request({
    url: '/serve/dev/edit/status',
    method: 'get',
    params: data
  })
}

export function createDev(data) {
  return request({
    url: '/serve/dev/add',
    method: 'post',
    data
  })
}

export function uploadFile(data) {
  return request({
    url: '/serve/dev/file/import',
    method: 'post',
    headers: {
      contentType: 'multipart/form-data'
    },
    data
  })
}
