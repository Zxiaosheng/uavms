import Mock from 'mockjs'

const List = []
const List1 = []
const count = 5

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    "value|100-200":150,
    "name": '@cword(2)'+'故障',
  }))
  List1.push(Mock.mock({
    "r":Math.round(Math.random() * 1000),
    "m": (Math.random()*10 + 5).toFixed(1) - 0,
  }))
}

export default [
  {
    url: '/trouble/chartlist',
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
    url: '/trouble/mchartlist',
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
