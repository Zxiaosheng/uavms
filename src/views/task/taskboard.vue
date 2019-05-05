<template>
  <div class="chart-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <el-col :span="12">
              <el-row :span="8">
                <span class="card-title">任务总量</span>
              </el-row>
              <el-row :span="16">
                <span class="card-count">{{taskCount}}</span>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-progress type="circle" :percentage="15" color="skyblue"></el-progress>
            </el-col>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <el-col :span="12">
              <el-row :span="8">
                <span class="card-title">等待任务</span>
              </el-row>
              <el-row :span="16">
                <span class="card-count">{{taskCount}}</span>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-progress type="circle" :percentage="58" color="yellow"></el-progress>
            </el-col>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <el-col :span="12">
              <el-row :span="8">
                <span class="card-title">正在进行</span>
              </el-row>
              <el-row :span="16">
                <span class="card-count">{{taskCount}}</span>
              </el-row>
            </el-col>
            <el-col :span="12">
              <!--与并发率-->
              <el-progress type="circle" :percentage="25" color="pink"></el-progress>
            </el-col>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <el-col :span="12">
              <el-row :span="8">
                <span class="card-title">正常机数</span>
              </el-row>
              <el-row :span="16">
                <span class="card-count">{{taskCount}}</span>
              </el-row>
            </el-col>
            <el-col :span="12">
              <!--与正常率-->
              <el-progress type="circle" :percentage="77" color="green"></el-progress>
            </el-col>
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
      <el-col :span="12">
        <div class="grid-content bg-purple-light" style="padding:0 20px 0 20px">
          <gauge-chart style="background-color:rgb(31,45,61);" :id="gaugeChartId" width="100%"></gauge-chart>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light" style="padding:0 20px 0 20px">
          <bar-chart style="background-color:rgb(31,45,61);" :id="barChartId" width="100%"></bar-chart>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  // 执行报告，每天的成功任务数和失败任务数
  import LineChart from './components/LineChart'
  // 卡片中占比图
  import PieChart from './components/PieChart'
  // 仪表盘用于任务完成率实时监控
  import GaugeChart from './components/GaugeChart'
  // 分类型统计年度服务领域
  import BarChart from './components/BarChart'
  import {getTaskCount} from '@/api/task'
  export default {
    name: 'dashboard',
    components:{
      LineChart,
      PieChart,
      GaugeChart,
      BarChart
    },
    mounted(){
      // 获取总任务数
      getTaskCount().then(resp=>this.taskCount = resp.data.count)
    },
    data(){
      return {
        lineChartId:'line',
        pieChartId:'pie',
        gaugeChartId:'gauge',
        barChartId:'bar',
        taskCount:0
      }
    }
  }
</script>

<style scoped>
  .chart-container{
    position: relative;
    width: 100%;
    height: calc(100vh - 50px);
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
    min-height: 160px;
    background-color: rgb(31,45,61);
    border: 1px solid rgb(31,45,61);
    border-radius: 4px;
    color: #fff;
  }
  .card-title,.card-count{
    font-size: 24px;
    font-weight: bold;
  }
  .card-count{
    font-size: 50px;
  }
</style>
