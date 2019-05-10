<template>
  <div class="chart-container">
    <el-dropdown trigger="click" style="margin-top: 10px;position: fixed;top:45%;right:0;z-index: 99999999">
      <span class="el-dropdown-link" style="color: #fff">
        切换城市<i class="el-icon-caret-bottom el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown" style="width: 80px;text-align: center">
        <el-dropdown-item class="clearfix" >
          <span @click="changePlace('福州')">福州</span>
        </el-dropdown-item>
        <el-dropdown-item class="clearfix" >
          <span @click="changePlace('厦门')">厦门</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

        <RodeFlyDynamic :mapName="this.city"></RodeFlyDynamic>


  </div>
</template>

<script>
  import echarts from 'echarts'
  //行政区划图
  import 'echarts/lib/chart/map'
  //引入对应图表的js文件
  import 'echarts/map/js/china.js'

  import RodeFlyDynamic from '@/components/Charts/RodeFlyDynamic'
  export default {
    name: "rode-echart",
    data(){
      return{
        city:'福州'
      }
    },
    components: { RodeFlyDynamic },
    methods:{
      changePlace(n){
        // console.log(n)
         this.city=n
      }
    }

  }
</script>

<style scoped>
  .chart-container{
    position: relative;
    width: 100%;
    height: calc(108vh - 105px);
    /*height: 800px;*/
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
