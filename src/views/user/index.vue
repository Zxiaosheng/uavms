<template>
  <div>
    <!--搜索框的引入-->
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        :placeholder="$t('user.head.title')"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
        @keyup.native.enter="getList"
      />
      <!--身份的筛选-->
      <el-select
        v-model="listQuery.userType"
        :placeholder="$t('user.head.limit')"
        style="width: 160px"
        class="filter-item"
        @change="getList"
      >
        <el-option v-for="item in userType" :key="item.id" :label="item.typeName" :value="item.id"/>
      </el-select>
      <!--性别的筛选-->
      <el-select v-model="listQuery.sexType" :placeholder="$t('user.head.sex')" style="width: 160px" class="filter-item" @change="getList">
        <el-option v-for="item in sexType" :key="item.id" :label="item.typeSex" :value="item.id"/>
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
    <el-table :data="pageData" border style="width: 100%;text-align: center">
      <el-table-column prop="id" align="center" sortable :label="$t('user.id')" width="130"/>
      <el-table-column prop="name" sortable :label="$t('user.name')" width="180"/>
      <el-table-column prop="date" sortable :label="$t('user.date')" width="180"/>
      <el-table-column prop="userType.typeUser" sortable :label="$t('user.userType')" width="150"/>
      <el-table-column prop="sexType.typeSex" sortable :label="$t('user.sex')" width="100"/>
      <el-table-column prop="telephone" sortable :label="$t('user.telephone')" width="120"/>
      <!--操作的设置-->
      <el-table-column :label="$t('user.caption')" width="150">
        <template slot-scope="scope" align="center">
          <!--修改用户权限-->
          <el-button type="success" size="mini" @click="showEdtDialog(scope.row)">编辑</el-button>
          <!--编辑对话框的设置-->
          <el-dialog title="编辑用户信息" :visible.sync="dialogFormVisible">
            <el-form ref="dataForm" :model="form" label-position="left" label-width="70px"
                     style="width: 400px; margin-left:50px;">

              <el-form-item label="姓名">
                <el-input v-model="form.name" width="60"></el-input>
              </el-form-item>

              <!--日期的设置-->
              <el-form-item label="日期" width="100">
                <el-date-picker v-model="form.date" value-format="yyyy-MM-dd" placeholder="选择日期">
                </el-date-picker>
              </el-form-item>

              <!--类别下拉框的设置-->
              <el-form-item label="用户类别">
                <el-select v-model="form.userType.typeUser" value-key="id" placeholder="请选择" style="width: 120px">
                  <el-option v-for="type in userType" :key="type.id" :label="type.typeName" :value="type.typeName"/>
                </el-select>
              </el-form-item>

              <!--性别下拉框的设置-->
              <el-form-item label="用户性别">
                <el-select v-model="form.sexType.typeSex" value-key="id" placeholder="请选择" style="width: 120px">
                  <el-option v-for="type in sexType" :key="type.id" :label="type.typeSex" :value="type.typeSex"/>
                </el-select>
              </el-form-item>

              <!--电话号码的设置-->
              <el-form-item label="电话号码">
                <el-input v-model="form.telephone" width="60"></el-input>
              </el-form-item>
            </el-form>

            <!--编辑表格的确定修改或取消修改按钮-->
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogStatus==='create'?createData():saveData()">确 定</el-button>
            </div>
          </el-dialog>

          <el-button size="mini" type="danger" @click="delNews(scope.row)">删除</el-button>
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
  import {userList, createArticle} from '@/api/userManager'
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
        // 页面修改用户权限临时存储的位置
        form: {
          id: '',
          name: '',
          date: "",
          telephone: "",
          userType: {},
          sexType: {}
        },
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
          title: undefined,
          sexType: undefined,
          userType: undefined,
          sort: '+id'
        }
      }
    },
    mounted() {
      // 首次挂载新闻列表组件时获得所有新闻数据
      userList({}).then(response => {
        this.tableData = response.data.items
        // 获得数据总数
        this.total = response.data.total
        // 获取到分页第一页的数据
        this.getList()
      })
    },

    methods: {
      resetTemp() {
        this.form = {
          id: '',
          name: '',
          date: "",
          telephone: "",
          userType: {},
          sexType: {}
        }
        userType: [
          {id: '', typeName: ''},
          {id: '', typeName: ''}
        ]
        sexType: [
          {id: '', typeSex: ''},
          {id: '', typeSex: ''}
        ]
      },
      // 新增表格数据的操作
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create',
          this.dialogFormVisible = !this.dialogFormVisible
        //
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.form.id = parseInt(Math.random() * 100) + 1024 // mock a id
            createArticle(this.form).then(() => {
              //创建一个新的对象插入，否则指针会一直指向this.form
              const tempData = Object.assign({}, this.form)
              this.tableData.unshift(tempData)
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
      // 分页的操作+过滤
      getList() {
        // 将初始的这些值赋给新的点击事件中
        const {page, limit, title, sort, sexType, userType} = this.listQuery
        // 过滤查询结果集（先过滤，再分页）
        let filterData = this.tableData.filter(item => {
          // 实现换页显示
          console.log('item',item)
          this.listQuery.page = page
          // 如果title不为0
          if (title && item.name.indexOf(title) < 0) return false
          if (sexType && (item.sexType.id !== sexType)) return false
          if (userType && item.userType.id != userType) return false
          return true
        })
        this.total = filterData.length
        // 排序
        if (sort === '-id') {
          filterData = filterData.reverse()
        }
        // 从总数据中过滤出当前页要显示的数据集
        this.pageData = filterData.filter((item, index) =>
          index < page * limit && index >= limit * (page - 1)
        )
      },

      // 修改用户权限的操作
      // 编辑按钮的设置
      showEdtDialog(edit) {
        this.dialogStatus = 'update',
        this.dialogFormVisible = !this.dialogFormVisible
        this.tableData.forEach((row) => {
          if (row.id === edit.id) {
            this.edtRowId = row.id
            this.form.userType.typeName = row.userType.typeName
            this.form.id = row.id;
            this.form.date = row.date;
//            this.form.sexType.typeSex = row.sex.typeSex;
            this.form.name = row.name;
            this.form.telephone = row.telephone;
          }
        })
      },
      // 编辑按钮的保存操作
      saveData() {
          this.dialogFormVisible = !this.dialogFormVisible
        let num = -1
        this.tableData.forEach((index, idx) => {
          if (index.id === this.edtRowId) {
            num = idx
            this.tableData[num].userType.typeUser = this.form.userType.typeUser
            this.tableData[num].name = this.form.name
            this.tableData[num].telephone = this.form.telephone
            this.tableData[num].date = this.form.date
            this.tableData[num].sexType.typeSex = this.form.sexType.typeSex
          }
        })
//        this.edtRowId = -1
      },
      // 删除某一行数据的操作
      delNews(row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let index = 0
          this.tableData.forEach((news, idx) => {
            if (news.id === row.id) {
              index = idx
            }
          })
          this.tableData.splice(index, 1)
          this.getList();
          this.$message({
            type: 'success',
            message: '删除成功!'
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
