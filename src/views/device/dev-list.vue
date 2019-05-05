<template>

  <div class="dev-list">

    <el-form :inline="true" :model="listQuery" class="demo-form-inline">

      <el-form-item label="型号">
        <el-input v-model="listQuery.num" placeholder="输入型号搜索"></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="listQuery.name" placeholder="输入名称搜索"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="listQuery.type" placeholder="选择类型搜索">
          <el-option label="微型" value="微型"></el-option>
          <el-option label="小型" value="小型"></el-option>
          <el-option label="中型" value="中型"></el-option>
          <el-option label="大型" value="大型"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="listQuery.type" placeholder="选择状态搜索">
          <el-option label="飞行中" value="飞行中"></el-option>
          <el-option label="待命中" value="待命中"></el-option>
          <el-option label="充电中" value="充电中"></el-option>
          <el-option label="故障中" value="故障中"></el-option>
          <el-option label="维修中" value="维修中"></el-option>
          <el-option label="离线中" value="离线中"></el-option>
          <el-option label="电量低" value="电量低"></el-option>
          <el-option label="已停用" value="已停用"></el-option>
        </el-select>
      </el-form-item>
      <br>
      <el-form-item label="出厂日期">
        <el-input v-model="listQuery.createTimeStart" type="date"></el-input>
      </el-form-item>
      <el-form-item label="至">
        <el-input v-model="listQuery.createTimeEnd" type="date"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      style="width: 100%"
      border>
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
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="">停用</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { fetchList } from '@/api/device'
  import DevChart from './dev-chart'

  export default {
    name: "dev-list",
    data(){
      return{
        tableData: [],
        listQuery: {
          id: '',
          type: '',
          status: '',
          num: '',
          name: '',
          createTimeStart: '',
          createTimeEnd: ''
        }
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
  .dev-list{
    padding: 20px;
  }
</style>
