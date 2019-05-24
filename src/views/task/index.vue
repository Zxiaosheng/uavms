<template>
  <div class="app-container">
    <!--filter start-->
    <div class="app-container" style="padding-left: 0">
      <template>
        <el-popover
          placement="top-start"
          trigger="hover">
          <pie-chart></pie-chart>
          <el-button v-waves class="filter-item" icon="el-icon-view" type="info" plain slot="reference">{{$t('task.chartView')}}</el-button>
        </el-popover>
      </template>
      <!--ID排序选择-->
      <el-select v-model="listQuery.order" style="width: 140px;" class="filter-item" align="left" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.taskTypeId" :placeholder="$t('task.taskType')" clearable style="width: 140px" class="filter-item">
        <el-option v-for="item in taskType" :key="item.id" :label="item.typeName" :value="item.id" />
      </el-select>
      <el-date-picker v-model="listQuery.taskStartTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" style="width: 140px" :placeholder="$t('task.taskStartTime')"/>
      <el-date-picker v-model="listQuery.taskEndTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" style="width: 140px" :placeholder="$t('task.taskEndTime')" />
      <el-input v-model="listQuery.taskName" :placeholder="$t('task.taskName')" style="width: 140px;" class="filter-item" @keyup.native.enter="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList">
        {{ $t('table.search') }}
      </el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-plus" @click="handleCreate">
        {{ $t('table.add') }}
      </el-button>
    </div>
    <!--filter end-->

    <!--table start-->
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="totalData"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column fixed="left" :label="$t('task.id')" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('task.taskStatus')" width="110px" align="center" prop="taskStatus"
      :filters="[{text:'等待',value:'a'},{text:'超时',value:'e'},{text:'暂停',value:'d'},{text:'正常',value:'b'},{text:'完成',value:'c'}]"
      filter-placement="bottom-end"
      :filter-method="filterTag">
        <template slot-scope="{row}">
          <el-tag :type="row.taskStatus|taskStatusFilter">{{ row.taskStatus|taskStatusValFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('task.taskName')" align="center" width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.taskName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('task.routeName')" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.rodes.routeName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('task.taskStartTime')" align="center" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{ scope.row.taskStartTime}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('task.taskEndTime')" align="center" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{ scope.row.taskEndTime}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('task.taskDesc')" align="center" width="210">
        <template slot-scope="scope">
          <span>{{ scope.row.taskDesc }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('task.taskType')" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.taskType.typeName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('task.taskHeader')" align="center" width="90">
        <template slot-scope="scope">
          <span>{{ scope.row.taskHeader }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('task.taskUav')" align="center" width="150">
      <template slot-scope="scope">
      <span>{{ scope.row.device }}</span>
      </template>
      </el-table-column>
      <el-table-column fixed="right" :label="$t('table.actions')" align="center" width="300" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button :disabled="!(row.taskStatus=='e'||row.taskStatus=='b')" size="mini" type="success" @click="handleModifyStatus(row,'finished')">
            {{ $t('task.btnFinished') }}
          </el-button>
          <el-button :disabled="!(row.taskStatus=='a'||row.taskStatus=='d')" size="mini" type="primary" @click="handleModifyStatus(row,'start')">
            {{ $t('task.btnStart') }}
          </el-button>
          <el-button :disabled="!(row.taskStatus=='e'||row.taskStatus=='b')" size="mini" @click="handleModifyStatus(row,'pause')">
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
    <el-dialog :title="formTitle" :visible.sync="dialogFormVisible" width="30%" center>
      <el-form ref="dataForm" :model="temp" :rules="rules" label-position="left" label-width="80px" >
        <el-form-item :label="$t('task.taskName')" prop="taskName">
          <el-input v-model="temp.taskName" type="text" placeholder="请输入任务名称" style="width: 100%"/>
        </el-form-item>
        <el-form-item :label="$t('task.taskHeader')" prop="taskHeader">
          <el-input v-model="temp.taskHeader" type="text" placeholder="请输入负责人" style="width: 100%"/>
        </el-form-item>
        <el-form-item :label="$t('task.taskStartTime')" prop="taskStartTime">
          <el-date-picker v-model="temp.taskStartTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="请选择开始时间" style="width: 100%"/>
        </el-form-item>
        <el-form-item :label="$t('task.taskEndTime')" prop="taskEndTime">
          <el-date-picker v-model="temp.taskEndTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="请选择结束时间" style="width: 100%"/>
        </el-form-item>
        <el-form-item :label="$t('task.taskUav')" prop="device">
          <!--<el-input v-model="temp.device" />-->
          <el-select v-model="temp.deviceId" class="filter-item" placeholder="请选择机型" style="width: 100%">
            <el-option v-for="(item,index) in device" :key="index" :label="item" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('task.taskTypeId')" prop="taskType">
          <el-select v-model="temp.taskTypeId" class="filter-item" placeholder="请选择任务类型" style="width: 100%">
            <el-option v-for="item in taskType" :key="item.id" :label="item.typeName" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('task.rodeId')" prop="rodes">
          <el-select v-model="temp.rodeId" class="filter-item" placeholder="请选择任务类型" style="width: 100%">
            <el-option v-for="item in rodes" :key="item.id" :label="item.routeName" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('task.taskDesc')" prop="taskDesc">
          <el-input v-model="temp.taskDesc" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="请输入任务描述" style="width: 100%"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" >
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
import { fetchTasklist,updateTask,createTask,fetchTaskTypelist,fetchDevicelist,taskDelete } from '@/api/task'
import {formatDate} from './utils.js'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
import PieChart from './components/PieChart'

export default {
  name: 'Index',
  components: { Pagination,PieChart },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      // 从后台获取的总数据
      totalData: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        taskTypeId: undefined,
        taskName: undefined,
        taskStartTime: '',
        taskEndTime:'',
        order:'+id'
      },
      taskType:[
      ],
      rodes:[
        {id:1,routeName:'福州线'},
        {id:2,routeName:'厦门线'},
        {id:3,routeName:'漳州线'},
        {id:4,routeName:'泉州线'},
        {id:5,routeName:'龙岩线'},
        {id:6,routeName:'南平线'},
        {id:7,routeName:'莆田线'},
        {id:8,routeName:'三明线'},
        {id:9,routeName:'平潭线'},
        {id:10,routeName:'福清线'},
        {id:11,routeName:'宁德线'}
      ],
      device:[],
      // 生成ID正序和倒序的选择框
      sortOptions: [
        { label: '任务ID正序排', key: '+id' },
        { label: '任务ID倒序排', key: '-id' }
      ],
      // 任务只有完成按钮，暂停按钮，开启按钮，删除按钮四个按钮，完成，超时，暂停，正常四个状态
      statusOptions: ['finished','pause','start', 'delete'],
      taskStatusOptions: ['c','a','b' ,'e','d'],
      dialogFormVisible:false,
      dialogStatus:'',
      formTitle:'创建任务',
      temp: {
        taskName: '',
        taskDesc: '',
        taskStartTime: undefined,
        taskEndTime: undefined,
        taskTypeId:"",
        rodeId:"",
        deviceId:'',
        taskStatus:'',
        taskHeader:''
      },
      dialogConfirmVisible:false,
      // 表单验证规则
      rules: {
        taskHeader:[
          { required: true, message: '请输入负责人名称', trigger: 'blur' },
          { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
        ],
        taskName: [
          { required: true, message: '请输入任务名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 4 到 8 个字符', trigger: 'blur' }
        ],
        taskType: [
          { required: true, message: '请选择任务类型', trigger: 'change' }
        ],
        rodes: [
          { required: true, message: '请选择任务路线', trigger: 'change' }
        ],
        device: [
          { required: true, message: '请选择任务机型', trigger: 'change' }
        ],
        taskDesc: [
          { required: true, message: '请填写任务描述', trigger: 'blur' }
        ]
      },
      pieChartId:'pie'
    }
  },
  mounted() {
    this.listLoading = true
    fetchTaskTypelist().then(res=>this.taskType=res.data).then(fetchDevicelist().then(res=>this.device=res.data.data.items).then(_=>this.getList())
  )},
  methods: {
    resetTemp() {
      this.temp = {
        taskName: '',
        taskDesc: '',
        taskStartTime: new Date(),
        taskEndTime: new Date(new Date().getTime() + 24*60*60*1000),
        taskType:[{id:1,typeName:''}],
        rodes:[{id:1,routeName:''}],
        device:'',
        taskStatus:'',
        taskHeader:''
      }
    },
    getList() {
      fetchTasklist(this.listQuery).then(resp => {
        this.totalData = resp.data.data.list;
        this.total = resp.data.data.total;
        this.listLoading = false
      })
    },
    handleFilter() {
      this.getList()
    },
    handleCreate() {
      this.resetTemp()
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          //本次模拟数据中ID最大值+1
//          this.temp.id = this.totalData[this.totalData.length-1].id+1 //parseInt(Math.random() * 100) + 1024
//          this.temp.taskStartTime = formatDate(this.temp.taskStartTime,"yyyy-MM-dd HH:mm:ss")
//          this.temp.taskEndTime = formatDate(this.temp.taskEndTime,"yyyy-MM-dd HH:mm:ss")
          this.temp.taskStatus = 'a'
          createTask(this.temp).then(() => {
            //console.log(this.temp)
//            this.totalData.unshift(this.temp)
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
      this.totalData.splice(index, 1)
      this.dialogConfirmVisible = false
    },
    handleModifyStatus(row, status) {
      if(status === 'finished'){
        row.taskStatus = 'c'
      }else if(status === 'start'){
        row.taskStatus = 'b'
      }else if(status === 'pause'){
        row.taskStatus = 'a'
      }else if(status === 'delete'){
        this.dialogConfirmVisible = true
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //执行删除
          let index = -1;
          this.totalData.forEach((thisTask,idx)=>{
            if(thisTask.id === row.id)
              index = idx+1;
          });
          taskDelete({id:index}).then(_=>  {this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getList()})
          // const index = this.totalData.indexOf(row)
          // this.totalData.splice(index, 1)


        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    filterTag(value, row){
      //逻辑判断过滤
      const valueMap = {
        c:'c',
        a:'a',
        e:'e',
        b:'b',
        d:'d'
      }
      if(valueMap[value]){
        return row.taskStatus === value
      }
    }
  },
  filters:{
    taskStatusValFilter(value){
      const statusMap = {
        c:'完成',
        a:'等待',
        e:'超时',
        b:'正常',
        d:'暂停'
      };
      return statusMap[value]
    },
    taskStatusFilter(status){
      const statusMap = {
        c:'success',
        e:'danger',
        a:'warning',
        b:'primary',
        d:'info'
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
