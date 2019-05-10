<template>
  <div class="chart-container" :style="{height:height,width:width}">
    <ul>
      <li v-for="item of serialMap.list">
        <span>{{item.title}}</span>
        <div><span>{{item.total}} </span>种</div>
      </li>
      <!--<li>-->
        <!--<span>物流</span>-->
        <!--<div><span>8 </span>种</div>-->
      <!--</li>-->
      <!--<li>-->
        <!--<span>医疗</span>-->
        <!--<div><span>16 </span>种</div>-->
      <!--</li>-->
      <!--<li>-->
        <!--<span>测绘</span>-->
        <!--<div><span>5 </span>种</div>-->
      <!--</li>-->
    </ul>
    <div class="chart-container2">
    <RodeDynamic id="rode" :mapName="serialMap.mapName"></RodeDynamic>
    </div>
    <el-button-group style="height: 15%;padding-top:7.5% ">
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
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '100%'
      },
    },
    data(){
      return{
        serialMap: {
          mapName:  '福州',
          list: [
            {title: '消防', total: 8},
            {title: '物流', total: 12},
            {title: '医疗', total: 6},
            {title: '天眼', total: 2},
            {title: '测绘', total: 3}
          ]
        }
      }
    },
    components:{
      RodeDynamic
    },
    methods:{
      change(ele){
        if(ele=='福州'){
          this.serialMap={
            mapName:  '福州',
            list: [
              {title: '消防', total: 8},
              {title: '物流', total: 12},
              {title: '医疗', total: 6},
              {title: '天眼', total: 2},
              {title: '测绘', total: 3}
            ]
          }
        }else if(ele=='厦门'){
          this.serialMap={
              mapName:  '厦门',
              list: [
                {title: '消防', total: 8},
                {title: '物流', total: 20},
                {title: '医疗', total: 8},
                {title: '天眼', total: 6},
                {title: '测绘', total: 1}
              ]
            }
        }
      }
    }
  }
</script>

<style scoped>
  .el-button{
    box-shadow: inset 0 0 5px 0.5px #00537D;
    margin-top: -18px;
  }
  .chart-container{
    text-align: center;
    font-size: 18px;
    background-color: #0a0f24;
  }
  .chart-container2{
    background-color: #0a0f24;
    text-align: center;
    position: relative;
    height: 70%;
    width: 100%;
    max-height: 600px;
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
