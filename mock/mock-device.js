import Mock from 'mockjs'

const List = []
let count = 100

const image_uri = 'http://file03.16sucai.com/2016/10/1100/16sucai_p20161012101_387.JPG'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    'type|1': ['微型', '微型', '中型', '大型'],
    'status|1': ['飞行中', '待命中', '充电中', '故障中', '维修中' , '离线中', '电量低', '已停用'],
    num: +Mock.Random.date('T'),
    name: '@cword(2,5)无人机',
    comm: '@cword(18,23)',
    desc: '@cword(300,400)',
    'powerMax|200-400': 300,
    'capacity|1000-4000': 3000,
    'flyMileage|2000-4000': 3000,
    res: {
      windRes: {
        name: '抗风系数',
        value: '@float(0, 0, 1,2)'
      },
      waterRes: {
        name: '抗水系数',
        value: '@float(0, 0, 1,2)'
      },
      hitRes: {
        name: '放撞击系数',
        value: '@float(0, 0, 1,2)'
      },
      flexibility: {
        name: '灵活系数',
        value: '@float(0, 0, 1,2)'
      },
      emcRes: {
        name: '抗电磁干扰系数',
        value: '@float(0, 0, 1,2)'
      }
    },
    createTime: '@datetime',  //出厂日期
    imgUrl: image_uri,
    loss: {
      wingLoss: {
        name: '机翼损耗率',
        value: '@float(0, 0, 1,2)'
      },
      powerLoss: {
        name: '电池损耗率',
        value: '@float(0, 0, 1,2)'
      },
      cameraLoss: {
        name: '摄像头损耗率',
        value: '@float(0, 0, 1,2)'
      },
      packLoss: {
        name: '机舱损耗率',
        value: '@float(0, 0, 1,2)'
      },
      engineLoss: {
        name: '引擎损耗率',
        value: '@float(0, 0, 1,2)'
      },
      baseLoss: {
        name: '底座损耗率',
        value: '@float(0, 0, 1,2)'
      }
    }
  }))
}


export default [
  {
    url: '/get/device/list',
    type: 'get',
    response: config => {

      let {
        id, type, status, num, name, createTimeStart,
        createTimeEnd, page = 1, limit = 20, sort
      } = config.query

      let listTemp = List.filter(item => {

        if (id && item.id !== +id) return false
        if (type && item.type !== type) return false
        if (status && item.status !== status) return false
        if (num && item.num !== num) return false
        if (name && item.name !== name) return false
        if (createTimeStart && new Date(createTimeStart) > new Date(item.createTime))
          return false
        if (createTimeEnd && new Date(createTimeEnd) < new Date(item.createTime))
          return false
        return true
      })

      if (sort === '-id') {
        listTemp = listTemp.reverse()
      }

      const pageList = listTemp.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        msg: '处理成功',
        data: {
          total: listTemp.length,
          list: pageList
        }
      }

    }
  },
  {
    url: '/device/add',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        msg: '添加成功'
      }
    }
  },
  {
    url: '/upload/dev/file',
    type: 'post',
    response: _ => {

      count=1
      return {
        code: 20000,
        msg: '上传文件成功',
        data: List[0]
      }
    }
  }
]
