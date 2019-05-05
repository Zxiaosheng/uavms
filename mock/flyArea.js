import Mock from 'mockjs'
const List = []
const count = 50
for (let i = 0; i < count; i++) {
  List.push(Mock.mock(
    {
      "id":"@increment",
      "type|1":[{id:1,typeName:'大型机'},{id:2,typeName:'中型机'},{id:3,typeName:'小型机'}],
      "date":"@date",
      "task|1":[{id:1,taskName:'消防'},{id:2,taskName:'医疗'},{id:3,taskName:'交通'},{id:4,taskName:'物流'},{id:5,taskName:'巡警'},{id:6,taskName:'其他'}],
      "area|1":[{id:1,areaName:'福州'},{id:2,areaName:'宁德'},{id:3,areaName:'厦门'},{id:4,areaName:'莆田'},{id:5,areaName:'南平'},{id:6,areaName:'三明'},{id:7,areaName:'泉州'},{id:8,areaName:'漳州'},{id:9,areaName:'龙岩'}],
      "longitude":"@integer(100, 120)",
      "latitude":"@integer(20,30)"
    }
  ))
}
export default [
  {
    url: '/flyArea/list',
    type: 'get',
    response: () => {
      return {
        code: 20000,
        data: {
          total:List.length,
          items: List
        }
      }
    }
  },



]
