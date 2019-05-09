<template>
  <div class="dashboard-editor-container">

    <!--<panel-group @handleSetLineChartData="handleSetLineChartData" />-->
    <el-row>
      <p>
        asdfgh
      </p>
    </el-row>

    <el-row :gutter="40" style="height: 90%" type="flex" >
      <el-col :span="6" class="height100">
        <el-row class="height50 i_box" style="margin-bottom: 10px">
          <rode-chart id2="rode" height="100%" :cp="Number(1)"></rode-chart>
        </el-row>
        <el-row class="height50 i_box">
          <gauge-chart id="gau" height="100%" width="100%"></gauge-chart>
        </el-row>

      </el-col>
      <el-col :span="10" class="height100">
        <flypath id="flypath"></flypath>
      </el-col>
      <el-col :span="6" class="height100">
        <el-row class="height30 i_box" style="margin-bottom: 10px">
        <chart-c id="chartc" height="100%" width="100%"></chart-c>
        </el-row>
        <el-row class="height30 i_box" style="margin-bottom: 10px">
          <his-count id="his" height="100%" width="100%"></his-count>
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
      chartC
    },
    data() {
      return {
        lineChartData: lineChartData.newVisitis
      }
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

  .height50 {
       height: 50%;
     }
  .height30 {
       height: 30%;
     }

  .margint20 {
    margin-top: 20%;
  }
  }
</style>
