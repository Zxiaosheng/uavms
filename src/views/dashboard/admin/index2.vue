<template>
  <div class="dashboard-editor-container">

    <!--<panel-group @handleSetLineChartData="handleSetLineChartData" />-->
    <el-row style="height: 8%;min-height: 1.5em" type="flex" align="middle" justify="center">
      <div style="margin: auto;color: white">
        asdfgh
      </div>
    </el-row>

    <el-row :gutter="40" style="height: 90%" type="flex" >
      <el-col :span="6" class="height100">

        <el-row class="height40 i_box">
          <lineC id="lineC" height="100%" width="100%"></lineC>
        </el-row>
        <el-row class="height40 i_box" style="margin-bottom: 10px">
          <bar-c id="barc" height="100%" width="100%"></bar-c>
        </el-row>
      </el-col>
      <el-col :span="10" class="height100">
        <flypath id="flypath"></flypath>
      </el-col>
      <el-col :span="6" class="height100">
        <el-row class="height30 i_box" style="margin: 3% 0">
        <chart-c id="chartc" height="100%" width="100%"></chart-c>
        </el-row>
        <el-row class="height30 i_box" style="margin: 3% 0">
       <trouble id2="trouble" height="100%" width="100%"></trouble>
        </el-row>
        <el-row class="height30 i_box">
          <bar-chart id="bar" height="100%" width="100%"></bar-chart>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import GithubCorner from '@/components/GithubCorner'
  import RodeChart from '@/components/Charts/RodeChart'
  import PanelGroup from './components/PanelGroup'
  import TransactionTable from './components/TransactionTable'
  import ElRow from "element-ui/packages/row/src/row";
  import flypath from '@/components/Charts/FlyRouteChart'
  import hisCount from '@/components/Charts/HistorycountBar'
  import TaskCard from './components/TaskCard'
  import GaugeChart from '@/views/task/components/GaugeChart'
  import BarChart from '@/views/task/components/BarChart'
  import chartC from '@/components/Charts/IndexChartCricl'
  import trouble from '@/components/Charts/FirstTrouble'
  import barC from '@/components/Charts/bar'
  import lineC from '@/components/Charts/lineDraw'

  const lineChartData = {
    newVisitis: {
      expectedData: [100, 120, 161, 134, 105, 160, 165],
      actualData: [120, 82, 91, 154, 162, 140, 145]
    },
    messages: {
      expectedData: [200, 192, 120, 144, 160, 130, 140],
      actualData: [180, 160, 151, 106, 145, 150, 130]
    },
    purchases: {
      expectedData: [80, 100, 121, 104, 105, 90, 100],
      actualData: [120, 90, 100, 138, 142, 130, 130]
    },
    shoppings: {
      expectedData: [130, 140, 141, 142, 145, 150, 160],
      actualData: [120, 82, 91, 154, 162, 140, 130]
    }
  }

  export default {
    name: 'DashboardAdmin',
    components: {
      ElRow,
      GithubCorner,
      PanelGroup,
      TransactionTable,
      flypath,
      TaskCard,
      RodeChart,
      GaugeChart,
      hisCount,
      BarChart,
      chartC,
      trouble,
      barC,
      lineC
    },
    data() {
      return {
        lineChartData: lineChartData.newVisitis
      }
    },
    mounted(){
      let body=document.getElementsByClassName('dashboard-editor-container')[0]
      let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
      let observer = new MutationObserver(()=>{
        console.log('333')
      })
      observer.observe(body, { attributes: true, attributeFilter: ['style'], attributeOldValue: true })
    },
    methods: {
      handleSetLineChartData(type) {
        this.lineChartData = lineChartData[type]
      }
    }
  }
</script>

<style lang="scss" scoped>

  .i_box>div {
    background-color: rgb(31, 45, 61);
  }
  .dashboard-editor-container {
    position: relative;
    height: calc(100vh - 50px);
    width:100%;
    background-color: rgb(48, 65, 86);



  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }

  .height100 {
    height: 100%;
  }

  .height40 {
       height: 40%;
    margin: 10% 0;
     }
  .height30 {
       height: 30%;
     }

  .margint20 {
    margin-top: 20%;
  }
  }
</style>
