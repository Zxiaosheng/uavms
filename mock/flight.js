import Mock from 'mockjs'

const List = []
const count = 50

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    "id":"@increment",
    "date1":"@date",
    "date2":"@date",
    "start":"@city()",
    "end":"@city()",
    "typeId|1": [{id:'1',typeName:'救援型'},{id:'2',typeName:'测绘型'},{id:'3',typeName:'拍摄型'},{id:'4',typeName:'交通型'}],

  }))
}

export default [
  {
    url: '/flight/list',
    type: 'get',
    response: () => {
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
    url: '/flight/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/flight/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
]
