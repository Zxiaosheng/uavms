import Mock from 'mockjs'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    "value|300-400":"@increment",
    "name|1": [{name:'仓山区'},{name:'晋安区'},{name:'鼓楼区'},{name:'台江区'},{name:'马尾区'}],
  }))

}

export default [
  {
    url: '/rode/chartlist',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: {
          total: List.length,
          items: List
        }
      }
    }
  },
  {
    url: '/rode/mchartlist',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: {
          total: List1.length,
          items: List1
        }
      }
    }
  },
]
