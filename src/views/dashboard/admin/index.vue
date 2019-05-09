<template>
  <div class="dashboard-editor-container">

    <!--<panel-group @handleSetLineChartData="handleSetLineChartData" />-->


    <el-row :gutter="20" style="height: 60%;padding-bottom: 10px">
      <el-col :span="8" class="height100">

          <rode-chart id2="rode" height="100%" :cp="Number(1)"></rode-chart>

      </el-col>
      <el-col :span="8" class="height100">
        <flypath id="flypath"></flypath>
      </el-col>
      <el-col :span="8" class="height100">
<his-count height="100%" width="100%"></his-count>
      </el-col>
    </el-row>

    <!--<el-row style="height: 30%">-->
    <!--<el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}"  class="height100">-->

    <!--</el-col>-->
    <!--<el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 12}" :xl="{span: 12}"  class="height100">-->
    <!--<todo-list />-->
    <!--</el-col>-->
    <!--<el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" class="height100" >-->
    <!--<box-card />-->
    <!--</el-col>-->
    <!--</el-row>-->

    <!--<flypath></flypath>-->
    <el-row :gutter="20"  style="height: 40%">
      <el-col :span="8" class="height100">
        <!--千言万语-->
        <gauge-chart id="gau" height="100%" width="100%" ></gauge-chart>
      </el-col>
      <el-col :span="8" class="height100">
        <div style="padding-top: 10%;height: 100%;">
          <task-card></task-card>
        </div>
      </el-col >
      <el-col :span="8" class="height100">
      <bar-chart id="bar" height="100%" width="100%" ></bar-chart>
      </el-col >
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

  .dashboard-editor-container {
    position: relative;
    height: calc(100vh - 50px);
    background-color: rgb(48,65,86);

.el-row>div>div{
  background-color: rgb(31,45,61);
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

  .height50 {
    height: 50%;
  }

  .margint20 {
    margin-top: 20%;
  }

  }
</style>
