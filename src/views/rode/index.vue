<template>
  <div class="app-container">
    <div class="demo-input-size">
      <el-select v-model="listQuery.routeLeave" value-key="id" @change="getList" :placeholder="$t('rode.start')" clearable class="filter-item" style="width: 130px">
        <el-option v-for="(item ,idx ) of location" :key="idx" :label="item.locationName" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.routeArrival" value-key="id" @change="getList" :placeholder="$t('rode.end')" clearable class="filter-item" style="width: 130px">
        <el-option v-for="(item ,idx ) of location" :key="idx" :label="item.locationName" :value="item.id" />
      </el-select>
     <el-date-picker v-model="listQuery.routeStart" type="date" value-format="yyyy-MM-dd HH:mm:ss" :placeholder="$t('rode.date1')" @change="getList"/>
      <el-date-picker v-model="listQuery.routeEnd" type="date" value-format="yyyy-MM-dd HH:mm:ss" :placeholder="$t('rode.date2')" @change="getList"/>
      <el-select v-model="listQuery.taskTypeId" value-key="id" @change="getList" :placeholder="$t('rode.typeId')" clearable class="filter-item" style="width: 130px">
        <el-option v-for="(item ,idx ) of allTaskType" :key="idx" :label="item.typeName" :value="item.id" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList">
        {{ $t('table.search') }}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        {{ $t('table.add') }}
      </el-button>
      <!--<el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">-->
        <!--{{ $t('table.export') }}-->
      <!--</el-button>-->
    </div>
    <el-table :data="pageData" v-loading="listLoading" border fit  highlight-current-row style="width: 100%;magin-top:20px;">

      <el-table-column prop="id" :label="$t('rode.id')" width="100"></el-table-column>

      <el-table-column prop="routeName" :label="$t('rode.rodename')" width="120"></el-table-column>

      <el-table-column prop="taskType.typeName" :label="$t('rode.typeId')"  align="center" width="100"></el-table-column>

      <el-table-column prop="routeStart" :label="$t('rode.date1')" width="165"></el-table-column>

      <el-table-column prop="routeEnd" :label="$t('rode.date2')" width="165"></el-table-column>

      <el-table-column prop="leave.locationName" :label="$t('rode.start')" width="150"></el-table-column>

      <el-table-column prop="arrival.locationName" :label="$t('rode.end')" width="150"></el-table-column>

      <el-table-column prop="routeStatus"  :label="$t('rode.task')">
        <template slot-scope="scope">
          <p>{{scope.row.routeStatus | getstatus()}}</p>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            {{ $t('table.edit') }}
          </el-button>

          <el-button  size="mini" type="danger" @click="changeStatus(row)">
            {{ row.routeStatus | btnStatus()}}
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!--编辑弹出窗-->
    <el-dialog :title="$t('rode.edit')" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm"  :model="temp" label-position="left" label-width="100px" style="width: 500px; margin-left:50px;">

        <el-form-item :label="$t('rode.typeId')" prop="typeId">
          <el-select v-model="temp.taskTypeId" class="filter-item" placeholder="请选择型号" style="width: 100%">
            <el-option v-for="item in allTaskType"  :key="item.id" :label="item.typeName" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('rode.rodename')"  prop="rodename">
          <el-input v-model="temp.routeName" style="width: 100%"/>
        </el-form-item>
        <el-form-item :label="$t('rode.date1')" prop="date">
          <el-date-picker v-model="temp.routeStart" type="date" value-format="yyyy-MM-dd" placeholder="请选择出发时间" style="width: 100%"/>
        </el-form-item>
        <el-form-item :label="$t('rode.date2')" prop="date">
          <el-date-picker v-model="temp.routeEnd" type="date" value-format="yyyy-MM-dd" placeholder="请选择到达时间" style="width: 100%"/>
        </el-form-item>
        <el-form-item :label="$t('rode.start')" prop="typeId">
          <el-select v-model="temp.routeLeave" class="filter-item" placeholder="请选择出发地" style="width: 100%">
            <el-option v-for="(item,idx) in location"  :key="idx" :label="item.locationName" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('rode.end')" prop="typeId">
          <el-select v-model="temp.routeArrival" class="filter-item" placeholder="请选择到达地" style="width: 100%">
            <el-option v-for="(item,idx) in location"  :key="idx" :label="item.locationName" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('rode.task')" prop="routeStatus">
          <el-select v-model="temp.routeStatus" class="filter-item" placeholder="请选择任务状态" style="width: 100%">
            <el-option v-for="(item,idx) in routeStatus"  :key="idx" :label="item.msg" :value="item.status"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary" @click="updateData()">
          {{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>
    <!--新增弹出窗-->
    <el-dialog :title="$t('rode.add')" :visible.sync="dialogFormAdd">
      <el-form ref="AddForm" :model="addtemp" :rules="rules" label-position="left" label-width="100px" style="width: 500px; margin-left:50px;">
        <el-form-item  :label="$t('rode.typeId')" prop="taskTypeId">
          <el-select v-model="addtemp.taskTypeId" class="filter-item" placeholder="请选择任务类型" style="width: 100%">
            <el-option v-for="item in allTaskType"  :key="item.id" :label="item.typeName" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('rode.rodename')"  prop="routeName">
            <el-input v-model="addtemp.routeName" style="width: 100%"/>
        </el-form-item>
        <el-form-item :label="$t('rode.date1')"  prop="routeStart">
          <el-date-picker v-model="addtemp.routeStart" value-format="yyyy-MM-dd HH:mm:ss" type="date"  placeholder="请选择出发时间" style="width: 100%"/>
        </el-form-item>
        <el-form-item :label="$t('rode.date2')"  prop="routeEnd">
          <el-date-picker v-model="addtemp.routeEnd" type="date"  value-format="yyyy-MM-dd HH:mm:ss" placeholder="请选择到达时间" style="width: 100%"/>
        </el-form-item>
        <el-form-item :label="$t('rode.start')" prop="routeLeave">
          <el-select v-model="addtemp.routeLeave" class="filter-item" placeholder="请选择出发地点" style="width: 100%">
            <el-option v-for="(item,idx) in location"  :key="idx" :label="item.locationName" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('rode.end')" prop="routeArrival">
          <el-select v-model="addtemp.routeArrival" class="filter-item" placeholder="请选择到达地点" style="width: 100%">
            <el-option v-for="(item,idx) in location"  :key="idx" :label="item.locationName" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('rode.task')" prop="routeStatus">
          <el-select v-model="addtemp.routeStatus" class="filter-item" placeholder="请选择任务状态" style="width: 100%">
            <el-option v-for="(item,idx) in routeStatus"  :key="idx" :label="item.msg" :value="item.status"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormAdd = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary" @click="addData()">
          {{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { fetchRodeList,updateNews,createNews,fetchTaskType,fetchLocation,setLocationStatus } from '@/api/rode'
  import waves from '@/directive/waves' // waves directive
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination

  export default {
    name: "index",
    components: { Pagination },
    directives: { waves },
    data(){
      return{
        list:[],
        dialogFormVisible: false,
        dialogFormAdd:false,
        dialogStatus: '',
        listLoading:false,
        total: 0,
        pageData:[],
        allTaskType:[], //存放任务类型
        location:[], //存放城市
        routeStatus:[{id:0,status:'t',msg:'使用中'},{id:1,status:'f',msg:'停用'}], //存放路线状态
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        //存放编辑数据
        temp: {
          routeNo:undefined,
          routeName:undefined,
          routeLeave: undefined,
          routeArrival: undefined,
          routeStart: undefined,
          routeEnd:undefined,
          taskTypeId:undefined,
          routeStatus: undefined
        },
        //存放新增数据
        addtemp: {
          routeNo:undefined,
          routeName:undefined,
          routeLeave: undefined,
          routeArrival: undefined,
          routeStart: undefined,
          routeEnd:undefined,
          taskTypeId:undefined,
          isDelete:0,
          routeStatus: undefined
        },
        //存放搜索数据
        listQuery: {
          page: 1,
          limit: 20,
          routeNo:undefined,
          routeName:undefined,
          routeLeave: undefined,
          routeArrival: undefined,
          routeStart: undefined,
          routeEnd:undefined,
          taskTypeId:undefined,
          routeStatus: undefined,
        },
        downloadLoading: false,
        rules: {
          taskType:{
              typeName:[{ required: true, message: '请选择型号', trigger: 'change' }]
          },
          routeName: [
            { required: true, message: '请输入路线名称', trigger: 'blur' }
          ],
          routeLeave: [
            { type: 'date', required: true, message: '请选择出发时间', trigger: 'change' }
          ],
          routeArrival: [
            { type: 'date', required: true, message: '请选择到达时间', trigger: 'change' }
          ],
          routeStart: [
            { required: true, message: '请输入出发地点', trigger: 'blur' }
          ],
          routeEnd: [
            { required: true, message: '请输入到达地点', trigger: 'blur' }
          ],
          routeStatus: [
            { required: true, message: '请输入任务', trigger: 'blur' }
          ],
        },
      }
    },
    mounted(){
      //获取任务类型
      fetchTaskType().then(response =>{
        this.allTaskType = response.data
        // console.log(this.allTaskType)
      });

      //获取地点
      fetchLocation().then(response =>{
        this.location=response.data
        // console.log(this.location)
      });
      this.getList();
    },
    filters:{
      getstatus(s){
        if(s=='t'){
          return '使用中'
        }else {
          return '停用'
        }
      },
      btnStatus(s){
        if(s=='f'){
          return '启用'
        }else {
          return '停用'
        }
      }
    },
    methods:{
      getList() {
        this.listLoading=true;
        //首次挂载列表组件
        fetchRodeList(this.listQuery).then(response => {
          this.pageData = response.data.list
          this.total = response.data.total
          //关闭加载框
          this.listLoading=false;
        })
      },
      //修改路线状态
      changeStatus(row){
        setLocationStatus(row).then(response =>{
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            duration: 2000
          })
          this.getList();
        })
      },

      //弹出编辑模态对话框
      handleUpdate(row) {

        let {routeName,routeLeave,routeArrival,routeStart,routeEnd,taskTypeId,routeStatus}=row;
        this.temp={routeName,routeLeave,routeArrival,routeStart,routeEnd,taskTypeId,routeStatus}
        console.log(this.temp)
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['AddForm'].clearValidate()
        })
      },
      //弹出新增模态对话框
      handleCreate() {
        // this.resetTemp()
        this.dialogFormAdd = true
        this.$nextTick(() => {
          this.$refs['AddForm'].clearValidate()
        })
      },
      //新增
      addData() {
        this.$refs['AddForm'].validate((valid) => {
          if (valid) {
            this.addtemp.routeNo=new Date().getTime();
            createNews(this.addtemp).then(() => {
              // this.pageData.unshift(this.addtemp)
              this.dialogFormAdd = false
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
              this.getList();
            })
          }
        })
      },
      //修改
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.temp)
            console.log(tempData)
            updateNews(tempData).then(() => {
              this.dialogFormVisible = false
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
      handleModifyStatus(row, status) {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        row.status = status
      },
      // handleDelete(row) {
      //   this.$notify({
      //     title: '成功',
      //     message: '删除成功',
      //     type: 'success',
      //     duration: 2000
      //   })
      //   const index = this.pageData.indexOf(row)
      //   this.pageData.splice(index, 1)
      // },

    }
  }
</script>

<style scoped>
.el-table{
  margin-top: 20px;
}
  .el-table-column {
    align:center
  }
</style>
