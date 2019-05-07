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
        <el-option v-for="item in taskTypes" :key="item.typeId" :label="item.typeName" :value="item.typeId" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList">
        {{ $t('table.search') }}
      </el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleCreate">
        {{ $t('table.add') }}
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
      <el-table-column :label="$t('task.taskStatus')" width="110px" align="center">
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
      <el-table-column :label="$t('task.rodeName')" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.rodeName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('task.startTime')" align="center" width="160">
      <template slot-scope="scope">
      <span>{{ scope.row.startTime}}</span>
      </template>
      </el-table-column>
      <el-table-column :label="$t('task.endTime')" align="center" width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.endTime}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('task.taskDesc')" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.taskDesc }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('task.taskType')" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.taskTypes.typeName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('task.head')" align="center" width="90">
        <template slot-scope="scope">
          <span>{{ scope.row.head }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('task.taskUav')" align="center" width="160">
      <template slot-scope="scope">
      <span>{{ scope.row.taskUavs }}</span>
      </template>
      </el-table-column>
      <el-table-column fixed="right" :label="$t('table.actions')" align="center" width="300" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button :disabled="!(row.taskStatus=='OutTime'||row.taskStatus=='Normal')" size="mini" type="success" @click="handleModifyStatus(row,'finished')">
            {{ $t('task.btnFinished') }}
          </el-button>
          <el-button :disabled="!(row.taskStatus=='Wait'||row.taskStatus=='Pause')" size="mini" type="primary" @click="handleModifyStatus(row,'start')">
            {{ $t('task.btnStart') }}
          </el-button>
          <el-button :disabled="!(row.taskStatus=='OutTime'||row.taskStatus=='Normal')" size="mini" @click="handleModifyStatus(row,'pause')">
            {{ $t('task.btnPause') }}
          </el-button>
          <el-button size="mini" type="danger" @click="handleModifyStatus(row,'delete')">
            {{ $t('task.btnDelete') }}
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
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="30%">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('task.taskName')" prop="head">
          <el-input v-model="temp.taskName" type="text" placeholder="请输入任务名称"/>
        </el-form-item>
        <el-form-item :label="$t('task.head')" prop="head">
          <el-input v-model="temp.head" type="text" placeholder="请输入负责人"/>
        </el-form-item>
        <el-form-item :label="$t('task.startTime')" prop="startTime">
          <el-date-picker v-model="temp.startTime" value-format="yyyy-MM-dd HH:mm" type="datetime" placeholder="请选择开始时间" />
        </el-form-item>
        <el-form-item :label="$t('task.endTime')" prop="endTime">
          <el-date-picker v-model="temp.endTime" value-format="yyyy-MM-dd HH:mm" type="datetime" placeholder="请选择结束时间" />
        </el-form-item>
        <el-form-item :label="$t('task.taskDesc')" prop="taskDesc">
          <el-input v-model="temp.taskDesc" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="请输入任务描述" />
        </el-form-item>
        <el-form-item :label="$t('task.taskUav')" prop="taskUav">
          <!--<el-input v-model="temp.taskUavs" />-->
          <el-select v-model="temp.taskUavs" class="filter-item" placeholder="Please select">
            <el-option v-for="(item,index) in taskUavs" :key="index" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('task.taskType')">
          <el-select v-model="temp.taskTypes.typeName" class="filter-item" placeholder="Please select">
            <el-option v-for="item in taskTypes" :key="item.typeId" :label="item.typeName" :value="item.typeName" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t('table.cancel') }}
        </el-button>
        <!--@click="dialogStatus==='create'?createData():updateData()"-->
        <el-button type="primary" @click="createData()">
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
      taskTypes:[
        { typeId: 1, typeName: '消防任务' },
        { typeId: 2, typeName: '医疗任务' },
        { typeId: 3, typeName: '交通任务' },
        { typeId: 4, typeName: '物流任务' },
        { typeId: 5, typeName: '巡警任务' },
        { typeId: 6, typeName: '其他任务' }
      ],
      taskUavs:['闪电F-28','科农A6-160','闪电F-35','猎鹰M6-84M6-84','天鹰M4-100','长空CK1B','长空CK1C','无侦5','ASN-12','WZ-2000','鲨鱼II'],
      // 生成ID正序和倒序的选择框
      sortOptions: [
        { label: '根据任务ID正序排列', key: '+id' },
        { label: '根据任务ID倒序排列', key: '-id' }
      ],
      // 任务只有完成按钮，暂停按钮，开启按钮，删除按钮四个按钮，完成，超时，暂停，正常四个状态
      statusOptions: ['finished','pause','start', 'delete'],
      taskStatusOptions: ['Finished','Wait','Normal' ,'OutTime','Pause'],
      dialogFormVisible:false,
      dialogStatus:'',
      textMap: {
        create: 'create'
      },
      temp: {
        taskId: undefined,
        taskName: '',
        taskDesc: '',
        startTime: undefined,
        endTime: undefined,
        taskTypes:[{typeId:1,typeName:''}],
        taskUavs:'',
        taskStatus:'',
        head:''
      },
      dialogConfirmVisible:false
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
        if (taskType && item.taskTypes.typeId !== taskType) return false
        return true
      })

      //排序
      if(sort === '-id'){
        filterData = filterData.reverse();
      }

      // 分页过滤
      this.pageList = filterData
        .filter((item, index) => index < page * limit && index >= limit * (page - 1))
      //console.log(this.pageList)
    },
    handleFilter() {
      this.getList()
    },
    handleCreate() {
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
          this.temp.taskId = parseInt(Math.random() * 100) + 1024
          this.temp.taskStatus = 'Wait'
          createTask(this.temp).then(() => {
            //console.log(this.temp)
            this.pageList.unshift(this.temp)
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
    deleteData(){
      console.log(this.deleteObj)
      const index = this.totalData.indexOf(this.deleteObj)
      this.pageList.splice(index, 1)
      this.dialogConfirmVisible = false
    },
    handleModifyStatus(row, status) {
      if(status === 'finished'){
        row.taskStatus = 'Finished'
      }else if(status === 'start'){
        row.taskStatus = 'Normal'
      }else if(status === 'pause'){
        row.taskStatus = 'Wait'
      }else if(status === 'delete'){
        this.dialogConfirmVisible = true
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //执行删除
          let index = -1;
          this.pageList.forEach((thisTask,idx)=>{
            if(thisTask.taskId === row.taskId)
              index = idx;
          });
          this.pageList.splice(index,1);
          // const index = this.totalData.indexOf(row)
          // this.pageList.splice(index, 1)

          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
  },
  filters:{
    taskStatusValFilter(value){
      const statusMap = {
        Finished:'完成',
        Wait:'等待',
        OutTime:'超时',
        Normal:'正常',
        Pause:'暂停'
      };
      return statusMap[value]
    },
    taskStatusFilter(status){
      const statusMap = {
        Finished:'success',
        OutTime:'danger',
        Wait:'warning',
        Normal:'primary',
        Pause:'info'
      };
      return statusMap[status];
    },
    statusFilter(status) {
      const statusMap = {
        finished: 'success',
        pause: 'info',
        start: 'primary',
        delete: 'danger'
      };
      return statusMap[status]
    }
  }
}
</script>

<style scoped>

</style>
