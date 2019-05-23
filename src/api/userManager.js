import request from '@/utils/request'
/**
 * 导出新闻列表页的数据,（模糊搜索）
 * @param query
 */
export function userList(query) {
  return request({
    url: theBaseUrl+'/user/select',
    method: 'get',
    data:query,
    params: query
  })
}
/**
 * 新增数据接口
 * @param query
 */
export function userAdd(query) {
  return request({
    url: theBaseUrl+'/user/add',
    method: 'get',
    data:query,
    params: query
  })
}

/**
 * 更新编辑接口
 * @param query
 */
export function userUpdate(query) {
  return request({
    url: theBaseUrl+'/user/update',
    method: 'get',
    data:query,
    params: query
  })
}
/**
 * 根据id删除数据接口
 * @param query
 */
export function userDel(query) {
  return request({
    url: theBaseUrl+'/user/del',
    method: 'get',
    data:query,
    params: query
  })
}






//导出用户视图页的数据
export function userMap(query) {
  return request({
    url: '/userMap',
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
