<template>
  <div class="app-container">
    <div class="demo-input-size">
      <el-input v-model="listQuery.start" :placeholder="$t('flight.start')" style="width: 200px;" class="filter-item" @keyup.enter.native="getList" />
      <el-input v-model="listQuery.end" :placeholder="$t('flight.end')" style="width: 200px;" class="filter-item" @keyup.enter.native="getList" />
      <el-date-picker v-model="listQuery.date1" type="date" :placeholder="$t('flight.date1')" />
      <el-date-picker v-model="listQuery.date2" type="date" :placeholder="$t('flight.date2')" />
      <el-select v-model="listQuery.type" value-key="id" :placeholder="$t('flight.typeId')" clearable class="filter-item" style="width: 130px" @change="getList">
        <el-option v-for="item in typeId" :key="item.typeName" :label="item.typeName" :value="item.id" />
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
    <el-table v-loading="listLoading" :data="pageData" border fit highlight-current-row style="width: 100%;magin-top:20px;text-align: center">

      <el-table-column prop="id" :label="$t('flight.id')" sortable align="center" width="150" />

      <el-table-column prop="typeId.typeName" :label="$t('flight.typeId')" align="center" width="133" />

      <el-table-column prop="date1" :label="$t('flight.date1')" sortable align="center" width="150" />

      <el-table-column prop="date2" :label="$t('flight.date2')" sortable align="center" width="150" />

      <el-table-column prop="start" :label="$t('flight.start')" align="center" width="150" />

      <el-table-column prop="end" :label="$t('flight.end')" align="center" width="150" />

      <el-table-column :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            {{ $t('table.edit') }}
          </el-button>
          <!--<el-button v-if="row.status!='published'" size="mini" type="success" @click="handleModifyStatus(row,'published')">-->
          <!--{{ $t('table.publish') }}-->
          <!--</el-button>-->
          <!--<el-button v-if="row.status!='draft'" size="mini" @click="handleModifyStatus(row,'draft')">-->
          <!--{{ $t('table.draft') }}-->
          <!--</el-button>-->
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row)">
            {{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!--编辑弹出窗-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <!--<el-form-item :label="$t('flight.id')">
          <el-input v-model="temp.id" placeholder="Please input" />
        </el-form-item>-->
        <el-form-item :label="$t('flight.typeId')" prop="typeId">
          <el-select v-model="temp.typeId.typeName" class="filter-item" placeholder="Please select">
            <el-option v-for="item in typeId" :key="item.id" :label="item.typeName" :value="item.typeName" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('flight.date1')" prop="date">
          <el-date-picker v-model="temp.date1" type="date" value-format="yyyy-MM-dd" placeholder="Please pick a date" />
        </el-form-item>
        <el-form-item :label="$t('flight.date2')" prop="date">
          <el-date-picker v-model="temp.date2" type="date" value-format="yyyy-MM-dd" placeholder="Please pick a date" />
        </el-form-item>
        <el-form-item :label="$t('flight.start')" prop="title">
          <el-input v-model="temp.start" />
        </el-form-item>
        <el-form-item :label="$t('flight.end')" prop="title">
          <el-input v-model="temp.end" />
        </el-form-item>
        <!--<el-form-item :label="$t('flight.task')">-->
        <!--<el-input v-model="temp.task" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />-->
        <!--</el-form-item>-->
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
      <el-form ref="AddForm" :model="addtemp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <!--<el-form-item :label="$t('flight.id')" prop="id">
          <el-input v-model="addtemp.id" placeholder="Please input" />
        </el-form-item>-->
        <el-form-item :label="$t('flight.typeId')" prop="typeId">
          <el-select v-model="addtemp.typeId.typeName" class="filter-item" placeholder="Please select">
            <el-option v-for="item in typeId" :key="item.id" :label="item.typeName" :value="item.typeName" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('flight.date1')" prop="date1">
          <el-date-picker v-model="addtemp.date1" type="date" placeholder="Please pick a date" />
        </el-form-item>
        <el-form-item :label="$t('flight.date2')" prop="date2">
          <el-date-picker v-model="addtemp.date2" type="date" placeholder="Please pick a date" />
        </el-form-item>
        <el-form-item :label="$t('flight.start')" prop="start">
          <el-input v-model="addtemp.start" />
        </el-form-item>
        <el-form-item :label="$t('flight.end')" prop="end">
          <el-input v-model="addtemp.end" />
        </el-form-item>
        <!--<el-form-item :label="$t('flight.task')"  prop="task">-->
        <!--<el-input v-model="addtemp.task" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />-->
        <!--</el-form-item>-->
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
import { fetchList, updateNews, createNews } from '@/api/flight'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'Index',
  components: { Pagination },
  directives: { waves },
  filters: {
    // 对热度数据进行过滤，生成不同颜色的标签
    // hotFilter(hot) {
    //   return hot>=200 ? 'danger' : (hot>=100 ? 'waring' : 'success');
    // },
    // typeFilter(type) {
    //   return newsType[type]
    // }
  },
  data() {
    return {
      list: [],
      dialogFormVisible: false,
      dialogFormAdd: false,
      dialogStatus: '',
      listLoading: false,
      total: 0,
      pageData: [],
      typeId: [{ id: '1', typeName: '消防型' }, { id: '2', typeName: '物流型' }, { id: '3', typeName: '医疗型' }, { id: '4', typeName: '天眼型' }],
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      temp: {
        id: '',
        date1: new Date(),
        date2: new Date(),
        start: '',
        end: '',
        // task:'',
        typeId: [{ id: 1, typeName: '消防型' }]
      },
      addtemp: {
        id: '',
        date1: new Date(),
        date2: new Date(),
        start: '',
        end: '',
        // task:'',
        typeId: [{ id: 1, typeName: '消防型' }]
      },
      listQuery: {
        page: 1,
        limit: 20,
        id: undefined,
        date1: undefined,
        date2: undefined,
        start: undefined,
        end: undefined,
        // task:undefined,
        type: undefined

      },
      downloadLoading: false
    }
  },
  mounted() {
    this.listLoading = true
    // 首次挂载列表组件
    fetchList(this.listQuery).then(response => {
      this.list = response.data.items
      this.total = response.data.total
      this.getList()
      // 关闭加载框
      this.listLoading = false
    })
  },
  methods: {
    getList() {
      this.listLoading = true
      const { page, limit, id, date1, date2, start, end, type } = this.listQuery

      const fiterData = this.list.filter(item => {
        if (date1 && item.date1 !== date1) return false
        if (date2 && item.date2 !== date2) return false
        if (type && item.typeId.id !== type) return false
        if (start && item.start.indexOf(start) < 0) return false
        if (end && item.end.indexOf(end) < 0) return false
        if (id && item.id.indexOf(id) < 0) return false
        return true
      })

      this.pageData = fiterData.filter((item, index) => {
        return index < page * limit && index >= limit * (page - 1)
      })
      this.listLoading = false
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      // this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleCreate() {
      this.dialogFormAdd = true
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].clearValidate()
      // })
    },
    addData() {
      this.$refs['AddForm'].validate((valid) => {
        if (valid) {
          const time = new Date()
          this.addtemp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.addtemp.date1 = time.getFullYear() + '-' + time.getMonth() + 1 + '-' + time.getDay()
          this.addtemp.date2 = time.getFullYear() + '-' + time.getMonth() + 1 + '-' + time.getDay()
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
    handleDownload() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
          const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: 'table-list'
          })
          this.downloadLoading = false
        })
    }
  }
}
</script>

<style scoped>
  .el-table{
    margin-top: 20px;
  }
</style>
<!--<template>-->
  <!--<div class="chart-container">-->
    <!--&lt;!&ndash;<chart height="100%" width="100%" />&ndash;&gt;-->
    <!--飞行路线-->
  <!--</div>-->
<!--</template>-->

<!--<script>-->
  <!---->
  <!--export default {-->
    <!--name: "Flight",-->
    <!---->
  <!--}-->
<!--</script>-->

<!--<style scoped>-->
  <!--.chart-container{-->
    <!--position: relative;-->
    <!--width: 100%;-->
    <!--height: calc(100vh - 84px);-->
  <!--}-->
<!--</style>-->
