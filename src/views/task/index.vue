<template>
  <div class="app-container">
    <!--filter start-->
    <div class="app-container" style="padding-left: 0">
      <template>
        <el-popover
          placement="top-start"
          trigger="hover">
          <pie-chart></pie-chart>
          <el-button v-waves class="filter-item" icon="el-icon-view" slot="reference">{{$t('task.chartView')}}</el-button>
        </el-popover>
      </template>
      <!--ID排序选择-->
      <el-select v-model="listQuery.sort" style="width: 200px;" class="filter-item" align="left" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-input v-model="listQuery.taskName" :placeholder="$t('task.taskName')" style="width: 200px;" class="filter-item" @keyup.native.enter="handleFilter" />
      <el-select v-model="listQuery.taskType" :placeholder="$t('task.taskType')" clearable style="width: 180px" class="filter-item">
        <el-option v-for="item in taskTypes" :key="item.typeId" :label="item.typeName" :value="item.typeId" />
      </el-select>
      <el-date-picker v-model="listQuery.startTime" type="date" value-format="yyyy-MM-dd" :placeholder="$t('task.startTime')"/>
      <el-date-picker v-model="listQuery.endTime" type="date" value-format="yyyy-MM-dd" :placeholder="$t('task.endTime')" />
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
      :data="pageList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column fixed="left" :label="$t('task.taskId')" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.taskId }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('task.taskStatus')" width="110px" align="center" prop="taskStatus"
      :filters="[{text:'进行',value:'Doing'},{text:'等待',value:'Wait'},{text:'超时',value:'OutTime'},{text:'暂停',value:'Pause'},{text:'正常',value:'Normal'},{text:'完成',value:'Finished'}]"
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
      <el-table-column :label="$t('task.rodeName')" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.rodes.rodeName }}</span>
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
      <el-table-column :label="$t('task.taskDesc')" align="center" width="210">
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
      <el-table-column :label="$t('task.taskUav')" align="center" width="150">
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
    <el-dialog :title="formTitle" :visible.sync="dialogFormVisible" width="30%" center>
      <el-form ref="dataForm" :model="temp" :rules="rules" label-position="left" label-width="80px" style="width: 400px;height: 460px; margin-left:50px;">
        <el-form-item :label="$t('task.taskName')" prop="taskName">
          <el-input v-model="temp.taskName" type="text" placeholder="请输入任务名称" style="width: 100%"/>
        </el-form-item>
        <el-form-item :label="$t('task.head')" prop="head">
          <el-input v-model="temp.head" type="text" placeholder="请输入负责人" style="width: 100%"/>
        </el-form-item>
        <el-form-item :label="$t('task.startTime')" prop="startTime">
          <el-date-picker v-model="temp.startTime" value-format="yyyy-MM-dd HH:mm" type="datetime" placeholder="请选择开始时间" style="width: 100%"/>
        </el-form-item>
        <el-form-item :label="$t('task.endTime')" prop="endTime">
          <el-date-picker v-model="temp.endTime" value-format="yyyy-MM-dd HH:mm" type="datetime" placeholder="请选择结束时间" style="width: 100%"/>
        </el-form-item>
        <el-form-item :label="$t('task.taskUav')" prop="taskUavs">
          <!--<el-input v-model="temp.taskUavs" />-->
          <el-select v-model="temp.taskUavs" class="filter-item" placeholder="请选择机型" style="width: 100%">
            <el-option v-for="(item,index) in taskUavs" :key="index" :label="item" :value="item"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('task.taskType')" prop="taskTypes">
          <el-select v-model="temp.taskTypes.typeName" class="filter-item" placeholder="请选择任务类型" style="width: 100%">
            <el-option v-for="item in taskTypes" :key="item.typeId" :label="item.typeName" :value="item.typeName"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('task.rodeName')" prop="rodes">
          <el-select v-model="temp.rodes.rodeName" class="filter-item" placeholder="请选择任务类型" style="width: 100%">
            <el-option v-for="item in rodes" :key="item.rodeId" :label="item.rodeName" :value="item.rodeName"/>
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
import { fetchTasklist,updateTask,createTask } from '@/api/task'
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
      pageList: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        taskType: undefined,
        taskName: undefined,
        startTime: '',
        endTime:'',
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
      rodes:[
        {rodeId:1,rodeName:'河北线'},
        {rodeId:2,rodeName:'山西线'},
        {rodeId:3,rodeName:'辽宁线'},
        {rodeId:4,rodeName:'吉林线'},
        {rodeId:5,rodeName:'黑龙线'},
        {rodeId:6,rodeName:'江苏线'},
        {rodeId:7,rodeName:'浙江线'},
        {rodeId:8,rodeName:'安徽线'},
        {rodeId:9,rodeName:'福建线'},
        {rodeId:10,rodeName:'江西线'},
        {rodeId:11,rodeName:'山东线'},
        {rodeId:12,rodeName:'河南线'},
        {rodeId:13,rodeName:'湖北线'},
        {rodeId:14,rodeName:'湖南线'},
        {rodeId:15,rodeName:'广东线'},
        {rodeId:16,rodeName:'海南线'},
        {rodeId:17,rodeName:'四川线'},
        {rodeId:18,rodeName:'贵州线'},
        {rodeId:19,rodeName:'云南线'},
        {rodeId:20,rodeName:'陕西线'},
        {rodeId:21,rodeName:'甘肃线'},
        {rodeId:22,rodeName:'青海线'},
        {rodeId:23,rodeName:'北京线'},
        {rodeId:24,rodeName:'上海线'},
        {rodeId:25,rodeName:'重庆线'},
        {rodeId:26,rodeName:'天津线'},
        {rodeId:27,rodeName:'广西线'},
        {rodeId:28,rodeName:'宁夏线'},
        {rodeId:29,rodeName:'新疆线'},
        {rodeId:30,rodeName:'内蒙古线'}
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
      formTitle:'创建任务',
      temp: {
        taskId: undefined,
        taskName: '',
        taskDesc: '',
        startTime: undefined,
        endTime: undefined,
        taskTypes:[{typeId:1,typeName:''}],
        rodes:[{rodeId:1,rodeName:''}],
        taskUavs:'',
        taskStatus:'',
        head:''
      },
      dialogConfirmVisible:false,
      // 表单验证规则
      rules: {
        head:[
          { required: true, message: '请输入负责人名称', trigger: 'blur' },
          { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
        ],
        taskName: [
          { required: true, message: '请输入任务名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 4 到 8 个字符', trigger: 'blur' }
        ],
        taskTypes: [
          { required: true, message: '请选择任务类型', trigger: 'change' }
        ],
        rodes: [
          { required: true, message: '请选择任务路线', trigger: 'change' }
        ],
        taskUavs: [
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
    resetTemp() {
      this.temp = {
        taskId: undefined,
        taskName: '',
        taskDesc: '',
        startTime: new Date(),
        endTime: new Date(new Date().getTime() + 24*60*60*1000),
        taskTypes:[{typeId:1,typeName:''}],
        rodes:[{rodeId:1,rodeName:''}],
        taskUavs:'',
        taskStatus:'',
        head:''
      }
    },
    getList() {
      let { page, limit, taskType, taskName, sort, startTime, endTime } = this.listQuery
      // 过滤查询结果集
      let filterData = this.totalData.filter(item => {
        let _startTime = new Date(item.startTime.split(" ")[0]).getTime()/1000;
        let _endTime = new Date(item.endTime.split(" ")[0]).getTime()/1000;
        //console.log(_startTime,_endTime);
        let queryStartTime = new Date(startTime).getTime()/1000;
        let queryEndTime = new Date(endTime).getTime()/1000;
        //console.log(queryStartTime,queryEndTime);
        if (queryStartTime && queryEndTime){
          if(_startTime < queryStartTime || _endTime > queryEndTime) return false
        }
        if (queryStartTime && !queryEndTime){
          if(_startTime < queryStartTime) return true
        }
        if (!queryStartTime && queryEndTime){
          if(_endTime > queryEndTime) return true
        }
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
      this.resetTemp()
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
          this.temp.startTime = formatDate(this.temp.startTime,"yyyy-MM-dd hh:ss")
          this.temp.endTime = formatDate(this.temp.endTime,"yyyy-MM-dd hh:ss")
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
    filterTag(value, row){
      //逻辑判断过滤
      const valueMap = {
        Finished:'Finished',
        Wait:'Wait',
        OutTime:'OutTime',
        Normal:'Normal',
        Pause:'Pause'
      }
      if(valueMap[value]){
        return row.taskStatus === value
      }
      if(value === 'Doing'){
        return row.taskStatus === 'OutTime' || row.taskStatus === 'Normal'
      }
    }
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
