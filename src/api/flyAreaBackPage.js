import axios from '@/utils/request'

export function fetchflyAreaListBackPage(query) {
  return axios({
    // url: '/flyArea/list',
    url: '/serve/flyTask/selectFly',
    data:query,
    content_type:'application/json',
    method: 'post',
    params: query
  })
}
//获取所有的地点
export function fetchLocation(query) {
  return axios({
    url: '/serve/location/all',
    method: 'get',
    params: query,

  })
}
//获取所有任务类型
export function fetchTaskType(query) {
  return axios({
    url: '/serve/tasktype/getall',
    method: 'get',
    params: query
  })
}
//新增
export function createFly(data) {
  return axios({
    url: '/serve/flyTask/newFly',
    content_type: 'application/json',
    method: 'post',
    data
  })
}
//编辑
export function updateFly(data) {
  return axios({
    url: '/serve/flyTask/edtFly',
    content_type: 'application/json',
    method: 'post',
    data
  })
}
//删除
export function deletFly(query) {
  return axios({
    url: '/serve/flyTask/updateIsDelete',
    method: 'get',
    params: query,
  })
}
//统计飞行次数
export function flyCount(taskId) {
  return axios({
    url: '/serve/flyTask/flyCount/'+taskId,
    method: 'get',
    params: taskId,
  })
}
export function getProvince(){
  return axios({
    url :'/serve/flyTask/province',
    method:'get',
  })
}
export function getCity(id){
  return axios({
    url :'/serve/flyTask/city/'+id,
    method:'get',
    param:id
  })
}
export function getGrid(id){
  return axios({
    url :'/serve/flyTask/grid/'+id,
    method:'get',
    param:id
  })
}
export function getLocation(id){
  return axios({
    url :'/serve/flyTask/location/'+id,
    method:'get',
    param:id
  })
}
