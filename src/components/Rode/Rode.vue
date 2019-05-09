<template>
  <div class="con">
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
    <RodeDynamic></RodeDynamic>
    <el-button-group>
      <el-button type="primary" icon="el-icon-arrow-left">上一页</el-button>
      <el-button type="primary">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
    </el-button-group>
  </div>
</template>

<script>
  import RodeDynamic from '../Charts/RodeFlyDynamic.vue'
  export default {
    name: "Rode",
    components:{
      RodeDynamic
    }
  }
</script>

<style scoped>
  .con{
    background-color: #0a0f24;
    height: 200px;
    width: 500px;
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
  .el-footer-btn{
    display: flex;
  }
</style>
