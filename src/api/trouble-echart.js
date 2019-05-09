import request from '@/utils/request'

export function fetchChartList() {
  return request({
    url: '/trouble/chartlist',
    method: 'get',
    // params: query
  })
}
export function fetchMChartList(query) {
  return request({
    url: '/trouble/mchartlist',
    method: 'get',
    params: query
  })
}

