import request from '@/utils/request'

export function fetchhistoryList(query) {

  // console.log(query)
  let{page, limit} = query;
  let params = {page, limit};
  // console.log(params)
  return request({
    // url: '/history-count/l',
    url:'/serve/task/list',
    method: 'post',
    params: query,//传到地址栏上，==后端RequestParam
    data: query//传到body里，==后端RequestBody
  })
}

export function isdeletehistory(data) {

  return request({
    url: '/serve/task/isdelete',
    method: 'get',
    params:data
  })
}

export function taskechart() {
  return request({
    url: '/serve/task/echart',
    method: 'get',
  })
}
export function taskcount(query) {
  return request({
    url: '/serve/task/count',
    method: 'get',
    params: query
  })
}
export function updatedata(data) {
  return request({
    url: '/serve/task/update',
    content_type: 'application/json',
    method: 'post',
    data
  })
}
export function createhistory(data) {
  return request({
    url: '/history-count/c',
    method: 'post',
    data
  })
}

