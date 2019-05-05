<template>
  <div class="chart-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div v-for="o in 4" :key="o" class="text item">
              {{'飞行器 ' + o }}
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div v-for="o in 4" :key="o" class="text item">
              {{'成功作业 ' + o }}
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div v-for="o in 4" :key="o" class="text item">
              {{'失败作业 ' + o }}
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div v-for="o in 4" :key="o" class="text item">
              {{'作业数 ' + o }}
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        <div class="grid-content bg-purple">
          <pie-chart :id="pieChartId" width="100%"></pie-chart>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="grid-content bg-purple-light">
          <line-chart :id="lineChartId" width="100%"></line-chart>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light">
          <el-progress :text-inside="true" :stroke-width="18" :percentage="0"></el-progress>
          <el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
          <el-progress :text-inside="true" :stroke-width="18" :percentage="80" color="rgba(142, 113, 199, 0.7)"></el-progress>
          <el-progress :text-inside="true" :stroke-width="18" :percentage="100" status="success"></el-progress>
          <el-progress :text-inside="true" :stroke-width="18" :percentage="50" status="exception"></el-progress>
          <el-progress :text-inside="true" :stroke-width="18" :percentage="0"></el-progress>
          <el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
          <el-progress :text-inside="true" :stroke-width="18" :percentage="80" color="rgba(142, 113, 199, 0.7)"></el-progress>
          <el-progress :text-inside="true" :stroke-width="18" :percentage="100" status="success"></el-progress>
          <el-progress :text-inside="true" :stroke-width="18" :percentage="50" status="exception"></el-progress>
          <el-progress type="circle" :percentage="0"></el-progress>
          <el-progress type="circle" :percentage="25"></el-progress>
          <el-progress type="circle" :percentage="80" color="#8e71c7"></el-progress>
          <el-progress type="circle" :percentage="100" status="success"></el-progress>
          <el-progress type="circle" :percentage="50" status="exception"></el-progress>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import LineChart from './components/LineChart'
  import PieChart from './components/PieChart'
  export default {
    name: 'dashboard',
    components:{
      LineChart,
      PieChart
    },
    data(){
      return {
        lineChartId:'line',
        pieChartId:'pie'
      }
    }
  }
</script>

<style scoped>
  .chart-container{
    position: relative;
    width: 100%;
    height: calc(100vh - 84px);
    /*background-color: rgb(48,65,86);*/
  }
  /*布局样式*/
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    /*background: rgb(48,65,86);*/
  }
  .bg-purple {
    /*background: rgb(48,65,86);*/
  }
  .bg-purple-light {
    /*background: rgb(48,65,86);*/
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    /*background-color: rgb(48,65,86);*/
  }
  /*卡片样式*/
  .text {
    font-size: 14px;
  }
  .item {
    padding: 10px 0;
  }
  .box-card {
    width: 480px;
    background-color: rgb(48,65,86);
    color: #fff;
  }
</style>
