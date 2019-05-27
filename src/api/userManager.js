import request from '@/utils/request'

/**
 * 导出新闻列表页的数据,（模糊搜索）
 * @param query
 */
export function userList(query) {
  return request({
    url: '/serve/user/select',
    method: 'get',
    data: query,
    params: query
  })
}

/**
 * 新增数据接口
 * @param query
 */
export function userAdd(query) {
  return request({
    url: '/serve/user/add',
    method: 'POST',
    data: query,
    params: query
  })
}

/**
 * 更新编辑接口
 * @param query
 */
export function userUpdate(query) {
  return request({
    url: '/serve/user/update',
    method: 'post',
    data: query,
    params: query
  })
}

/**
 * 根据id删除数据接口
 * @param query
 */
export function userDel(query) {
  return request({
    url: '/serve/user/del',
    method: 'get',
    data: query,
    params: query
  })
}

/**
 * 是否删除的状态
 * @param query
 */
export function isDel(query) {
  return request({
    url: '/serve/user/delStatu',
    method: 'post',
    data: query,
    params: query
  })
}

/**
 * 数据编辑后的接口
 * @param query
 */
export function getNewData(query) {
  return request({
    url: '/serve/user/newData',
    method: 'get',
    data: query,
    params: query
  })
}

/**
 * 获取每月对应的增加人员总数
 * @param query
 */
export function getArray(query) {
  return request({
    url: '/serve/user/getArray',
    method: 'get',
    data: query,
    params: query
  })
}

/**
 * 获取省份及对应人数
 * @param query
 */
export function getProvince(query) {
  return request({
    url: '/serve/user/province',
    method: 'get',
    data: query,
    params: query
  })
}
//导出用户视图页的数据
export function userMap(query) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/userMap',
    method: 'get',
    params: query
  })
}

export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}
