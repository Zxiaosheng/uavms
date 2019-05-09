<template>
  <div class="allBox">
    <h4>无人机用户管理</h4>
    <div class="body">
      <div class="titleName">近一周关键指标</div>
      <el-row class="top" style="border-left: 5px">
        <el-col :xs="24" :sm="24" :lg="9">
          <emptyPie v-if="add" :tableData="tableData" :add="add" :del="del" background="#1F2D29"/>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="15" class="outCon">
          <div>
            <p>新增人数</p>
            <p>{{ tableData.add }}</p>
          </div>
          <div>
            <p>删除人数</p>
            <p>{{ tableData.del }}</p>
          </div>
          <div>
            <p>净增人数</p>
            <p>{{newadd}}</p>
          </div>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-col :xs="24" :sm="24" :lg="24">
          <lineChart v-if="newNum[0]" :yNum="newNum" :dateData="dateData" background="#1F2D29"/>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-col :xs="24" :sm="24" :lg="12">
          <sex-chart v-if="newNum[0]" :tableData="tableData" background="#1F2D29"/>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="12">
          <columnChart v-if="newNum[0]" :dateData="dateData" :newNum="newNum"/>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-col :xs="24" :sm="24" :lg="12">
          <pie-map v-if="newNum[0]" :place="place" :list="list" background="#1F2D29"/>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="12">
          <baiduChart v-if="newNum[0]" :place="place" :list="list" background="#1F2D29"/>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {userMap} from '@/api/userManager'
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
        // 从后台获取的总数据
        tableData: {},
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
      }
    },
    created() {
      // 首次挂载列表组件
      userMap({}).then(response => {
        this.tableData = response.data
        this.total = response.data.total
        this.newadd = response.data.add - response.data.del
        this.add = response.data.add
        this.del = response.data.del
        for (var i = 0; i < response.data.items.length; i++) {
          this.list.push(response.data.items[i].totalNum)
          this.date.push(response.data.items[i].date)
          this.place.push(response.data.items[i].cadd)
          let dayNum = this.list;
          let date = this.date;
          let item = dayNum[Math.floor(Math.random() * dayNum.length)];
          let newDate = date[Math.floor(Math.random() * date.length)];
          this.newNum.push(item);
          this.dateData.push(newDate);
        }
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
  .outCon{
    display:flex;
  }
  .outCon>div{
    flex:1;
    display:flex;
    flex-direction: column;
    align-items:center;
    justify-content:center;
    border-left: 1px solid white;
    margin-left: 2px;
  }
  .outCon>div>p{
    font-size: 20px;
    color: white;
  }
</style>
