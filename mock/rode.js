import Mock from 'mockjs'

const List = []
const count = 50

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    "id|1":["1","2","3"],
    "date1":"@date",
    "date2":"@date",
    "start":"@city()",
    "end":"@city()",
    "task":"@ctitle(10,20)"
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
