import request from '@/utils/request'

export function fetchhistoryList(query) {

  console.log("console.log(query)=====:")
  console.log(query)

  let{page, limit} = query;
  let params = {page, limit};
  return request({
    // url: '/history-count/l',
    url:'http://127.0.0.1:8088/task/list',
    method: 'post',
    params: query,
    data: query
  })
}

export function updatehistory(data) {
  return request({
    url: '/history-count/u',
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

