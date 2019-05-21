<template>
  <div class="app-container">
    <div class="demo-input-size">
      <el-input v-model="listQuery.routeLeave" :placeholder="$t('rode.start')" style="width: 200px;" class="filter-item" @keyup.enter.native="getList" />
      <el-input v-model="listQuery.routeArrival" :placeholder="$t('rode.end')" style="width: 200px;" class="filter-item" @keyup.enter.native="getList" />
      <el-date-picker v-model="listQuery.routeStart" type="date" :placeholder="$t('rode.date1')" @change="getList"/>
      <el-date-picker v-model="listQuery.routeEnd" type="date" :placeholder="$t('rode.date2')" @change="getList"/>
      <el-select v-model="listQuery.taskTypeId" value-key="id" @change="getList" :placeholder="$t('rode.typeId')" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in allTaskType" :key="item.typeName" :label="item.typeName" :value="item.id" />
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

      <el-table-column prop="routeStart" :label="$t('rode.date1')" width="160"></el-table-column>

      <el-table-column prop="routeEnd" :label="$t('rode.date2')" width="160"></el-table-column>

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

          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row)">
            {{ $t('table.stop') }}
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!--编辑弹出窗-->
    <!--<el-dialog :title="$t('rode.edit')" :visible.sync="dialogFormVisible">-->
      <!--<el-form ref="dataForm"  :model="temp" label-position="left" label-width="100px" style="width: 500px; margin-left:50px;">-->

        <!--<el-form-item :label="$t('rode.typeId')" prop="typeId">-->
          <!--<el-select v-model="allTaskType" class="filter-item" placeholder="请选择型号" style="width: 100%">-->
            <!--<el-option v-for="item in allTaskType"  :key="item.typeName" :label="item.typeName" :value="item.id"/>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="$t('rode.rodename')"  prop="rodename">-->
          <!--<el-input v-model="temp.rodename" style="width: 100%"/>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="$t('rode.date1')" prop="date">-->
          <!--<el-date-picker v-model="temp.date1" type="date" value-format="yyyy-MM-dd" placeholder="请选择出发时间" style="width: 100%"/>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="$t('rode.date2')" prop="date">-->
          <!--<el-date-picker v-model="temp.date2" type="date" value-format="yyyy-MM-dd" placeholder="请选择到达时间" style="width: 100%"/>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="$t('rode.start')" prop="title">-->
          <!--<el-input v-model="temp.start" style="width: 100%"/>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="$t('rode.end')" prop="title">-->
          <!--<el-input v-model="temp.end" style="width: 100%"/>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="$t('rode.task')">-->
          <!--<el-input v-model="temp.task" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" style="width: 100%"/>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
      <!--<div slot="footer" class="dialog-footer">-->
        <!--<el-button @click="dialogFormVisible = false">-->
          <!--{{ $t('table.cancel') }}-->
        <!--</el-button>-->
        <!--<el-button type="primary" @click="updateData()">-->
          <!--{{ $t('table.confirm') }}-->
        <!--</el-button>-->
      <!--</div>-->
    <!--</el-dialog>-->
    <!--新增弹出窗-->
    <el-dialog :title="$t('rode.add')" :visible.sync="dialogFormAdd">
      <el-form ref="AddForm" :model="addtemp" :rules="rules" label-position="left" label-width="100px" style="width: 500px; margin-left:50px;">
        <el-form-item  :label="$t('rode.typeId')" prop="typeId.typeName">
          <el-select v-model="addtemp.taskTypeId" class="filter-item" placeholder="请选择类型" style="width: 100%">
            <el-option v-for="item in allTaskType"  :key="item.id" :label="item.typeName" :value="item.typeName"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('rode.rodename')"  prop="rodename">
            <el-input v-model="addtemp.routeName" style="width: 100%"/>
        </el-form-item>
        <el-form-item :label="$t('rode.date1')"  prop="date1">
          <el-date-picker v-model="addtemp.routeStart" type="date"  placeholder="请选择出发时间" style="width: 100%"/>
        </el-form-item>
        <el-form-item :label="$t('rode.date2')"  prop="date2">
          <el-date-picker v-model="addtemp.routeEnd" type="date"  placeholder="请选择到达时间" style="width: 100%"/>
        </el-form-item>
        <el-form-item :label="$t('rode.start')"  prop="start">
          <div class="block">
            <el-cascader
              expand-trigger="hover"
              :options="options"
              v-model="addtemp.routeLeave"
              style="width: 100%">
            </el-cascader>
          </div>
        </el-form-item>
        <el-form-item :label="$t('rode.end')"  prop="start">
          <div class="block" >
            <el-cascader
              expand-trigger="hover"
              :options="options"
              v-model="addtemp.routeArrival"
              style="width: 100%">
            </el-cascader>
          </div>
        </el-form-item>
        <el-form-item :label="$t('rode.task')"  prop="task">
          <el-input v-model="addtemp.taskTypeId" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="请输入任务" style="width: 100%"/>
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
  import { fetchRodeList,updateNews,createNews,fetchTaskType} from '@/api/rode'
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
        allTaskType:[],
        // typeId:[{id:'1',typeName:'消防型'},{id:'2',typeName:'物流型'},{id:'3',typeName:'医疗型'},{id:'4',typeName:'天眼型'}],
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        options: [{
          value: '福建省',
          label: '福建省',
          children: [{
            value: '福州',
            label: '福州',
            children: [{
              value: '仓山区',
              label: '仓山区'
            }, {
              value: '晋安区',
              label: '晋安区'
            }, {
              value: '台江区',
              label: '台江区'
            }, {
              value: '鼓楼区',
              label: '鼓楼区'
            },{
              value: '马尾区',
              label: '马尾区'
            }]
          }, {
            value: '厦门',
            label: '厦门',
            children: [{
              value: '集美区',
              label: '集美区'
            }, {
              value: '湖里区',
              label: '湖里区'
            }, {
                value: '思明区',
                label: '思明区'
              }, {
              value: '同安区',
              label: '同安区'
            }, {
              value: '海沧区',
              label: '海沧区'
            }]
          }]
        }],
        temp: {
          routeNo:undefined,
          routeName:undefined,
          routeLeave: undefined,
          routeArrival: undefined,
          routeStart: undefined,
          routeEnd:undefined,
          taskTypeId:undefined,
          routeStatus: undefined
          // typeId: [{id:'',typeName:''}]
        },
        addtemp: {
          routeNo:undefined,
          routeName:undefined,
          routeLeave: undefined,
          routeArrival: undefined,
          routeStart: undefined,
          routeEnd:undefined,
          taskTypeId:undefined,
          routeStatus: undefined
        },
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
          typeId:{
              typeName:[{ required: true, message: '请选择型号', trigger: 'change' }]
          },
          rodename: [
            { required: true, message: '请输入路线名称', trigger: 'blur' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择出发时间', trigger: 'change' }
          ],
            date2: [
            { type: 'date', required: true, message: '请选择到达时间', trigger: 'change' }
          ],
          start: [
            { required: true, message: '请输入出发地点', trigger: 'blur' }
          ],
          end: [
            { required: true, message: '请输入到达地点', trigger: 'blur' }
          ],
          task: [
            { required: true, message: '请输入任务', trigger: 'blur' }
          ],
        },
      }
    },
    mounted(){
      this.getList();
    },
    filters:{
      getstatus(s){
        if(s=='t'){
          return '使用中'
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

        //获取任务类型
        fetchTaskType().then(response =>{
          this.taskType = response.data
          console.log(this.taskType)
        })
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
          this.$refs['AddForm'].clearValidate()
        })
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
            let time1=this.addtemp.date1;
            let time2=this.addtemp.date2;
            let m1=time1.getMonth()+1
            let m2=time2.getMonth()+1
            let d1=time1.getDate()
            let d2=time2.getDate()
            if(d1<9){
              d1='0'+d1;
            }
            if(d2<9){
              d2='0'+d2;
            }
              this.addtemp.id = parseInt(Math.random() * 100) + 1024 // mock a id
              this.addtemp.date1=time1.getFullYear()+"-"+0+m1+"-"+d1
              this.addtemp.date2=time2.getFullYear()+"-"+0+m2+"-"+d2
            createNews(this.addtemp).then(() => {
              this.pageData.unshift(this.addtemp)
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
          rodename:undefined,
          date1: new Date(),
          date2: new Date(),
          start: [],
          end:[],
          task:'',
          typeId: [],
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
