import Mock from 'mockjs'

const userList = []
const count = 50

for (let i = 0; i < count; i++) {
  userList.push(Mock.mock({
    "id": '@increment',
    "date": "@date",
    "userType|1": [{id: 1, typeUser: '普通用户'}, {id: 2, typeUser: '管理员'}],
    "sex|1": [{id: 1, typesex: '男'}, {id: 2, typesex: '女'}],
    "telephone": /^1[385][1-9]\d{8}/,
    "name": "@cname(3,5)"
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
  }
]
