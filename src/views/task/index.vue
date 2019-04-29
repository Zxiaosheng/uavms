<template>
  <div class="app-container">
    <!--filter start-->
    <div class="filter-container">
      <el-input v-model="listQuery.taskName" :placeholder="$t('task.taskName')" style="width: 200px;" class="filter-item" @keyup.native.enter="handleFilter" />
      <el-select v-model="listQuery.taskType" :placeholder="$t('task.taskType')" clearable style="width: 120px" class="filter-item">
        <el-option v-for="item in taskTypes" :key="item.typeId" :label="item.typeName+'('+item.typeId+')'" :value="item.typeId" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList">
        {{ $t('table.search') }}
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
      <el-table-column :label="$t('task.taskName')" align="center" width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.taskName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('task.startTime')" align="center" width="140">
      <template slot-scope="scope">
      <span>{{ scope.row.startTime}}</span>
      </template>
      </el-table-column>
      <el-table-column :label="$t('task.endTime')" align="center" width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.endTime}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('task.taskDesc')" align="center" width="240">
        <template slot-scope="scope">
          <span>{{ scope.row.taskDesc }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('task.taskType')" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.taskTypes.typeName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('task.beforeTask')" width="160px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.beforeTask }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('task.afterTask')" width="160px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.afterTask }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('task.parentTask')" align="center" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.parentTask }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('task.head')" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.head }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('task.taskUav')" align="center" width="120">
      <template slot-scope="scope">
      <span>{{ scope.row.taskUavs }}</span>
      </template>
      </el-table-column>
      <el-table-column :label="$t('task.taskStatus')" width="100px" align="center">
        <template slot-scope="{row}">
          <!-- row.status ? 'success' : 'info'-->
          <el-tag :type="row.status|tagTypeFilter">{{ row.status|outlineFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" :label="$t('table.actions')" align="center" width="312" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            {{ $t('table.edit') }}
          </el-button>
          <el-button v-if="row.status!='published'" size="mini" type="success" @click="handleModifyStatus(row,'published')">
            {{ $t('table.publish') }}
          </el-button>
          <el-button v-if="row.status!='draft'" size="mini" @click="handleModifyStatus(row,'draft')">
            {{ $t('table.draft') }}
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleModifyStatus(row,'deleted')">
            {{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--table end-->

    <!--page start-->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page"
                :limit.sync="listQuery.limit" @pagination="getList" />
    <!--page end-->

  </div>
</template>

<script>
import { fetchTasklist } from '@/api/task'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const taskTypes = [
  { typeId: 1, typeName: '消防任务' },
  { typeId: 2, typeName: '医疗任务' },
  { typeId: 3, typeName: '交通任务' },
  { typeId: 4, typeName: '物流任务' },
  { typeId: 5, typeName: '巡警任务' },
  { typeId: 6, typeName: '其他任务' }
];

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
        taskName: undefined
      },
      taskTypes
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
      let { page, limit, taskType, taskName } = this.listQuery
      // 过滤查询结果集
      let filterData = this.totalData.filter(item => {
        if (taskName && item.taskName.indexOf(taskName) < 0) return false
        if (taskType && item.taskType.taskId !== taskType) return false
        return true
      })
      // 分页过滤
      this.pageList = filterData
        .filter((item, index) => index < page * limit && index >= limit * (page - 1))
      console.log(this.pageList)
    },
    handleFilter() {
      this.getList()
    }
  },
  filters:{
    outlineFilter(value){
      return value ?'在线':'离线'
    },
    tagTypeFilter(value){
      return value ? 'success' : 'info'
    },
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      };
      return statusMap[status]
    },
  }
}
</script>

<style scoped>

</style>
