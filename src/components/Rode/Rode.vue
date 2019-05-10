<template>
  <div class="chart-container">
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
    <RodeDynamic id="rode" :mapName="this.mapName"></RodeDynamic>
    <el-button-group style="margin-top: 20px">
      <el-button type="primary" @click="change('福州')" style="background-color: #0A1123">福州</el-button>
      <el-button type="primary" @click="change('厦门')" style="background-color: #0A1123">厦门</el-button>
    </el-button-group>
  </div>
</template>

<script>
  import RodeDynamic from '../Charts/RodeFlyDynamic.vue'
  export default {
    name: "Rode",
    props:{

    },
    data(){
      return{
        mapName:  '福州'
      }
    },
    components:{
      RodeDynamic
    },
    methods:{
      change(ele){
        this.mapName=ele;
      }
    }
  }
</script>

<style scoped>
  .el-button{
    box-shadow: inset 0 0 5px 0.5px #00537D;
  }
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
