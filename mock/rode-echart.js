import Mock from 'mockjs'

const List = []
const count = 5

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    "value|300-400":350,
    "name|1": ['仓山区','晋安区','鼓楼区','台江区','马尾区'],
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
