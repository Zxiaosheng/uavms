<template>
  <div class="app-contanier">
    <!--搜索框的引入-->
    <div class="filter-container">
      <el-input v-model="listQuery.userName" :placeholder="$t('user.head.title')" style="width: 200px;"
                class="filter-item" @keyup.enter.native="handleFilter" @keyup.native.enter="getList"/>
      <!--身份的筛选-->
      <el-select v-model="listQuery.userPri" :placeholder="$t('user.head.limit')" style="width: 160px"
                 class="filter-item" @change="getList">
        <el-option v-for="item in userType" :key="item.id" :label="item.typeName" :value="item.typeName"/>
      </el-select>
      <!--性别的筛选-->
      <el-select v-model="listQuery.userSex" :placeholder="$t('user.head.sex')" style="width: 160px" class="filter-item"
                 @change="getList">
        <el-option v-for="item in sexType" :key="item.id" :label="item.typeSex" :value="item.typeSex"/>
      </el-select>
      <!--搜索按钮的设置-->
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getList">
        {{ $t('user.head.search') }}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
                 @click="handleCreate">
        {{ $t('user.head.add') }}
      </el-button>
    </div>
    <!--表格的渲染-->
    <el-table :data="tableData" border style="width: 100%;text-align: center" align="center" v-loading="listLoading">
      <el-table-column prop="userId" align="center" sortable :label="$t('user.id')" width="130"/>
      <el-table-column prop="userName" sortable :label="$t('user.name')" width="120" align="center"/>
      <el-table-column prop="userDate" sortable :label="$t('user.date')" width="120" align="center"/>
      <el-table-column prop="userPrivileges" sortable :label="$t('user.userType')" align="center" width="120"/>
      <el-table-column prop="userSex" sortable :label="$t('user.sex')" align="center" width="100"/>
      <el-table-column prop="userCompany" sortable :label="$t('user.company')" align="center" width="140"/>
      <el-table-column prop="province" sortable :label="$t('user.provin')" align="center" width="100"/>
      <el-table-column prop="userTelephone" sortable :label="$t('user.telephone')" align="center" width="150"/>
      <!--操作的设置-->
      <el-table-column :label="$t('user.caption')">
        <template slot-scope="scope" align="center">
          <!--修改用户权限-->
          <el-button type="primary" size="mini" @click="showEdtDialog(scope.row)">编辑</el-button>
          <!--编辑对话框的设置-->
          <el-dialog title="编辑用户信息" :visible.sync="dialogFormVisible">
            <el-form ref="dataForm" :rules="rules" :model="form" label-position="left" label-width="70px"
                     style="width: 400px; margin-left:50px;">

              <el-form-item label="姓名">
                <el-input v-model="form.userName" width="60"></el-input>
              </el-form-item>

              <!--日期的设置-->
              <el-form-item label="日期" width="100">
                <el-date-picker v-model="form.userDate" value-format="yyyy-MM-dd" placeholder="选择日期">
                </el-date-picker>
              </el-form-item>

              <!--类别下拉框的设置-->
              <el-form-item label="用户类别">
                <el-select v-model="form.userPrivileges" value-key="id" placeholder="请选择" style="width: 120px">
                  <el-option v-for="type in userType" :key="type.id" :label="type.typeName" :value="type.typeName"/>
                </el-select>
              </el-form-item>

              <!--性别下拉框的设置-->
              <el-form-item label="用户性别">
                <el-select v-model="form.userSex" value-key="id" placeholder="请选择" style="width: 120px">
                  <el-option v-for="type in sexType" :key="type.id" :label="type.typeSex" :value="type.typeSex"/>
                </el-select>
              </el-form-item>

              <!--电话号码的设置-->
              <el-form-item label="电话号码" prop="taskHeader">
                <el-input v-model="form.userTelephone" width="150"></el-input>
              </el-form-item>

              <!--公司的设置-->
              <el-form-item label="公司">
                <el-input v-model="form.userCompany" width="60"></el-input>
              </el-form-item>
              <!--省份的来源-->
              <el-form-item label="省份">
                <el-select v-model="form.province" value-key="id" placeholder="请选择" style="width: 120px">
                  <el-option v-for="type in province" :key="type.id" :label="type.priName" :value="type.priName"/>
                </el-select>
              </el-form-item>
            </el-form>

            <!--编辑表格的确定修改或取消修改按钮-->
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogStatus==='create'?createData():saveData()">确 定</el-button>
            </div>
          </el-dialog>

          <el-button size="mini" type="warning" @click="delNews(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页的导入-->
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
  import {userList, userAdd, userUpdate, isDel} from '@/api/userManager'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination

  export default {
    // 注册的分页组件
    components: {Pagination},
    data() {
      return {
        // 从后台获取的总数据
        tableData: [],
        // 分页显示得总数
        total: 0,
        // 分页时每页的数据
        pageData: [],
        // 是否重新加载数据
        listLoading: true,
        edtRowId: -1,
        // 设置弹框是否显示
        dialogFormVisible: false,
        //选择新增或修改表格
        dialogStatus: "",
        //存放编辑数据
        form: {
          userId: "",
          userCompany: "",
          userDate: "",
          userName: "",
          userPrivileges: "",
          userSex: "",
          userTelephone: "",
          isDelete: 0,
          province: ""
        },
        province: [
          {id: 1, priName: '北京市'},
          {id: 2, priName: '安徽省'},
          {id: 3, priName: '福建省'},
          {id: 4, priName: '甘肃省'},
        ],
        userType: [
          {id: 1, typeName: '普通用户'},
          {id: 2, typeName: '管理员'}
        ],
        sexType: [
          {id: 1, typeSex: '男'},
          {id: 2, typeSex: '女'}
        ],
        // 页面筛选和页数绑定跳转时的数据
        listQuery: {
          page: 1,
          limit: 20,
          userName: undefined,
          userPri: undefined,
          userSex: undefined,
          isDelete: 0,
        },
        isDelObj: {
          userId: ""
        },
        //表单验证
//        rules: {
//          taskHeader: [
//            {required: true, message: '请输入电话号码', trigger: 'blur'},
//            {min: 0, max: 9, message: '长度不超过11位', trigger: 'blur'}
//          ],
//        }
      }
    },
    mounted() {

      this.getList();
    },
    methods: {
      // 分页的操作+过滤
      getList() {
        //显示加载框
        this.listLoading = true;
        //首次挂载新闻列表组件时获得所有新闻数据
        userList(this.listQuery).then(response => {
          this.tableData = response.data.list
          // 获得数据总数
          this.total = response.data.total;
          this.listLoading = false;
        })
      },
      //新增表格数据
      resetTemp() {
        this.form = {
          userId: "",
          userCompany: "",
          userDate: "",
          userName: "",
          userPrivileges: "",
          userSex: "",
          userTelephone: "",
          isDelete: 0,
        }
      },
      // 新增表格数据的操作
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create',
          this.dialogFormVisible = !this.dialogFormVisible
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      //新增数据的确定操作
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.form.userId = parseInt(Math.random() * 100) + 1024 // mock a id
            console.log('this.form', this.form)
            userAdd(this.form).then(() => {
              //创建一个新的对象插入，否则指针会一直指向this.form
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
              this.getList()
            })
          }
        })
      },
      // 回车搜索的操作
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      // 编辑按钮的设置
      showEdtDialog(row) {
        console.log('当前行的数据', row)
        this.dialogStatus = 'update',
          this.dialogFormVisible = !this.dialogFormVisible
        let {userId, userCompany, userDate, userName, userPrivileges, userSex, userTelephone, isDelete} = row;
        this.form = {userId, userCompany, userDate, userName, userPrivileges, userSex, userTelephone, isDelete};
        console.log('this.form', this.form)
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      // 编辑按钮的保存操作
      saveData() {
        this.dialogFormVisible = !this.dialogFormVisible
        let num = -1
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.form)
            userUpdate(tempData).then(() => {
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
              this.getList()
            })
          }
        })

      },
      // 删除某一行数据的操作
      delNews(row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let index = 0
          let userId = row.userId
          this.isDelObj = {userId}
          const delData = Object.assign({}, this.isDelObj)
          isDel(delData).then(() => {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
            this.getList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    }
  }
</script>
<style>
</style>
