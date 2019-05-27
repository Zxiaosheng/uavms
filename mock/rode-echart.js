import Mock from 'mockjs'

const List = []
const count = 5

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    "value|300-400":350,
    "name": '@cword(2)'+'区',
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
  }

]
