<template>
  <div class="chart-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card" style="margin-left: 20px">
            <el-col :span="12">
              <el-row :span="8">
                <span class="card-title">任务总量</span>
              </el-row>
              <el-row :span="16">
                <span class="card-count">{{taskCount}}</span>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-progress type="circle" :percentage="finishedRate" :width="120" color="rgb(79, 192, 141)"></el-progress>
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
                <span class="card-count">{{waitTargets}}</span>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-progress type="circle" :percentage="waitRate" :width="120" color="rgb(217,186,127)"></el-progress>
            </el-col>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <el-col :span="12">
              <el-row :span="8">
                <span class="card-title">并发执行</span>
              </el-row>
              <el-row :span="16">
                <span class="card-count">{{concurrentTargets}}</span>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-progress type="circle" :percentage="concurrentRate" :width="120" color="#65d0de"></el-progress>
            </el-col>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card" style="margin-right: 20px">
            <el-col :span="12">
              <el-row :span="8">
                <span class="card-title">超时比率</span>
              </el-row>
              <el-row :span="16">
                <span class="card-count">{{timeOutTargets}}</span>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-progress type="circle" :percentage="timeOutRate" :width="120" color="rgb(224,92,90)"></el-progress>
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
  // 仪表盘用于任务完成率实时监控
  import GaugeChart from './components/GaugeChart'
  // 分类型统计年度服务领域
  import BarChart from './components/BarChart'
  import {getTaskCount,fetchTasklist} from '@/api/task'
  export default {
    name: 'dashboard',
    components:{
      LineChart,
      GaugeChart,
      BarChart
    },
    mounted(){
      // 获取任务列表
      fetchTasklist({}).then(resp=>{
        this.taskList = resp.data.items
      })
      // 获取总任务数
      getTaskCount().then(resp=>this.taskCount = resp.data.count)
    },
    data(){
      return {
        lineChartId:'line',
        pieChartId:'pie',
        gaugeChartId:'gauge',
        barChartId:'bar',
        taskCount:0,
        taskWaitCount:0,
        taskConcurrentCount:0,
        taskTimeOutCount:0,
        taskList:[]
      }
    },
    methods:{
      //任务百分比计算工具
      rateCalc(taskStatus){
        let queue = this.taskList.filter(task=>{
          return task.taskStatus === taskStatus
        }).length
        let percent = Math.ceil((queue/this.taskCount)*100)
        return percent >= 0 && percent <= 100 ? percent : 0
      },
      //任务指标数据计算工具
      countTaskTarget(taskStatus){
        return this.taskList.filter(task=>{
          return task.taskStatus === taskStatus
        }).length
      }
    },
    computed:{
      //计算已完成任务百分比
      finishedRate(){
        return this.rateCalc('Finished')
      },
      //计算等待百分比
      waitRate(){
        return this.rateCalc('Wait')
      },
      waitTargets(){
        return this.countTaskTarget('Wait')
      },
      //计算正在并发进行百分比
      concurrentRate(){
        return this.rateCalc('Normal')
      },
      concurrentTargets(){
        return this.countTaskTarget('Normal')
      },
      //计算超时百分比
      timeOutRate(){
        return this.rateCalc('OutTime')
      },
      timeOutTargets(){
        return this.countTaskTarget('OutTime')
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
  .box-card {
    margin-top: 20px;
    min-height: 160px;
    background-color: rgb(31,45,61);
    border: 1px solid rgb(31,45,61);
    border-radius: 4px;
    color: #fff;
  }
  .card-title,.card-count{
    font-size: 20px;
    font-weight: bold;
  }
  .card-count{
    font-size: 64px;
  }
</style>
