import Mock from 'mockjs'

const userList = []
const count = 50
const num = 7
const userMap = []

for (let i = 0; i < count; i++) {
  userList.push(Mock.mock({
    "id": '@increment',
    "date": "@date(\"yyyy-MM-dd\")",
    "userType|1": [{id: 1, typeUser: '普通用户'}, {id: 2, typeUser: '管理员'}],
    "sexType|1": [{id: 1, typeSex: '男'}, {id: 2, typeSex: '女'}],
    "telephone": /^1[385][1-9]\d{8}/,
    "name": "@cname(3,5)"
  }))
}
for (let i = 0; i < num; i++) {
  userMap.push(Mock.mock({
    "id": '@increment',
    "totalNum": "@integer(1,100)",
    "date":"@date(\"yyyy-MM-dd\")",
    'cadd': '@province' ,
  }))
}

export default [
  {
    url: '/userList',
    type: 'get',
    response: () => {
      return {
        code: 20000,
        data: {
          total: userList.length,
          items: userList
        }
      }
    }
  },
  {
    url: '/article/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
//导出图库的数据
  {
    url: '/userMap',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          "add": "@integer(1,100)",
          "del": "@integer(1,100)",
          'man':'@integer(1,100)',
          'women':'@integer(1,100)',
          total: userMap.length,
          items: userMap
        }
      }
    }
  }
]
