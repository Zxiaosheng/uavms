import Mock from 'mockjs'

const List = [];
const count = 1000;

for(let i = 0; i < count; i++){
  List.push(Mock.mock({
    taskId:'@increment',
    taskName:'@ctitle(4,8)',
    taskDesc:'@csentence(5, 12)',
    "taskTypes|1":[{typeId:1,typeName:'消防任务'},{typeId:2,typeName:'医疗任务'},{typeId:3,typeName:'交通任务'},{typeId:4,typeName:'物流任务'},{typeId:5,typeName:'巡警任务'},{typeId:6,typeName:'其他任务'}],
    beforeTask:'@ctitle(4,8)',
    afterTask:'@ctitle(4,8)',
    parentTask:'@ctitle(4,8)',
    startTime:'@date',
    endTime:'@date',
    'taskUavs|1':['闪电F-28','科农A6-160','闪电F-35','猎鹰M6-84M6-84','天鹰M4-100','长空CK1B','长空CK1C','无侦5','ASN-12','WZ-2000','鲨鱼II'],
    'taskStatus|1': ['Finished', 'outTime', 'Cancel','Pause'],
    head:'@cname'
  }))
}

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
  }
]
