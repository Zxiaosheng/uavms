import request from '@/utils/request'

export function fetchChartList() {
  return request({
    url: '/rode/chartlist',
    method: 'get',
    // params: query
  })
}
export function fetchMChartList(query) {
  return request({
    url: '/rode/mchartlist',
    method: 'get',
    params: query
  })
}
