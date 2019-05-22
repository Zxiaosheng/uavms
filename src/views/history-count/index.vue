<template>
  <div class="app-container">
    <div class="demo-input-size">
      <!--<div class="demo-input-suffix">-->
      <!--<div class="filter-container">-->
      <el-select v-model="listQuery.taskStatus" value-key="id" @change="getList" :placeholder="$t('historycount.result')" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in result" :key="item.typeName" :label="item.typeName" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.taskType" value-key="id" @change="getList" :placeholder="$t('historycount.typeId')" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in taskType" :key="item.typeName" :label="item.typeName" :value="item.id" />
      </el-select>
      <el-date-picker v-model="listQuery.taskStartTime" type="datetime"  value-format="yyyy-MM-dd HH:mm:ss" :placeholder="$t('historycount.date')"  style="width: 230px"/>
      <el-input v-model="listQuery.route.routeName" :placeholder="$t('historycount.location')" style="width: 200px;" class="filter-item" @keyup.enter.native="getList" />

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList">
        {{ $t('table.search') }}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-plus" @click="handleCreate">
        {{ $t('table.add') }}
      </el-button>
    </div>

    <el-table :data="list" v-loading="listLoading" border  style="width: 100%;text-align: center;margin-top: 20px"  :header-cell-style="{
    'background-color': '#fafafa'}">

      <el-table-column prop="id" align="center" :label="$t('historycount.id')"sortable width="150"></el-table-column>

      <el-table-column prop="taskType.typeName" align="center" :label="$t('historycount.typeId')" sortable  width="140"></el-table-column>

      <el-table-column prop="taskStartTime" align="center" :label="$t('historycount.date')"sortable width="250"></el-table-column>

      <el-table-column prop="route.routeName" align="center" :label="$t('historycount.location')" width="200"></el-table-column>

      <el-table-column prop="taskStatus" align="center" :label="$t('historycount.result')" sortable width="200">
        <template slot-scope="{row}">
          <el-tag :type="row.taskStatus|taskStatusFilter">{{ row.taskStatus|taskStatusValFilter }}</el-tag>
        </template>
        <!--<template slot-scope="{row}">-->
          <!--<el-tag :type="row.taskStatus|taskStatusFilter">{{ row.taskStatus|taskStatusValFilter }}</el-tag>-->
        <!--</template>-->
      </el-table-column>

      <el-table-column :label="$t('table.actions')" align="center"  class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            {{ $t('table.edit') }}
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row)">
            {{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!--编辑弹出窗-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm"  :model="temp"  :rules="rules" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">

        <el-form-item :label="$t('historycount.result')" prop="result.typeName">
          <el-select v-model="temp.result.typeName" class="filter-item" placeholder="Please select" style="width:100%">
            <el-option v-for="item in result"  :key="item.id" :label="item.typeName" :value="item.typeName"/>
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('historycount.date')" prop="date">
          <el-date-picker  v-model="temp.date" value-format="yyyy-MM-dd" type="date" placeholder="Please pick a date" style="width:100%"/>
        </el-form-item>

        <el-form-item :label="$t('historycount.location')" prop="location">
          <el-input v-model="temp.location" style="width:100%"/>
        </el-form-item>
        <el-form-item :label="$t('historycount.typeId')" prop="typeId.typeName">
          <el-select v-model="temp.typeId.typeName" class="filter-item" placeholder="Please select" style="width:100%">
            <el-option v-for="item in typeId"  :key="item.id" :label="item.typeName" :value="item.typeName"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          <!--<el-button @click="resetForm('dataForm')">-->
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary" @click="updateData()">
          {{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>
    <!--新增弹出窗-->
    <el-dialog title="新增" :visible.sync="dialogFormAdd">
      <el-form ref="AddForm"  :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item  :label="$t('historycount.typeId')" prop="typeId.typeName">
          <el-select v-model="temp.typeId.typeName" class="filter-item" placeholder="Please select" style="width:100%">
            <el-option v-for="item in typeId"  :key="item.id" :label="item.typeName" :value="item.typeName"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('historycount.date')"  prop="date">
          <el-date-picker v-model="temp.date" value-format="yyyy-MM-dd" style="width:100%" type="date" placeholder="Please pick a date" />
        </el-form-item>
        <el-form-item :label="$t('historycount.location')"  prop="location">
          <el-input v-model="temp.location" style="width:100%" />
        </el-form-item>
        <el-form-item  :label="$t('historycount.result')" prop="result.typeName">
          <el-select v-model="temp.result.typeName" class="filter-item" style="width:100%" placeholder="Please select">
            <el-option v-for="item in result"  :key="item.id" :label="item.typeName" :value="item.typeName"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormAdd = false">
          <!--<el-button @click="resetForm('AddForm')">-->
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
  import { fetchhistoryList,updatehistory,createhistory } from '@/api/history-count'
  import {fetchTaskType} from '@/api/rode'
  import waves from '@/directive/waves' // waves directive
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination

  export default {
    name: "index",
    components: { Pagination },
    directives: { waves },
    data(){
      return{
        rules: {
         typeId:{
            typeName:[{ required: true, message: '请选择型号', trigger: 'change' }]
          },
          date: [
            { required: true, message: '请选择日期', trigger: 'change' }
          ],
          result:{
            typeName:[{ required: true, message: '请选择', trigger: 'change' }]
          },
          location: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
        },
        list:[],
        taskType:[],
        dialogFormVisible: false,
        dialogFormAdd:false,
        dialogStatus: '',
        listLoading:false,
        total: 0,
        pageData:[],
        typeId:[],
//        typeId:[{id:'1',typeName:'消防'},{id:'2',typeName:'医疗'},{id:'3',typeName:'交通'},{id:'4',typeName:'物流'},{id:'5',typeName:'巡警'},{id:'6',typeName:'其它'}],
        result:[{id:'a',typeName:'未执行'},{id:'b',typeName:'执行中'},{id:'c',typeName:'已完成'},{id:'d',typeName:'已取消'},{id:'e',typeName:'超时完成'}],
        textMap: {
          update: '编辑',
          create: '新增'
        },
        temp: {
          id:'',
          date: new Date(),
          location: '',
//          result:'',
          typeId: [{id:1,typeName:'消防型'}],
          result: [{id:1,typeName:'Success'}]
        },
        listQuery: {
          page: 1,
          limit: 20,
//          id:undefined,
//          date:undefined,
//          location: undefined,
//          type: undefined,
//          type1: undefined,
          taskStatus:undefined,
          taskStartTime:undefined,
          taskType:undefined,
          route:{routeName:''}
        },
        downloadLoading: false
      }
    },
    filters:{
      taskStatusValFilter(value){
        const statusMap = {
          a:'未执行',
          b:'执行中',
          c:'已完成',
          d:'已取消',
          e:'超时完成'
        };
        return statusMap[value]
      },
      taskStatusFilter(status){
        const statusMap = {
          a:'success',
          b:'danger',
          c:'warning',
          d:'primary',
          e:'info'
        };
        return statusMap[status];
      },
    },
    mounted(){
     this.getList();
    },
    methods:{
//      getList() {
//        this.listLoading = true;
//        let{page,limit,date,location,type,type1}=this.listQuery;
//
//        if(typeof date!='undefined' && date){
//          date=new Date(date)
//        }
//        let filterData=this.list.filter(item=>{
//          let idate=new Date(Date.parse(item.date))
//          if (date && idate.getTime() != date.getTime()) return false
//          if (type && item.typeId.id !== type) return false
//          if (type1 && item.result.id !== type1) return false
//          if (location && item.location.indexOf(location) < 0) return false
//          return true
//        })
//
//        this.pageData=filterData.filter((item,index)=>{
//          return index<page*limit && index>=limit*(page-1)
//        });
//        this.listLoading = false;
//      },
      getList(){
        this.listLoading=true;
        //首次挂载列表组件
        fetchhistoryList(this.listQuery).then(response => {
          this.list = response.data.list
          console.log(this.list)
          this.total = response.data.total
          //关闭加载框
          this.listLoading=false;
        })
        fetchTaskType().then(response =>{
          this.taskType = response.data
//          console.log(this.taskType)
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row) // copy obj
        this.temp.timestamp = new Date(this.temp.timestamp)
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      resetTemp() {
        this.temp = {
          id:'',
          date: new Date(),
          location: '',
//          result:'',
          typeId: [{id:1,typeName:'消防型'}],
          result: [{id:1,typeName:'Success'}]
        }
      },
      handleCreate() {
        this.resetTemp()
        this.dialogFormAdd = true
        this.$nextTick(() => {
          this.$refs['AddForm'].clearValidate()
        })
      },
      addData() {
        this.$refs['AddForm'].validate((valid) => {
          if (valid) {
            let time=new Date();
            this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
            this.temp.date=time.getFullYear()+"-"+time.getMonth()+1+"-"+time.getDay()
            createhistory(this.temp).then(() => {
              this.pageData.unshift(this.temp)
              this.dialogFormAdd = false
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
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.temp)
            tempData.timestamp = +new Date(tempData.timestamp)
            // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
            updatehistory(tempData).then(() => {
              for (const v of this.pageData) {
                if (v.id === this.temp.id) {
                  const index = this.pageData.indexOf(v)
                  this.pageData.splice(index, 1, this.temp)
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
      handleModifyStatus(row, status) {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        row.status = status
      },
      handleDelete(row) {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        const index = this.list.indexOf(row)
        this.list.splice(index, 1)
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.dialogFormAdd = false
        this.dialogFormVisible = false
      }
    }
  }
</script>

<style scoped>

</style>
