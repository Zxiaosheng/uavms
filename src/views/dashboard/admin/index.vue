<template>
  <div class="dashboard-editor-container">
    <github-corner class="github-corner" />

    <!--<panel-group @handleSetLineChartData="handleSetLineChartData" />-->



    <el-row style="height: 60%">
      <el-col :xs="24" :sm="24" :lg="6" class="height100">
        <el-row style="background:#000;padding:16px 16px 0;margin-bottom:32px;" class="height50">
          <line-chart :chart-data="lineChartData" />
        </el-row>
        <el-row  class="height50">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
        </el-row>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12" class="height100">
          <flypath></flypath>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="6" class="height100">
        <el-row class="height50">
          <div class="chart-wrapper">
            <bar-chart />
          </div>
        </el-row>
     <el-row class="height50">
       <transaction-table />
     </el-row>
      </el-col>
    </el-row>

    <el-row style="height: 30%">
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}"  class="height100">

      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 12}" :xl="{span: 12}"  class="height100">
        <todo-list />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" class="height100" >
        <box-card />
      </el-col>
    </el-row>

    <!--<flypath></flypath>-->

  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'
import ElRow from "element-ui/packages/row/src/row";
import flypath from '@/components/Charts/FlyRouteChart'

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
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    BoxCard,
    flypath
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
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
  height: calc(100vh);

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
  .height100{
    height: 100%;
  }
  .height50{
    height: 50%;
  }
}
</style>
