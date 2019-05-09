<template>
  <div class="chart-container">
    <el-dropdown trigger="click" style="margin-top: 10px;position: fixed;top:45%;right:0;z-index: 99999999">
      <span class="el-dropdown-link" style="color: #fff">
        切换城市<i class="el-icon-caret-bottom el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown" style="width: 80px;text-align: center">
        <el-dropdown-item class="clearfix" >
          <span @click="changePlace(1)">福州</span>
        </el-dropdown-item>
        <el-dropdown-item class="clearfix" >
          <span @click="changePlace(2)">厦门</span>
        </el-dropdown-item>
        <el-dropdown-item class="clearfix" >
          <span @click="changePlace(3)">南平</span>
        </el-dropdown-item>
        <el-dropdown-item class="clearfix" >
          <span @click="changePlace(4)">泉州</span>
        </el-dropdown-item>
        <el-dropdown-item class="clearfix" >
          <span @click="changePlace(5)">漳州</span>
        </el-dropdown-item>
        <el-dropdown-item class="clearfix" >
          <span @click="changePlace(6)">三明</span>
        </el-dropdown-item>
        <el-dropdown-item class="clearfix" >
          <span @click="changePlace(7)">莆田</span>
        </el-dropdown-item>
        <el-dropdown-item class="clearfix" >
          <span @click="changePlace(8)">龙岩</span>
        </el-dropdown-item>
        <el-dropdown-item class="clearfix" >
          <span @click="changePlace(9)">宁德</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

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
        // console.log(n)
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
    /*margin: 5px;*/
  }
.el-dropdown{
  width: 100px;
  height: 50px;
  border-radius:4px 0 0 4px ;
  color: #fff;
  font-weight: bold;
  font-size: 15px;
  text-align: center;
  line-height: 50px;
  background-color: rgb(24,144,255);
}
</style>
