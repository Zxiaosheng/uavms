import Mock from 'mockjs'

// 任务列表
const List = [];
// 任务列表记录数
const count = 40;
// 执行报告数据
const execReport = [];
// 执行报告数据量
const reportCount = 20

// 模拟器
let simulator = (list,count,template)=>{
  for (let i = 0;i < count; i++){
    list.push(Mock.mock(template))
  }
}

// 模拟任务列表数据
simulator(List,count,{
  taskId:'@increment',
  taskName:'@ctitle(4,8)',
  taskDesc:'@csentence(5, 12)',
  "taskTypes|1":[{typeId:1,typeName:'消防任务'},{typeId:2,typeName:'医疗任务'},{typeId:3,typeName:'交通任务'},{typeId:4,typeName:'物流任务'},{typeId:5,typeName:'巡警任务'},{typeId:6,typeName:'其他任务'}],
  startTime:'@datetime("yyyy-MM-dd HH:mm")',
  endTime:'@datetime("yyyy-MM-dd HH:mm")',
  'taskUavs|1':['闪电F-28','科农A6-160','闪电F-35','猎鹰M6-84M6-84','天鹰M4-100','长空CK1B','长空CK1C','无侦5','ASN-12','WZ-2000','鲨鱼II'],
  'taskStatus|1': ['Finished','Wait','Normal','OutTime','Pause'],
  head:'@cname'
})

// 模拟日期维度执行报告数据
simulator(execReport,reportCount,{
  date:'',
  successCnt:'',
  failCnt:''
})

export default [
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
]
