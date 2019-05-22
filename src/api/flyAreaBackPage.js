import axios from '@/utils/request'

export function fetchflyAreaListBackPage(query) {
  return axios({
    // url: '/flyArea/list',
    url: 'http://localhost:8088/flyTask/selectFly',
    method: 'get',
    params: query
  })
}
