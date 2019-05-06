import Mock from 'mockjs'

let Random = Mock.Random

// 模拟任务列表数据
const List = [];
const count = 40;
for (let i = 0;i < count; i++){
  List.push(Mock.mock({
    taskId:'@increment',
    taskName:'@ctitle(4,8)',
    taskDesc:'@csentence(5, 12)',
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


// 模拟日期维度执行报告失败数据
let execReportSucc = []
for(let i = 0; i < 31; i++){
  execReportSucc.push(Random.integer(19,52))
}
console.log(execReportSucc)

// 模拟日期维度执行报告成功数据
let execReportFail = []
for(let i = 0; i < 31; i++){
  execReportFail.push(Random.integer(0,31))
}

// 领域数据量
const fieldCount = [];

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
  },
  //任务报告成功数据
  {
    url: '/task/report/success/count',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: execReportSucc
      }
    }
  },
  //任务报告失败数据
  {
    url: '/task/report/fail/count',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: execReportFail
      }
    }
  },
]
