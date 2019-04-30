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
        <el-option v-for="item in userType" :key="item.id" :label="item.typeName" :value="item.id" />
      </el-select>
      <!--性别的筛选-->
      <el-select
        v-model="listQuery.sexType"
        :placeholder="$t('user.head.sex')"
        style="width: 160px"
        class="filter-item"
        @change="getList"
      >
        <el-option v-for="item in sexType" :key="item.id" :label="item.typeSex" :value="item.id" />
      </el-select>
      <!--搜索按钮的设置-->
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getList">
        {{ $t('user.head.search') }}
      </el-button>
    </div>
    <!--表格的渲染-->
    <el-table :data="pageData" border style="width: 100%;text-align: center">
      <el-table-column prop="id" align="center" sortable :label="$t('user.id')" width="130" />
      <el-table-column prop="name" sortable :label="$t('user.name')" width="180" />
      <el-table-column prop="date" sortable :label="$t('user.date')" width="180" />
      <el-table-column prop="userType.typeUser" sortable :label="$t('user.userType')" width="150" />
      <el-table-column prop="sex.typesex" sortable :label="$t('user.sex')" width="150" />
      <el-table-column prop="telephone" sortable :label="$t('user.telephone')" width="150" />
      <!--操作的设置-->
      <el-table-column :label="$t('user.caption')">
        <template slot-scope="scope" align="center" width="230">
          <!--修改用户权限-->
          <el-button type="success" size="mini" @click="showEdtDialog(scope.row)">修改用户权限</el-button>
          <!--编辑对话框的设置-->
          <el-dialog title="用户权限" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <!--类别下拉框的设置-->
              <el-form-item label="用户类别">
                <el-select v-model="form.userType" value-key="id" placeholder="请选择" style="width: 120px">
                  <el-option v-for="type in userType" :key="type.id" :label="type.typeName" :value="type.typeName" />
                </el-select>
              </el-form-item>
            </el-form>
            <!--编辑表格的确定修改或取消修改按钮-->
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="saveData">确 定</el-button>
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
    <!--新增数据的表格渲染-->
    <!--<el-dialog :visible.sync="dialogFormVisible">-->
      <!--<el-form-->
        <!--ref="dataForm"-->
        <!--label-position="left"-->
        <!--label-width="70px"-->
        <!--style="width: 400px; margin-left:50px;"-->
      <!--&gt;-->
        <!--<el-form-item :label="$t('table.type')" prop="type">-->
          <!--<el-select v-model="temp.type" class="filter-item" placeholder="Please select">-->
            <!--<el-option-->
              <!--v-for="item in calendarTypeOptions"-->
              <!--:key="item.key"-->
              <!--:label="item.display_name"-->
              <!--:value="item.key"-->
            <!--/>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="$t('table.date')" prop="timestamp">-->
          <!--<el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date" />-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="$t('table.title')" prop="title">-->
          <!--<el-input v-model="temp.title" />-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="$t('table.status')">-->
          <!--<el-select v-model="temp.status" class="filter-item" placeholder="Please select">-->
            <!--<el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="$t('table.importance')">-->
          <!--<el-rate-->
            <!--v-model="temp.importance"-->
            <!--:colors="['#99A9BF', '#F7BA2A', '#FF9900']"-->
            <!--:max="3"-->
            <!--style="margin-top:8px;"-->
          <!--/>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="$t('table.remark')">-->
          <!--<el-input-->
            <!--v-model="temp.remark"-->
            <!--:autosize="{ minRows: 2, maxRows: 4}"-->
            <!--type="textarea"-->
            <!--placeholder="Please input"-->
          <!--/>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
      <!--<div slot="footer" class="dialog-footer">-->
        <!--<el-button @click="dialogFormVisible = false">-->
          <!--{{ $t('table.cancel') }}-->
        <!--</el-button>-->
        <!--<el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">-->
          <!--{{ $t('table.confirm') }}-->
        <!--</el-button>-->
      <!--</div>-->
    <!--</el-dialog>-->

  </div>
</template>

<script>
import { userList } from '@/api/userManager'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  // 注册的分页组件
  components: { Pagination },
  data() {
    return {
      // 设置新增数据的表格默认下不可见
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
      // 页面修改用户权限临时存储的位置
      form: {
        id: '',
        userType: {},
        sex: {}
      },
      userType: [
        { id: 1, typeName: '普通用户' },
        { id: 2, typeName: '管理员' }
      ],
      sexType: [
        { id: 1, typeSex: '男' },
        { id: 2, typeSex: '女' }
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
    // 新增表格数据的操作
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 回车搜索的操作
    handleFilter() {
      console.log('回车搜索')
      this.listQuery.page = 1
      this.getList()
    },
    // 分页的操作
    getList() {
      // 将初始的这些值赋给新的点击事件中
      const { page, limit, title, sort, sexType, userType } = this.listQuery
      // 过滤查询结果集（先过滤，再分页）
      let filterData = this.tableData.filter(item => {
        // 实现换页显示
        console.log('item', item)
        console.log('id', item.sex.id, 'sexType', sexType)
        this.listQuery.page = page
        // 如果title不为0
        if (title && item.name.indexOf(title) < 0) return false
        if (sexType && (item.userType.id !== userType)) return false
        //          if (userType && item.sex.id != sexType) return false
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
      this.dialogFormVisible = !this.dialogFormVisible
      this.tableData.forEach((row) => {
        if (row.id === edit.id) {
          this.edtRowId = row.id
          this.form.userType = row.userType
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
          console.log(this.form.userType)
          this.tableData[num].userType.typeUser = this.form.userType
        }
      })
      this.edtRowId = -1
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
