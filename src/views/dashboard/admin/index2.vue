<template>
  <div class="dashboard-editor-container">

    <!--<panel-group @handleSetLineChartData="handleSetLineChartData" />-->
    <el-row style="height: 8%;min-height: 1.5em" type="flex" align="middle" justify="center">
      <h2 style="margin: auto;color: white">
        无人机实时数据分析平台
      </h2>
    </el-row>

    <el-row :gutter="20" style="height: 90%" type="flex" >
      <el-col :span="6" class="height100">

        <el-row class="heightL i_box" style=" padding-bottom: 10px;">
          <lineC id="lineC" height="100%" width="100%"></lineC>
        </el-row>
        <el-row class="heightL i_box" style=" padding-top: 10px;">
          <bar-c id="barc" height="100%" width="100%"></bar-c>
        </el-row>
      </el-col>
      <el-col :span="12" class="height100">
        <rode :mapName="mapName"></rode>
      </el-col>
      <el-col :span="6" class="height100">
        <el-row class="heightR i_box" >
        <chart-c id="chartc" height="100%" width="100%"></chart-c>
        </el-row>
        <el-row class="heightR i_box" style="padding: 10px 0">
       <trouble id2="trouble" height="100%" width="100%"></trouble>
        </el-row>
        <el-row class="heightR i_box">
          <adar-c id="adar" height="100%" width="100%"></adar-c>
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
  import adarC from '@/components/Charts/adarChart'
  import rode from '@/components/Rode/Rode'

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
      lineC,
      adarC,
      rode
    },
    data() {
      return {
        lineChartData: lineChartData.newVisitis,
        mapName:"",
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
    -webkit-box-shadow:inset 0 0 15px 0.5px #00537D;
    -moz-box-shadow:inset 0 0 15px 0.5px #00537D;
    box-shadow: inset 0 0 15px 0.5px #00537D;
    padding: 15px;
    box-sizing: border-box;
    border: 1px solid #00537D;
    background-color: rgb(31, 45, 61);
  }
  .dashboard-editor-container {
    position: relative;
    padding: 0px 10px;
    height: calc(100vh - 50px);
    width: 100%;
    background-color: #0A1123;

  }

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

  .heightL {
       height: 50%;
     }
  .heightR {
       height: 33.3%;
     }

  .margint20 {
    margin-top: 20%;
  }
</style>
