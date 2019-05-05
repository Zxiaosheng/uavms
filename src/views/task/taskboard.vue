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
      <el-col :span="24">
        <div class="grid-content bg-purple-light" style="padding:0 20px 0 20px">
          <line-chart style="background-color:rgb(31,45,61);" :id="lineChartId" width="100%"></line-chart>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-light" style="padding:0 20px 0 20px">
          <gauge-chart style="background-color:rgb(31,45,61);" :id="gaugeChartId" width="100%"></gauge-chart>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  // 四个卡片用于总作业数，正在等待作业数，正在进行任务数与并发率，机器正常数与正常率
  // 执行报告，每天的成功任务数和失败任务数
  import LineChart from './components/LineChart'
  // 卡片中占比图
  import PieChart from './components/PieChart'
  // 仪表盘用于任务完成率实时监控
  import GaugeChart from './components/GaugeChart'
  // 任务调度监控列表，任务队列，考虑是否可以换成别的
  import MonitorTable from './components/MonitorTable'
  export default {
    name: 'dashboard',
    components:{
      LineChart,
      PieChart,
      GaugeChart,
      MonitorTable,
    },
    data(){
      return {
        lineChartId:'line',
        pieChartId:'pie',
        gaugeChartId:'gauge'
      }
    }
  }
</script>

<style scoped>
  .chart-container{
    position: relative;
    width: 100%;
    height: calc(100vh - 84px);
    background-color: rgb(48,65,86);
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
    background: rgb(48,65,86);
  }
  .bg-purple {
    background: rgb(48,65,86);
  }
  .bg-purple-light {
    background: rgb(48,65,86);
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: rgb(48,65,86);
  }
  /*卡片样式*/
  .text {
    font-size: 14px;
  }
  .item {
    padding: 10px 0;
  }
  .box-card {
    margin: 20px 20px 0 20px;
    background-color: rgb(31,45,61);
    border: 1px solid rgb(31,45,61);
    border-radius: 4px;
    color: #fff;
  }
</style>
