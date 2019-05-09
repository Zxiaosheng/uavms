<template>
  <div class="chart-container">
    <div>无人机路线当前路线展示</div>
    <ul>
      <li>
        <span>消防</span>
        <div><span>12 </span>种</div>
      </li>
      <li>
        <span>物流</span>
        <div><span>8 </span>种</div>
      </li>
      <li>
        <span>医疗</span>
        <div><span>16 </span>种</div>
      </li>
      <li>
        <span>测绘</span>
        <div><span>5 </span>种</div>
      </li>
    </ul>
    <RodeDynamic :mapName="this.mapName"></RodeDynamic>
  </div>
</template>

<script>
  import RodeDynamic from '../Charts/RodeFlyDynamic.vue'
  export default {
    name: "Rode",
    props:{
      mapName: {
        type: Object,
        default: '福州'
      }
    },
    components:{
      RodeDynamic
    }
  }
</script>

<style scoped>
  .chart-container{
    text-align: center;
    font-size: 18px;
    background-color: #0a0f24;
    height: 600px;
    width: 100%;
  }

  .chart-container>div{
    color: white;
  }
  .chart-container>ul{
    color: white;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
  }
  li{
    list-style: none;
  }
  .chart-container>ul>li>div>span{
    color: #2c74ba;
    font-size: 35px;
  }
  .chart-container>ul>li>span{
    font-size: 13px;
  }
  .el-footer-btn{
    display: flex;
  }
</style>
