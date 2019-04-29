<template>
  <div class="app-container">
    <!--filter start-->
    <div class="filter-container">
      <!--ID排序选择-->
      <el-select v-model="listQuery.sort" style="width: 200px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-input v-model="listQuery.taskName" :placeholder="$t('task.taskName')" style="width: 200px;" class="filter-item" @keyup.native.enter="handleFilter" />
      <el-select v-model="listQuery.taskType" :placeholder="$t('task.taskType')" clearable style="width: 180px" class="filter-item">
        <el-option v-for="item in taskTypes" :key="item.typeId" :label="item.typeName+'('+item.typeId+')'" :value="item.typeId" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList">
        {{ $t('table.search') }}
      </el-button>
    </div>
    <!--filter end-->

    <!--table start-->
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="pageList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column fixed="left" :label="$t('task.taskId')" sortable="custom" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.taskId }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('task.taskStatus')" width="100px" align="center">
        <template slot-scope="{row}">
          <!-- row.status ? 'success' : 'info'-->
          <el-tag :type="row.taskStatus|taskStatusFilter">{{ row.taskStatus|taskStatusValFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('task.taskName')" align="center" width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.taskName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('task.startTime')" align="center" width="140">
      <template slot-scope="scope">
      <span>{{ scope.row.startTime}}</span>
      </template>
      </el-table-column>
      <el-table-column :label="$t('task.endTime')" align="center" width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.endTime}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('task.taskDesc')" align="center" width="240">
        <template slot-scope="scope">
          <span>{{ scope.row.taskDesc }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('task.taskType')" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.taskTypes.typeName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('task.beforeTask')" width="160px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.beforeTask }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('task.afterTask')" width="160px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.afterTask }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('task.parentTask')" align="center" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.parentTask }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('task.head')" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.head }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('task.taskUav')" align="center" width="120">
      <template slot-scope="scope">
      <span>{{ scope.row.taskUavs }}</span>
      </template>
      </el-table-column>
      <el-table-column fixed="right" :label="$t('table.actions')" align="center" width="312" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            {{ $t('table.edit') }}
          </el-button>
          <el-button v-if="row.status!='published'" size="mini" type="success" @click="handleModifyStatus(row,'published')">
            {{ $t('table.publish') }}
          </el-button>
          <el-button v-if="row.status!='draft'" size="mini" @click="handleModifyStatus(row,'draft')">
            {{ $t('table.draft') }}
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleModifyStatus(row,'deleted')">
            {{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--table end-->

    <!--page start-->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page"
                :limit.sync="listQuery.limit" @pagination="getList" />
    <!--page end-->

    <!--dialog start-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('task.startTime')" prop="startTime">
          <el-date-picker v-model="temp.startTime" type="date" placeholder="Please pick a date" />
        </el-form-item>
        <el-form-item :label="$t('task.endTime')" prop="endTime">
          <el-date-picker v-model="temp.endTime" type="date" placeholder="Please pick a date" />
        </el-form-item>
        <el-form-item :label="$t('task.taskDesc')" prop="taskDesc">
          <el-input v-model="temp.taskDesc" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item>
        <el-form-item :label="$t('task.beforeTask')" prop="beforeTask">
          <el-input v-model="temp.beforeTask" />
        </el-form-item>
        <el-form-item :label="$t('task.afterTask')" prop="afterTask">
          <el-input v-model="temp.afterTask" />
        </el-form-item>
        <el-form-item :label="$t('task.parentTask')" prop="parentTask">
          <el-input v-model="temp.parentTask" />
        </el-form-item>
        <el-form-item :label="$t('task.taskUav')" prop="taskUav">
          <el-input v-model="temp.taskUav" />
        </el-form-item>
        <el-form-item :label="$t('task.taskStatus')" prop="taskStatus">
          <el-input v-model="temp.taskStatus" />
        </el-form-item>
        <el-form-item :label="$t('task.taskType')">
          <el-select v-model="temp.taskType" class="filter-item" placeholder="Please select">
            <el-option v-for="item in taskTypes" :key="item.typeId" :label="item.typeName" :value="item.typeId" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          {{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>
    <!--dialog end-->
  </div>
</template>

<script>
import { fetchTasklist,updateTask,createTask } from '@/api/task'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'

const taskTypes = [
  { typeId: 1, typeName: '消防任务' },
  { typeId: 2, typeName: '医疗任务' },
  { typeId: 3, typeName: '交通任务' },
  { typeId: 4, typeName: '物流任务' },
  { typeId: 5, typeName: '巡警任务' },
  { typeId: 6, typeName: '其他任务' }
];

export default {
  name: 'Index',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      // 从后台获取的总数据
      totalData: null,
      pageList: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        taskType: undefined,
        taskName: undefined,
        sort:'+id'
      },
      taskTypes,
      // 生成ID正序和倒序的选择框
      sortOptions: [
        { label: '根据任务ID正序排列', key: '+id' },
        { label: '根据任务ID倒序排列', key: '-id' }
      ],
      statusOptions: ['published', 'draft', 'deleted'],
      taskStatusOptions: ['Finished', 'OutTime', 'Cancel','Pause'],
      dialogFormVisible:false,
      dialogStatus:'',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      temp: {
        taskId: undefined,
        taskName: '',
        taskDesc: '',
        startTime: new Date(),
        endTime: new Date(),
        taskType:'',
        beforeTask:'',
        afterTask:'',
        parentTask:'',
        taskUav:'',
        taskStatus:'',
        head:''
      },
      // dialogPvVisible: false,
      // pvData: [],
      // 表单校验规则定义
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.listLoading = true
    fetchTasklist({}).then(resp => {
      this.totalData = resp.data.items
      this.total = resp.data.total
      this.getList()
      setTimeout(() => {
        this.listLoading = false
      }, 200)
    })
  },
  methods: {
    getList() {
      let { page, limit, taskType, taskName, sort } = this.listQuery
      // 过滤查询结果集
      let filterData = this.totalData.filter(item => {
        if (taskName && item.taskName.indexOf(taskName) < 0) return false
        if (taskType && item.taskType.taskId !== taskType) return false
        return true
      })

      //排序
      if(sort === '-id'){
        filterData = filterData.reverse();
      }

      // 分页过滤
      this.pageList = filterData
        .filter((item, index) => index < page * limit && index >= limit * (page - 1))
      // console.log(this.pageList)
    },
    handleFilter() {
      this.getList()
    },
    resetTemp() {
      this.temp = {
        taskId: undefined,
        taskName: '',
        taskDesc: '',
        startTime: new Date(),
        endTime: new Date(),
        taskType:'',
        beforeTask:'',
        afterTask:'',
        parentTask:'',
        taskUav:'',
        taskStatus:'',
        head:''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // 建议本次模拟数据中ID最大值加一
          this.temp.taskId = parseInt(Math.random() * 100) + 1024 // mock a id
          createTask(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row){
      this.temp = Object.assign({}, row)
      this.temp.startTime = new Date(this.temp.startTime)
      this.temp.endTime = new Date(this.temp.endTime)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.startTime = +new Date(tempData.startTime) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          tempData.endTime = +new Date(tempData.endTime)
          updateTask(tempData).then(() => {
            for (const v of this.totalData) {
              if (v.taskId === this.temp.taskId) {
                const index = this.totalData.indexOf(v)
                this.totalData.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.totalData.indexOf(row)
      this.totalData.splice(index, 1)
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
  },
  filters:{
    taskStatusValFilter(value){
      const statusMap = {
        Finished:'完成',
        OutTime:'超时',
        Cancel:'取消',
        Pause:'暂停'
      };
      return statusMap[value]
    },
    taskStatusFilter(status){
      const statusMap = {
        Finished:'success',
        OutTime:'danger',
        Cancel:'info',
        Pause:'warn'
      };
      return statusMap[status];
    },
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      };
      return statusMap[status]
    },
  }
}
</script>

<style scoped>

</style>
