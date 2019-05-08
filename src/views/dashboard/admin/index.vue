<template>
  <div class="dashboard-editor-container">

    <!--<panel-group @handleSetLineChartData="handleSetLineChartData" />-->



    <el-row style="height: 60%" >
      <el-col :xs="24" :sm="24" :lg="6" class="height100">
<div class="margint20">
  <rode-chart></rode-chart>
</div>



      </el-col>
      <el-col :xs="24" :sm="24" :lg="12" class="height100">
          <flypath></flypath>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="6" class="height100">

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
    <el-row :gutter="20" style="height: 40%">
      <el-col :span="6">
          <!--千言万语-->
        1
      </el-col>
      <el-col :span="12" >
<div style="margin-top: 10%">
  <task-card></task-card>
</div>
</el-col>
      <el-col :span="6">
          <!--千言万语-->
        1
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
// 任务卡片化组件
import TaskCard from './components/TaskCard'

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
    RodeChart
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
*{
  background-color: rgba(0,0,0,0.8);
}
.dashboard-editor-container {
  position: relative;
  height: calc(100vh - 50px);
  background-color: rgba(0,0,0,0.8);
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
  .margint20{
    margin-top: 20%;
  }
}
</style>
