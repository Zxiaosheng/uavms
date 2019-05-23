import axios from '@/utils/request'

export function fetchflyAreaListBackPage(query) {
  return axios({
    // url: '/flyArea/list',
    url: 'http://localhost:8088/flyTask/selectFly',
    data:query,
    content_type:'application/json',
    method: 'post',
    params: query
  })
}
//获取所有的地点
export function fetchLocation(query) {
  return axios({
    url: 'http://localhost:8088/location/all',
    method: 'get',
    params: query,

  })
}
