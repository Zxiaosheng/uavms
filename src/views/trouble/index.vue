<template>
  <div class="app-container">
    <div class="demo-input-size">
      <el-date-picker type="date" placeholder="起始时间" />
      <el-date-picker type="date" placeholder="截止时间" />
      <el-select placeholder="救援无人机" style="width: 130px">
        <el-option label="无人机类型"/>
      </el-select>
      <el-select placeholder="电机故障" style="width: 130px">
        <el-option label="故障类型"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList">
        搜索
      </el-button>
    </div>
    <el-table :data="pageData">
      <el-table-column prop="date" label="日期" width="120">
      </el-table-column>
      <el-table-column prop="plantype" label="无人机类型" width="120">
      </el-table-column>
      <el-table-column prop="troubletype" label="故障类型" width="120">
      </el-table-column>
      <el-table-column prop="troubletype" label="故障类型" width="120">
      </el-table-column>
      <el-table-column prop="troubletype" label="故障类型" width="120">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    export default {
      name: "index",
      data() {
        return {
          list:[],
          dialogFormVisible: false,
          dialogFormAdd:false,
          dialogStatus: '',
          listLoading:false,
          total: 0,
          pageData:[],
          plantype:[{id:'1',typeName:'救援无人机'},{id:'2',typeName:'测绘无人机'},{id:'3',typeName:'拍摄无人机'},{id:'4',typeName:'交通无人机'}],
          textMap: {
            update: 'Edit',
            create: 'Create'
          },
        }
      }
    }
</script>

<style scoped>

</style>
