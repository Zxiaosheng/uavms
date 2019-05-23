import request from '@/utils/request'

export function fetchChartList() {
  return request({
    url: process.env.VUE_APP_BASE_API+'/rode/chartlist',
    method: 'get',
    // params: query
  })
}
export function fetchMChartList(query) {
  return request({
    url: process.env.VUE_APP_BASE_API+'/rode/mchartlist',
    method: 'get',
    params: query
  })
}
