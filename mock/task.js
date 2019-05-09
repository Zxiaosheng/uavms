import Mock from 'mockjs'

// 模拟任务列表数据
const List = [];
const count = 40;
for (let i = 0;i < count; i++){
  List.push(Mock.mock({
    taskId:'@increment',
    taskName:'@ctitle(4,8)',
    taskDesc:'@csentence(5, 12)',
    "rodes|1":[
      {rodeId:1,rodeName:'福州线'},
      {rodeId:2,rodeName:'厦门线'},
      {rodeId:3,rodeName:'漳州线'},
      {rodeId:4,rodeName:'泉州线'},
      {rodeId:5,rodeName:'龙岩线'},
      {rodeId:6,rodeName:'南平线'},
      {rodeId:7,rodeName:'莆田线'},
      {rodeId:8,rodeName:'三明线'},
      {rodeId:9,rodeName:'平潭线'},
      {rodeId:10,rodeName:'福清线'},
      {rodeId:10,rodeName:'宁德线'}
    ],
    "taskTypes|1":[
      {typeId:1,typeName:'消防任务'},
      {typeId:2,typeName:'医疗任务'},
      {typeId:3,typeName:'交通任务'},
      {typeId:4,typeName:'物流任务'},
      {typeId:5,typeName:'巡警任务'},
      {typeId:6,typeName:'其他任务'}
    ],
    startTime:'@datetime("yyyy-MM-dd HH:mm")',
    endTime:'@datetime("yyyy-MM-dd HH:mm")',
    'taskUavs|1':['闪电F-28','科农A6-160','闪电F-35','猎鹰M6-84M6-84','天鹰M4-100',
      '长空CK1B','长空CK1C','无侦5','ASN-12','WZ-2000','鲨鱼II'],
    'taskStatus|1': ['Finished','Wait','Normal','OutTime','Pause'],
    head:'@cname'
  }))
}

export default [
  //任务列表
  {
    url: '/task/list',
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
