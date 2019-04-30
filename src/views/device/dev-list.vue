<template>

  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">

        <el-form label-position="left" inline class="demo-table-expand">
          <dev-chart :dev="props.row"></dev-chart>
          <el-form-item label="设备名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="电池容量">
            <span>{{ props.row.powerMax }} mAh</span>
          </el-form-item>
          <el-form-item label="可持续飞行">
            <span>{{ props.row.flyMileage }} km</span>
          </el-form-item>
          <el-form-item label="总载重量">
            <span>{{ props.row.capacity }} g</span>
          </el-form-item>
          <el-form-item label="设备图片">
            <img :src="props.row.imgUrl" alt="无人机" class="dev-img">
          </el-form-item>
          <el-form-item label="设备描述">
            <span>{{ props.row.desc }}</span>
          </el-form-item>

        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="ID"
      prop="id">
    </el-table-column>
    <el-table-column
      label="型号"
      prop="num">
    </el-table-column>
    <el-table-column
      label="设备名称"
      prop="name">
    </el-table-column>
    <el-table-column
      label="类型"
      prop="type">
    </el-table-column>
    <el-table-column
      label="状态"
      prop="status">
    </el-table-column>
    <el-table-column
      label="出厂日期"
      prop="createTime">
    </el-table-column>
  </el-table>
</template>

<script>
  import { fetchList } from '@/api/device'
  import DevChart from './dev-chart'

  export default {
    name: "dev-list",
    data(){
      return{
        tableData: [],
        listQuery: {}
      }
    },
    components: {
      DevChart
    },
    created() {
      this.getList()
    },
    methods: {
      async getList(){
        const { data } = await fetchList(this.listQuery)
        this.tableData=data.items

      }
    }
  }
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .dev-img{
    width: 300px;
    height: 400px;
  }
</style>
