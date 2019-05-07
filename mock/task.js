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
      {rodeId:1,rodeName:'河北线'},
      {rodeId:2,rodeName:'山西线'},
      {rodeId:3,rodeName:'辽宁线'},
      {rodeId:4,rodeName:'吉林线'},
      {rodeId:5,rodeName:'黑龙线'},
      {rodeId:6,rodeName:'江苏线'},
      {rodeId:7,rodeName:'浙江线'},
      {rodeId:8,rodeName:'安徽线'},
      {rodeId:9,rodeName:'福建线'},
      {rodeId:10,rodeName:'江西线'},
      {rodeId:11,rodeName:'山东线'},
      {rodeId:12,rodeName:'河南线'},
      {rodeId:13,rodeName:'湖北线'},
      {rodeId:14,rodeName:'湖南线'},
      {rodeId:15,rodeName:'广东线'},
      {rodeId:16,rodeName:'海南线'},
      {rodeId:17,rodeName:'四川线'},
      {rodeId:18,rodeName:'贵州线'},
      {rodeId:19,rodeName:'云南线'},
      {rodeId:20,rodeName:'陕西线'},
      {rodeId:21,rodeName:'甘肃线'},
      {rodeId:22,rodeName:'青海线'},
      {rodeId:23,rodeName:'北京线'},
      {rodeId:24,rodeName:'上海线'},
      {rodeId:25,rodeName:'重庆线'},
      {rodeId:26,rodeName:'天津线'},
      {rodeId:27,rodeName:'广西线'},
      {rodeId:28,rodeName:'宁夏线'},
      {rodeId:29,rodeName:'新疆线'},
      {rodeId:30,rodeName:'内蒙古线'}
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
