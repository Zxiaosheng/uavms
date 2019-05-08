import Mock from 'mockjs'

const List = []
const count = 60

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    "id":'@increment',
    "date":"@date",
    "location":"@city()",
    "typeId|1": [{id:'1',typeName:'消防型'},{id:'2',typeName:'物流型'},{id:'3',typeName:'医疗型'},{id:'4',typeName:'天眼型'},{id:'5',typeName:'交通型'},{id:'6',typeName:'其它型'}],
    // "result|1":[{id:'1',typeName:'Success'},{id:'2',typeName:'Failure'},{id:'3',typeName:'Success'},{id:'4',typeName:'Success'},{id:'5',typeName:'Success'},{id:'6',typeName:'Success'},{id:'7',typeName:'Success'},{id:'8',typeName:'Success'},{id:'9',typeName:'Success'},{id:'10',typeName:'Success'}],
    "result|1":[{id:'1',typeName:'完成'},{id:'2',typeName:'超时'},{id:'3',typeName:'取消'}],
    "boolean|1-20":false,

  }))
}


export default [
  {
    url: '/history-count/l',
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
    url: '/history-count/u',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/history-count/c',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

]
