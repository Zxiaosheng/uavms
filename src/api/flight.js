import request from '@/utils/request'

export function fetchList(query) {
  return request({
    /*url: '/flight/list',
    method: 'get',
    params: query*/
    // url: '/serve/flyLine/line',
    url: '/serve/line/list',
    content_type: 'application/json',
    data: query,
    method: 'post',
    // params: query
  })
}

//获取所有任务类型
export function fetchTaskType(query) {
  return request({
    url: '/serve/tasktype/getall',
    method: 'get',
    params: query
  })
}

//获取所有的地点
export function fetchLocation(query) {
  return request({
    url: '/serve/location/all',
    method: 'get',
    params: query
  })
}

export function updateNews(data) {
  return request({
    // url: '/flight/update',
    url: '/serve/line/updatelist',
    content_type: 'application/json',
    method: 'post',
    data
  })
}
export function createNews(data) {
  return request({
    // url: '/flight/create',
    url: '/serve/line/addlist',
    content_type: 'application/json',
    method: 'post',
    data
  })
}
    /**
    * 根据id删除数据接口
    * @param query
  */
export function isdelete(query) {

      return request({
        url: '/serve/line/isdelete',
        method: 'get',
        params:query
      })
}

