import Mock from 'mockjs'

const List = []
const count = 50

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    "id":"@increment",
    "date":"@date",
    "newsType|1":[{id:1,typeName:'时政新闻'},{id:2,typeName:'财经新闻'},{id:3,typeName:'时事热点'}],
    "title":"@ctitle",
    "content":"@cparagraph",
    "read":"@integer(20,300)"
  }))
}

export default [
  {
    url: '/rode/list',
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
    url: '/rode/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/rode/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
]
