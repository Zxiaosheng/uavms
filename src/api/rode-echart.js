import request from '@/utils/request'

/**
 *饼图数据
 * @param query
 */
export function fetchChartList(query) {
  return request({
    url: '/serve/route/chart',
    method: 'get',
    params: query
  })
}

// export function fetchChartList(query) {
//   return request({
//     url: '/rode/chartlist',
//     method: 'get',
//     params: query
//   })
// }

/**
 * 折线图飞行路线总数(折线图柱形图预计飞行路线总数)
 */
export function fetchChartLine1(query) {
  return request({
    url: '/serve/route/chartline1',
    method: 'get',
    params: query
  })
}

/**
 * 折线图飞行机器总数
 */
export function fetchChartLine2(query) {
  return request({
    url: '/serve/route/chartline2',
    method: 'get',
    params: query
  })
}

/**
 * 折线图柱形图预计飞行路线总数
 */
export function fetchChartLineBar1(query) {
  return request({
    url: '/serve/route/chartlinebar1',
    method: 'get',
    params: query
  })
}

/**
 * 折线图柱形图实际飞行路线总数
 */
export function fetchChartLineBar2(query) {
  return request({
    url: '/serve/route/chartlinebar2',
    method: 'get',
    params: query
  })
}
