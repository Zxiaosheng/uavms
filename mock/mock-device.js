import Mock from 'mockjs'

const List = []
const count = 10

const image_uri = 'http://file03.16sucai.com/2016/10/1100/16sucai_p20161012101_387.JPG'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    'type|1': ['微型', '小型', '中型', '大型'],
    'status|1': ['飞行中', '待命中', '充电中', '故障中', '维修中' , '离线中', '电量低'],
    num: +Mock.Random.date('T'),
    name: '@cword(2,5)无人机',
    desc: '@cword(300,400)',
    'powerMax|200-400': 300,
    'capacity|1000-4000': 3000,
    'flyMileage|2000-4000': 3000,
    windRes: {
      name: '抗风能力',
      value: '@float(0, 0, 1,2)'
    },
    waterRes: {
      name: '抗水能力',
      value: '@float(0, 0, 1,2)'
    },
    hitRes: {
      name: '放撞击性',
      value: '@float(0, 0, 1,2)'
    },
    flexibility: {
      name: '灵活性',
      value: '@float(0, 0, 1,2)'
    },
    emcRes: {
      name: '抗电磁波干扰能力',
      value: '@float(0, 0, 1,2)'
    },
    createTime: '@datetime',  //出厂日期
    imgUrl: image_uri,
    wingLoss: {
      name: '机翼',
      value: '@float(0, 0, 1,2)'
    },
    powerLoss: {
      name: '电池',
      value: '@float(0, 0, 1,2)'
    },
    cameraLoss: {
      name: '摄像头',
      value: '@float(0, 0, 1,2)'
    },
    packLoss: {
      name: '机舱',
      value: '@float(0, 0, 1,2)'
    },
    engineLoss: {
      name: '引擎',
      value: '@float(0, 0, 1,2)'
    }
  }))
}


export default [
  {
    url: '/get/device/list',
    type: 'get',
    response: config => {

      return {
        code: 20000,
        msg: '处理成功',
        data: {
          total: List.length,
          items: List
        }
      }

      // const {importance, type, title, page = 1, limit = 20, sort} = config.query
      //
      // let mockList = List.filter(item => {
      //   if (importance && item.importance !== +importance) return false
      //   if (type && item.type !== type) return false
      //   if (title && item.title.indexOf(title) < 0) return false
      //   return true
      // })
      //
      // if (sort === '-id') {
      //   mockList = mockList.reverse()
      // }
      //
      // const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      //
      // return {
      //   code: 20000,
      //   data: {
      //     total: mockList.length,
      //     items: pageList
      //   }
      // }
    }
  }
]
