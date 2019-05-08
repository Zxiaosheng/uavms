<template>
  <div class="chart-container">

    <el-popover
      placement="right"
      width="200"
      trigger="click">
        <el-button type="info" size="medium" @click="changePlace(1)">福州</el-button>
        <el-button type="info" size="medium" @click="changePlace(2)">厦门</el-button>
        <el-button type="info" size="medium" @click="changePlace(3)">南平</el-button>
        <el-button type="info" size="medium" @click="changePlace(4)">泉州</el-button>
        <el-button type="info" size="medium" @click="changePlace(5)">漳州</el-button>
        <el-button type="info" size="medium" @click="changePlace(6)">三明</el-button>
        <el-button type="info" size="medium" @click="changePlace(7)">莆田</el-button>
        <el-button type="info" size="medium" @click="changePlace(8)">龙岩</el-button>
        <el-button type="info" size="medium" @click="changePlace(9)">宁德</el-button>
      <el-button type="info" slot="reference" icon="el-icon-search" circle></el-button>
    </el-popover>

    <el-row :gutter="20">
      <el-col :span="12" >
        <RodeChartPie :cp="this.num" style="background-color:rgb(31,45,61)"></RodeChartPie>
      </el-col>
      <el-col :span="12" >
        <RodeChartBar  :cp="this.num" style="background-color:rgb(31,45,61)"></RodeChartBar>
      </el-col>
    </el-row>

    <el-row >
      <el-col :span="24" >
        <RodeChart :cp="this.num" style="background-color:rgb(31,45,61);"></RodeChart>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import echarts from 'echarts'
  //行政区划图
  import 'echarts/lib/chart/map'
  //引入对应图表的js文件
  import 'echarts/map/js/china.js'

  import RodeChartPie from '@/components/Charts/RodeChartPie'
  import RodeChartBar from '@/components/Charts/RodeChartBar'
  import RodeChart from '@/components/Charts/RodeChart'
  export default {
    name: "rode-echart",
    data(){
      return{
        num:1
      }
    },
    components: { RodeChartPie ,RodeChartBar ,RodeChart},
    methods:{
      changePlace(n){
         this.num=n
      }
    }

  }
</script>

<style scoped>
  .chart-container{
    position: relative;
    width: 100%;
    height: calc(140vh - 30px);
    padding: 0 20px 0 20px;
    background-color: rgb(48,65,86);
  }
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
    margin-top: 10px;
    /*border: 2px solid red;*/
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .el-button{
    padding:3px;
    margin: 5px;
  }

</style>
