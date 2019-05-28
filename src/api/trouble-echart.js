import request from '@/utils/request'

export function fetchChartList() {
  console.log("===============")
  return request({
    url: '/dev-api/trouble/chartlist',
    method: 'get'
    // params: query
  })
}
export function fetchMChartList(query) {
  return request({
    url: '/dev-api/trouble/mchartlist',
    method: 'get',
    params: query
  })
}
export function fetchthirdChartList(query) {
  return request({
    url: '/dev-api/trouble/thirdchartlist',
    method: 'get',
    params: query
  })
}
