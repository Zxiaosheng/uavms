<template>
  <div class="app-container">
    <div class="filter-container">
      <!--机型检索输入框-->
      <el-select v-model="listQuery.type" @change="getList" :placeholder="$t('flyArea.type')" clearable class="filter-item" style="width: 110px">
        <el-option v-for="item in flyType" :key="item.id" :label="item.typeName+'('+item.id+')'" :value="item.id" />
      </el-select>
      <!--任务类型检索区-->
      <el-select v-model="listQuery.task" @change="getList" :placeholder="$t('flyArea.task')" clearable class="filter-item" style="width: 110px">
        <el-option v-for="item in flyTask" :key="item.id" :label="item.taskName+'('+item.id+')'" :value="item.id" />
      </el-select>
      <!--飞行区域检索-->
      <el-select v-model="listQuery.area" @change="getList" :placeholder="$t('flyArea.area')" clearable class="filter-item" style="width: 110px">
        <el-option v-for="item in flyArea" :key="item.id" :label="item.areaName+'('+item.id+')'" :value="item.id" />
      </el-select>
      <!--ID排序选择-->
      <el-select v-model="listQuery.sort" @change="getList" style="width: 140px" class="filter-item">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <!--搜索按钮-->
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList">
        {{ $t('table.search') }}
      </el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="resetList">
        {{ $t('flyArea.clear') }}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
      {{ $t('table.add') }}
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        {{ $t('table.export') }}
      </el-button>

    </div>
    <el-table  :data="pageData" border  style="width: 100%" align="center">
      <el-table-column prop="id" align="center" sortable :label="$t('flyArea.id')"  width="100">
      </el-table-column>
      <el-table-column prop="type.typeName" align="center" sortable :label="$t('flyArea.type')"  width="150">
      </el-table-column>
      <el-table-column prop="date" sortable :label="$t('flyArea.date')"  align="center" width="170">

      </el-table-column>
      <el-table-column prop="task.taskName" sortable :label="$t('flyArea.task')" align="center" width="120">
      </el-table-column>
      <el-table-column prop="area.areaName" sortable :label="$t('flyArea.area')" align="center" width="150">
      </el-table-column>
      <el-table-column prop="longitude" :label="$t('flyArea.longitude')" align="center" width="120">
      </el-table-column>
      <el-table-column prop="latitude"  :label="$t('flyArea.latitude')"  align="center" width="120">
      </el-table-column>
      <el-table-column :label="$t('flyArea.actions')" align="center"  class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            {{ $t('flyArea.edit') }}
          </el-button>

          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row)">
            {{ $t('flyArea.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" >
      <el-form ref="dataForm"  :model="temp" :rules="rules" label-position="left" label-width="100px" style="width: 500px; margin-left:50px;">
        <el-form-item :label="$t('flyArea.type')" prop="type.typeName" style="width: 100%" >
          <el-select v-model="temp.type.typeName" class="filter-item" placeholder="Please select" style="width: 100%">
            <el-option v-for="item in flyType" :key="item.id" :label="item.typeName" :value="item.typeName" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('flyArea.date')" prop="date"  required>
          <el-date-picker v-model="temp.date" value-format="yyyy-MM-dd" type="date" placeholder="Please pick a date" style="width: 100%"/>
        </el-form-item>
        <el-form-item :label="$t('flyArea.task')" prop="task.taskName" style="width: 100%" >
          <el-select v-model="temp.task.taskName" class="filter-item" placeholder="Please select" style="width: 100%">
            <el-option v-for="item in flyTask" :key="item.id" :label="item.taskName" :value="item.taskName" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('flyArea.area')" prop="area.areaName" style="width: 100%" >
          <el-select v-model="temp.area.areaName" class="filter-item" placeholder="Please select" style="width: 100%" >
            <el-option v-for="item in flyArea" :key="item.id" :label="item.areaName" :value="item.areaName" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('flyArea.longitude')" prop="longitude" style="width: 100%">
          <el-input v-model.number="temp.longitude"  />
        </el-form-item>
        <el-form-item :label="$t('flyArea.latitude')" prop="latitude" style="width: 100%">
          <el-input v-model.number="temp.latitude" />
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
  </div>
</template>

<script>
  import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
  import {fetchflyAreaList} from '@/api/flyArea'
  import { parseTime } from '@/utils'
  import Pagination from '@/components/Pagination'
  import waves from '@/directive/waves' // waves directive
  const flyType=[{id:1,typeName:'大型机'},{id:2,typeName:'中型机'},{id:3,typeName:'小型机'}]
  const flyTask=[
    {id:1,taskName:'消防'},
    {id:2,taskName:'医疗'},
    {id:3,taskName:'交通'},
    {id:4,taskName:'物流'},
    {id:5,taskName:'巡警'},
    {id:6,taskName:'其他'}
    ]
  const flyArea=[
      {id:1,areaName:'福州'},
      {id:2,areaName:'宁德'},
      {id:3,areaName:'厦门'},
      {id:4,areaName:'莆田'},
      {id:5,areaName:'南平'},
      {id:6,areaName:'三明'},
      {id:7,areaName:'泉州'},
      {id:8,areaName:'漳州'},
      {id:9,areaName:'龙岩'}]
    export default {
      components:{Pagination},
      directives: { waves },
        data() {
            return {
              flyType,
              flyTask,
              flyArea,
              tableData:[],
              listQuery: {
                page: 1,
                limit: 20,
                task: undefined,
                type: undefined,
                area: undefined,
                sort: '+id',
              },
              //前台每页要呈现的数据
              pageData:[],
              total:0,
              sortOptions: [
                { label: 'ID Ascending', key: '+id' },
                { label: 'ID Descending', key: '-id'}
              ],
              textMap: {
                update: '编辑',
                create: '新增'
              },
              dialogFormVisible: false,
              dialogStatus: '',
              temp: {
                id: undefined,
                type: {},
                date:new Date(),
                task:{},
                area:{},
                longitude:'',
                latitude:''
              },
              rules: {
                type: {
                  typeName:[{ required: true, message: 'type is required', trigger: 'change' }]
                },

                task: {
                  taskName:[{ required: true, message: 'task is required', trigger: 'change' }]
                },

                area:{
                  areaName:[{ required: true, message: 'area is required', trigger: 'change' }]
                },

                longitude: [ {required: true, message: 'longitude is required', trigger: 'blur' },
                  { type: 'number', message: 'longitude is number'}
                ],
                latitude: [{required: true, message: 'latitude is required', trigger: 'blur' },
                  { type: 'number', message: 'longitude is number'}]

              },
              downloadLoading: false

            }
        },
      mounted(){
        //首次挂载新闻列表组件时获得所有新闻数据
        fetchflyAreaList({}).then(response=>{
//          console.log(response);
          this.tableData=response.data.items
          //获得数据总数
          this.total=response.data.total;
          //获取第一页
          this.getList();
        })
      },
      methods: {

        //获得每页要显示的数据
       getList() {
          let {page, limit, task, sort, type,area} = this.listQuery;
          //过滤查询结果集（先过滤，再分页）
          let filterData = this.tableData.filter(item => {
            if (task && item.task.id!=task) return false
            if (type && item.type.id != type) return false
            if (area && item.area.id != area) return false
            return true
          })
          //排序
          if(sort=='-id')
            filterData=filterData.reverse()
          //从总数据中过滤出当前页要显示的数据集
          this.pageData = filterData.filter((item, index) =>
            index < page * limit && index >= limit * (page - 1)
          )
        },
        handleDelete(row) {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          const index = this.pageData.indexOf(row);
          this.pageData.splice(index, 1);
        },
        handleUpdate(row) {
          this.temp = Object.assign({}, row) // copy obj
//          this.temp.date = new Date(this.temp.date)
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
//              tempData.date = +new Date(tempData.date) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
              updateArticle(tempData).then(() => {
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
        createData() {
          this.$refs['dataForm'].validate((valid) => {
            if (valid) {
              this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
              createArticle(this.temp).then(() => {
                this.pageData.unshift(this.temp)
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
        resetList(){
          this.listQuery= {
            page: 1,
            limit: 20,
            task: undefined,
            type: undefined,
            area: undefined,
            sort: '+id',
          }
          this.getList();
        },
        resetTemp() {
          this.temp = {
            id: undefined,
            type: {},
            date:'',
//            date:new Date(),
            task:{},
            area:{},
            longitude:'',
            latitude:''
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
        handleDownload() {
          this.downloadLoading = true
          import('@/vendor/Export2Excel').then(excel => {
            const tHeader = ['type', 'date', 'task', 'area', 'longitude','latitude']
            const filterVal = ['type', 'date', 'task', 'area', 'longitude','latitude']
            const data = this.formatJson(filterVal, this.tableData)
            excel.export_json_to_excel({
              header: tHeader,
              data,
              filename: 'table-list'
            })
            this.downloadLoading = false
          })
        },
        formatJson(filterVal, jsonData) {
          return jsonData.map(v => filterVal.map(j => {
            if (j=='type'){
              return v[j].typeName
            }
            if (j=='task'){
              return v[j].taskName
            }
            if (j=='area'){
              return v[j].areaName
            }
            else {
              return v[j]
            }
          }))
        }
      }
    }
</script>

<style>


</style>
