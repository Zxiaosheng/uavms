<template>
  <div class="app-container">
    <div class="demo-input-size">
      <el-date-picker v-model="listQuery.createTimeStart" type="date" placeholder="起始日期" style="width: 130px"/>
      <el-date-picker v-model="listQuery.createTimeEnd" type="date" placeholder="截止日期" style="width: 130px"/>
      <el-select v-model="listQuery.planType" value-key="id" @change="getList" placeholder="无人机类型" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in planType" :key="item.typeName" :label="item.typeName" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.troubleType" value-key="id" @change="getList" placeholder="故障类型" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in troubleType" :key="item.typeName" :label="item.typeName" :value="item.id" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加
      </el-button>
    </div>

    <el-table :data="pageData" v-loading="listLoading" border fit  highlight-current-row style="width: 100%;magin-top:20px;text-align: center">

      <el-table-column prop="date" label="日期"  align="center" width="100"></el-table-column>

      <el-table-column prop="planType.typeName" label="无人机类型" width="120"></el-table-column>

      <el-table-column prop="troubleType.typeName" label="故障类型" width="100"></el-table-column>

      <el-table-column prop="troubleCount" label="故障次数" width="80"></el-table-column>

      <el-table-column prop="troubleReason" label="故障原因"></el-table-column>

      <el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>

          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!--编辑弹出窗-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm"  :model="temp" label-position="left" label-width="90px" style="width: 400px; margin-left:50px;">

        <el-form-item label="日期" prop="date">
          <el-date-picker v-model="temp.date" type="date" value-format="yyyy-MM-dd" placeholder="Please pick a date" />
        </el-form-item>
        <el-form-item label="无人机类型" prop="planType.typeName">
          <el-select v-model="temp.planType.typeName" class="filter-item" placeholder="Please select">
            <el-option v-for="item in planType"  :key="item.id" :label="item.typeName" :value="item.typeName"/>
          </el-select>
        </el-form-item>
        <el-form-item label="故障类型" prop="troubleType.typeName">
          <el-select v-model="temp.troubleType.typeName" class="filter-item" placeholder="Please select">
            <el-option v-for="item in troubleType"  :key="item.id" :label="item.typeName" :value="item.typeName"/>
          </el-select>
        </el-form-item>
        <el-form-item label="故障次数" prop="troubleCount">
          <el-input v-model="temp.troubleCount" />
        </el-form-item>
        <el-form-item label="故障原因" prop="troubleReason">
          <el-input v-model="temp.troubleReason" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="updateData()">
          确定
        </el-button>
      </div>
    </el-dialog>

    <!--新增弹出窗-->
    <el-dialog title="新增" :visible.sync="dialogFormAdd">
      <el-form ref="AddForm"   :model="addtemp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="日期"  prop="date">
          <el-date-picker v-model="addtemp.date" type="date"  placeholder="Please pick a date" />
        </el-form-item>
        <el-form-item  label="无人机类型" prop="planType.typeName">
          <el-select v-model="addtemp.planType.typeName" class="filter-item" placeholder="请选择">
            <el-option v-for="item in planType"  :key="item.id" :label="item.typeName" :value="item.typeName"/>
          </el-select>
        </el-form-item>
        <el-form-item  label="故障类型" prop="troubleType.typeName">
          <el-select v-model="addtemp.troubleType.typeName" class="filter-item" placeholder="请选择">
            <el-option v-for="item in troubleType"  :key="item.id" :label="item.typeName" :value="item.typeName"/>
          </el-select>
        </el-form-item>
        <el-form-item label="故障次数"  prop="troubleCount">
          <el-input v-model="addtemp.troubleCount" />
        </el-form-item>
        <el-form-item label="故障原因"  prop="troubleReason">
          <el-input v-model="addtemp.troubleReason" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormAdd = false">
          取消
        </el-button>
        <el-button type="primary" @click="addData()">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { fetchNewsList,updateNews,createNews } from '@/api/trouble'
  import waves from '@/directive/waves' // waves directive
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination

  export default {
    name: "index",
    components: { Pagination },
    directives: { waves },
    filters: {

    },
    data(){
      return{
        list:[],
        dialogFormVisible: false,
        dialogFormAdd:false,
        dialogStatus: '',
        listLoading:false,
        total: 0,
        pageData:[],
        planType: [{id:'1',typeName:'救援无人机'},{id:'2',typeName:'测绘无人机'},{id:'3',typeName:'拍摄无人机'},{id:'4',typeName:'交通无人机'}],
        troubleType: [{id:'1',typeName:'电机故障'},{id:'2',typeName:'电源故障'},{id:'3',typeName:'机翼故障'},{id:'4',typeName:'摄像头故障'},{id:'5',typeName:'底座故障'}],
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        temp: {
          id:'',
          date: new Date(),
          planType: [{id:'1',typeName:'救援无人机'},{id:'2',typeName:'测绘无人机'},{id:'3',typeName:'拍摄无人机'},{id:'4',typeName:'交通无人机'}],
          troubleType: [{id:'1',typeName:'电机故障'},{id:'2',typeName:'电源故障'},{id:'3',typeName:'机翼故障'},{id:'4',typeName:'摄像头故障'},{id:'5',typeName:'底座故障'}],
          troubleCount: '',
          troubleReason:''
        },
        addtemp: {
          id:undefined,
          date: new Date(),
          planType: [{id:'1',typeName:'救援无人机'},{id:'2',typeName:'测绘无人机'},{id:'3',typeName:'拍摄无人机'},{id:'4',typeName:'交通无人机'}],
          troubleType: [{id:'1',typeName:'电机故障'},{id:'2',typeName:'电源故障'},{id:'3',typeName:'机翼故障'},{id:'4',typeName:'摄像头故障'},{id:'5',typeName:'底座故障'}],
          troubleCount: '',
          troubleReason: '',
        },
        listQuery: {
          page: 1,
          limit: 20,
          date:undefined,
          troubleCount: undefined,
          troubleReason: undefined,
          createTimeStart: undefined,
          createTimeEnd: undefined
        },
        downloadLoading: false
      }
    },
    mounted(){
      this.listLoading=true;
      //首次挂载列表组件
      fetchNewsList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.getList();
        //关闭加载框
        this.listLoading=false;
      })
    },
    methods:{
      getList() {
        this.listLoading = true;
        let{page,limit,date,planType,troubleType,troubleCount,troubleReason,createTimeStart,createTimeEnd}=this.listQuery;
        date=new Date(date)
        let fiterData=this.list.filter(item=>{
          let idate = new Date(Date.parse(item.date))
          if (date && idate < date) return false
          if (planType && item.planType.id !== planType) return false
          if (troubleType && item.troubleType.id !== troubleType) return false
          if (troubleCount && item.troubleCount.indexOf(troubleCount) < 0) return false
          if (troubleReason && item.troubleReason.indexOf(troubleReason) < 0) return false
          if (createTimeStart && new Date(createTimeStart) > new Date(item.date))
            return false
          if (createTimeEnd && new Date(createTimeEnd) < new Date(item.date))
            return false
          return true
        })

        this.pageData=fiterData.filter((item,index)=>{
          return index<page*limit && index>=limit*(page-1)
        });
        this.listLoading = false;
        this.total=this.pageData.length
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row) // copy obj
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      handleCreate() {
        this.resetTemp()
        this.dialogFormAdd = true
      },
      addData() {
        this.$refs['AddForm'].validate((valid) => {
          if (valid) {
            let time1 = this.addtemp.date
            let m1 = time1.getMonth()+1
            let d1 = time1.getDate()
            if(d1<9){
              d1='0'+d1;
            }
            this.addtemp.id = parseInt(Math.random() * 100) + 1024 // mock a id
            this.addtemp.date = time1.getFullYear()+"-"+0+m1+"-"+d1
            createNews(this.addtemp).then(() => {
              this.pageData.unshift(this.addtemp)
              this.dialogFormAdd = false
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
              // this.addtemp.title=''
              // this.addtemp.content=''
              // this.addtemp.read=''
            })
            // this.addtemp=[];
          }
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.temp)
            updateNews(tempData).then(() => {
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
      resetTemp() {
        this.addtemp = {
          id:undefined,
          date: new Date(),
          planType: [],
          troubleType: [],
          troubleCount: '',
          troubleReason: '',
        }
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
      },
      // handleDownload() {
      //   this.downloadLoading = true
      //   import('@/vendor/Export2Excel').then(excel => {
      //     const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
      //     const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
      //     const data = this.formatJson(filterVal, this.list)
      //     excel.export_json_to_excel({
      //       header: tHeader,
      //       data,
      //       filename: 'table-list'
      //     })
      //     this.downloadLoading = false
      //   })
      // },
    }
  }
</script>

<style scoped>
  .el-table{
    margin-top: 20px;
  }
</style>
