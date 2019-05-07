<template>
  <div class="app-container">
    <div class="demo-input-size">
    <!--<div class="demo-input-suffix">-->
      <!--<div class="filter-container">-->
      <el-select v-model="listQuery.type" value-key="id" @change="getList" :placeholder="$t('historycount.typeId')" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in typeId" :key="item.typeName" :label="item.typeName" :value="item.id" />
      </el-select>
      <el-date-picker v-model="listQuery.date" type="date" value-format="yyyy-MM-dd" :placeholder="$t('historycount.date')"  style="width: 230px"/>
      <el-input v-model="listQuery.location" :placeholder="$t('historycount.location')" style="width: 200px;" class="filter-item" @keyup.enter.native="getList" />
      <!--<el-select v-model="listQuery.type1" value-key="id" @change="getList" :placeholder="$t('historycount.result')" clearable class="filter-item" style="width: 130px">-->
        <!--<el-option v-for="item in result" :key="item.typeName" :label="item.typeName" :value="item.id" />-->
      <!--</el-select>-->
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList">
        {{ $t('table.search') }}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        {{ $t('table.add') }}
      </el-button>
    </div>
    <el-table :data="pageData" v-loading="listLoading" border  style="width: 100%;text-align: center;margin-top: 20px">

      <el-table-column prop="id" align="center" :label="$t('historycount.id')"sortable width="150"></el-table-column>

      <el-table-column prop="typeId.typeName" align="center" :label="$t('historycount.typeId')" sortable  width="140"></el-table-column>

      <el-table-column prop="date" align="center" :label="$t('historycount.date')"sortable width="150"></el-table-column>

      <el-table-column prop="location" align="center" :label="$t('historycount.location')" width="200"></el-table-column>

      <!--<el-table-column prop="result" align="center" :label="$t('historycount.result')" sortable width="200">-->
        <!--<template slot-scope="scope">-->
          <!--<el-tag :type="scope.row.result=='Success'?'success':'danger'">{{scope.row.result}}</el-tag>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column prop="result.typeName" align="center" :label="$t('historycount.result')" sortable  width="200">
        <template slot-scope="scope">
          <el-tag :type="scope.row.result.typeName=='Success'?'success':'danger'">{{scope.row.result.typeName}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary"  @click="handleUpdate(row)">
            {{ $t('table.edit') }}
          </el-button>
          <el-button v-if="row.status!='deleted'"  type="danger" @click="handleDelete(row)">
            {{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!--编辑弹出窗-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm"  :model="temp"  :rules="rules" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">

        <el-form-item :label="$t('historycount.result')" prop="result">
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
        <el-form-item :label="$t('historycount.typeId')" prop="typeId">
          <el-select v-model="temp.typeId.typeName" class="filter-item" placeholder="Please select" style="width:100%">
            <el-option v-for="item in typeId"  :key="item.id" :label="item.typeName" :value="item.typeName"/>
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
    <el-dialog title="新增" :visible.sync="dialogFormAdd">
      <el-form ref="AddForm"  :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item  :label="$t('historycount.typeId')" prop="typeId">
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
        <!--<el-form-item :label="$t('historycount.result')" >-->
          <!--<el-input v-model="temp.result" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />-->
        <!--</el-form-item>-->
        <el-form-item  :label="$t('historycount.result')" prop="result">
          <el-select v-model="temp.result.typeName" class="filter-item" style="width:100%" placeholder="Please select">
            <el-option v-for="item in result"  :key="item.id" :label="item.typeName" :value="item.typeName"/>
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
  import { fetchhistoryList,updatehistory,createhistory } from '@/api/history-count'
  import waves from '@/directive/waves' // waves directive
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination

  export default {
    name: "index",
    components: { Pagination },
    directives: { waves },
    data(){
      return{
        rules: {
          typeId: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          date: [
            { required: true, message: '请选择日期', trigger: 'change' }
          ],
          result: [
            {required: true, message: '请选择', trigger: 'change' }
          ],
          location: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
        },

        list:[],
        dialogFormVisible: false,
        dialogFormAdd:false,
        dialogStatus: '',
        listLoading:false,
        total: 0,
        pageData:[],
        typeId:[{id:'1',typeName:'消防型'},{id:'2',typeName:'物流型'},{id:'3',typeName:'医疗型'},{id:'4',typeName:'天眼型'},{id:'5',typeName:'交通型'},{id:'6',typeName:'其它型'}],
        result:[{id:'1',typeName:'Success'},{id:'2',typeName:'Failure'}],
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
          id:undefined,
          date:undefined,
          location: undefined,
//          result:undefined,
          type: undefined,
          type1: undefined,

        },
        downloadLoading: false
      }
    },
    mounted(){
      this.listLoading=true;
      //首次挂载列表组件
      fetchhistoryList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.getList();
        //关闭加载框
        this.listLoading=false;
      })
    },
    methods:{
      formatDate (val) {
        const date = new Date(val);
        const year = date.getFullYear();
        const month = date.getMonth() > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
        const day = date.getDate() > 9 ? date.getDate() + 1 : `0${date.getDate() + 1}`;
        return `${year}-${month}-${day}`;
        // console.log(val);
      },
      getList() {
        this.listLoading = true;
        let{page,limit,date,location,type,type1}=this.listQuery;

        if(typeof date!='undefined'){
          date=new Date(date)
        }
        let filterData=this.list.filter(item=>{
          let idate=new Date(Date.parse(item.date))

          if (date && idate.getTime() != date.getTime()) return false
          if (type && item.typeId.id !== type) return false
          if (location && item.location.indexOf(location) < 0) return false
          return true
        })

        this.pageData=filterData.filter((item,index)=>{
          return index<page*limit && index>=limit*(page-1)
        });
        this.listLoading = false;
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
        // this.$nextTick(() => {
        //   this.$refs['dataForm'].clearValidate()
        // })
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
        const index = this.pageData.indexOf(row)
        this.pageData.splice(index, 1)
      }
    }
  }
</script>

<style scoped>

</style>
