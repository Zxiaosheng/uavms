<template>
  <div class="allBox">
    <h4>无人机用户管理</h4>
    <div class="body">
      <div class="titleName">近一个月关键指标</div>
      <el-row class="top" style="border-left: 5px">
        <el-col :span="12">
          <emptyPie v-if="add" :add="add" :del="del" background="#1F2D29"/>
        </el-col>
        <el-col :span="12" class="outCon">
          <div>
            <p>新增人数</p>
            <p>{{add}}</p>
          </div>
          <div>
            <p>删除人数</p>
            <p>{{del}}</p>
          </div>
          <div>
            <p>净增人数</p>
            <p>{{newadd}}</p>
          </div>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-col :xs="24" :sm="24" :lg="24">
          <lineChart v-if="flag" :yNum="newNum" :dateData="dateData" background="#1F2D29"/>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 10px">
        <el-col :span="12">
          <sex-chart v-if="flag" :controlData="controlData" background="#1F2D29"/>
        </el-col>
        <el-col :span="12">
          <columnChart v-if="flag" :dateData="dateData" :newNum="newNum"/>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 10px">
        <el-col :span="12">
          <pie-map v-if="flag" :place="place" :list="list" background="#1F2D29"/>
        </el-col>
        <el-col :span="12">
          <baiduChart v-if="flag" :place="place" :list="list" background="#1F2D29"/>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {userMap, getNewData, getArray,getProvince} from '@/api/userManager'
  import resize from '../../components/Charts/mixins/resize'
  import echarts from 'echarts'
  import emptyPie from '@/components/Charts/userChart/emptyPie'
  import lineChart from '@/components/Charts/userChart/lineChart'
  import sexChart from '@/components/Charts/userChart/sexChart'
  import columnChart from '@/components/Charts/userChart/columnChart'
  import pieMap from '@/components/Charts/userChart/pieMap'
  import baiduChart from '@/components/Charts/userChart/baiduChart'

  export default {
    name: "UserRoute",
    components: {baiduChart, emptyPie, lineChart, sexChart, columnChart, pieMap},
    props: {
      mixins: [resize],
    },
    data() {
      return {
        //处理后的数据
        controlData: {},
        // 从后台获取的总数据
        provData: {},
        newadd: '',
        value1: [],
        chart1: '',
        add: 0,
        del: 0,
        newNum: [],
        dateData: [],
        list: [],
        date: [],
        place: [],
        flag: 0
      }
    },
    created() {
      //获取到每个月份对应的数据
      getArray({}).then(res => {
        let dateArray = []
        let numArray = []
        for (let i = 0; i < res.data.length; i++) {
          numArray.push(res.data[i].calNum);
          dateArray.push(res.data[i].show_time);
        }
        this.newNum = numArray
        this.dateData = dateArray
      }).then(_ => {
        getNewData({}).then(res => {
          this.controlData = res.data[0]
          this.newadd = this.controlData.addcount - this.controlData.delcount
          this.add = this.controlData.addcount
          this.del = this.controlData.delcount
        }).then(_ => {
          getProvince({}).then(response => {
            this.provData = response.data
            for (var i = 0; i < response.data.length; i++) {
              this.list.push(response.data[i].allNum)
              this.place.push(response.data[i].provin)
            }
            this.flag = 1;
          })
        })
      })
    },
  }
</script>

<style scoped>
  .chart-container {
    position: relative;
    width: 100%;
    height: calc(220vh - 30px);
  }

  .body {
    margin-top: 10px;
    border: 1px solid grey;
    margin: 0 auto;
  }

  h4 {
    font-size: 25px;
    text-align: center;
    margin: 0 auto;
    height: 40px;
    line-height: 40px;
    color: white;
    font-weight: 600;
    font-family: "楷体";
  }

  .titleName {
    color: white;
    font-weight: 600;
    font-family: "楷体";
    height: 30px;
    line-height: 30px;
    margin-left: 5px;
  }

  .allBox {
    background: #304156;
  }

  .outCon {
    display: flex;
  }

  .outCon > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-left: 1px solid white;
    margin-left: 2px;
  }

  .outCon > div > p {
    font-size: 20px;
    color: white;
  }
</style>
