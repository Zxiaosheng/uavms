import axios from '@/utils/request'

export function fetchflyAreaList(query) {
  return axios({
    url: '/flyArea/list',
    method: 'get',
    params: query
  })
}
