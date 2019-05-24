import Mock from 'mockjs'

// 模拟任务列表数据
const List = [];
const count = 999;
for (let i = 0;i < count; i++){
  List.push(Mock.mock({
    id:'@increment',
    taskName:'@ctitle(4,8)',
    taskDesc:'@csentence(5, 12)',
    "rodes|1":[
      {id:1,routeName:'福州线'},
      {id:2,routeName:'厦门线'},
      {id:3,routeName:'漳州线'},
      {id:4,routeName:'泉州线'},
      {id:5,routeName:'龙岩线'},
      {id:6,routeName:'南平线'},
      {id:7,routeName:'莆田线'},
      {id:8,routeName:'三明线'},
      {id:9,routeName:'平潭线'},
      {id:10,routeName:'福清线'},
      {id:11,routeName:'宁德线'}
    ],
    "taskTypes|1":[
      {id:1,typeName:'消防任务'},
      {id:2,typeName:'医疗任务'},
      {id:3,typeName:'交通任务'},
      {id:4,typeName:'物流任务'},
      {id:5,typeName:'巡警任务'},
      {id:6,typeName:'其他任务'}
    ],
    taskStartTime:'@datetime("yyyy-MM-dd HH:mm:ss")',
    taskEndTime:'@datetime("yyyy-MM-dd HH:mm:ss")',
    'device|1':['闪电F-28','科农A6-160','闪电F-35','猎鹰M6-84M6-84','天鹰M4-100',
      '长空CK1B','长空CK1C','无侦5','ASN-12','WZ-2000','鲨鱼II'],
    'taskStatus|1': ['c','a','b','e','d'],
    taskHeader:'@cname'
  }))
}

export default [
  //任务列表
  {
    url: '/taskdev/search',
    type: 'post',
    response: () => {
      return {
        code: 20000,
        data: {
          data: {
            total: List.length,
            list: List

          }
        }
    }
  }
  },
  //任务列表修改
  {
    url: '/task/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  //任务添加
  {
    url: '/task/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  //总任务量
  {
    url: '/task/count',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          count:List.length
        }
      }
    }
  }
]
