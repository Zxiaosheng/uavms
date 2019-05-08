import Mock from 'mockjs'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    "id":"@increment",
    "date":"@date",
    "planType|1": [{id:'1',typeName:'救援无人机'},{id:'2',typeName:'测绘无人机'},{id:'3',typeName:'拍摄无人机'},{id:'4',typeName:'交通无人机'}],
    "troubleType|1": [{id:'1',typeName:'电机故障'},{id:'2',typeName:'电源故障'},{id:'3',typeName:'机翼故障'},{id:'4',typeName:'摄像头故障'},{id:'5',typeName:'底座故障'}],
    "troubleCount|1-100": 8,
    "troubleReason": "@cparagraph"
  }))
}

export default [
  {
    url: '/trouble/list',
    type: 'get',
    response: config => {
      // const {date, type, title, page = 1, limit = 20, sort } = config.query
      //
      // let mockList = List.filter(item => {
      //   if (date && item.date !== date) return false
      //   if (type && item.type !== type) return false
      //   if (title && item.title.indexOf(title) < 0) return false
      //   return true
      // })
      //
      // if (sort === '-id') {
      //   mockList = mockList.reverse()
      // }

      // const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

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
    url: '/trouble/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/trouble/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
]
