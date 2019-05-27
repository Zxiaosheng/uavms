<template>
  <div style="position: relative;">
    <div :id="id" :class="className" :style="{height:height,width:width}" style="border-radius: 4px"/>
    <div class="select" style="position: absolute;top: 12px;left: 20px;cursor: pointer;">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link" style="width: 64px;font-size: 12px;color: rgb(24,144,255);border: 1px solid rgb(24,144,255);border-radius: 4px;background-color:rgb(236,245,255);padding: 4px 7px 4px 7px">切换月份</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item class="clearfix"><span @click="changeMonth(3)">三月</span></el-dropdown-item>
          <el-dropdown-item class="clearfix"><span @click="changeMonth(4)">四月</span></el-dropdown-item>
          <el-dropdown-item class="clearfix"><span @click="changeMonth(5)">五月</span></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>

</template>

<script>
  import echarts from 'echarts'
  import resize from '@/components/Charts/mixins/resize'

  const march = [
    '2019-03-01','2019-03-02','2019-03-03','2019-03-04','2019-03-05','2019-03-06','2019-04-07',
    '2019-03-08','2019-03-09','2019-03-10','2019-03-11','2019-03-12','2019-03-13','2019-04-14',
    '2019-03-15','2019-03-16','2019-03-17','2019-03-18','2019-03-19','2019-03-20','2019-04-21',
    '2019-03-22','2019-03-23','2019-03-24','2019-03-25','2019-03-26','2019-03-27','2019-04-28',
    '2019-03-29','2019-03-30','2019-03-31'
  ]
  const april = [
    '2019-04-01','2019-04-02','2019-04-03','2019-04-04','2019-04-05','2019-04-06','2019-04-07',
    '2019-04-08','2019-04-09','2019-04-10','2019-04-11','2019-04-12','2019-04-13','2019-04-14',
    '2019-04-15','2019-04-16','2019-04-17','2019-04-18','2019-04-19','2019-04-20','2019-04-21',
    '2019-04-22','2019-04-23','2019-04-24','2019-04-25','2019-04-26','2019-04-27','2019-04-28',
    '2019-04-29','2019-04-30'
  ]
  const may = [
    '2019-05-01','2019-05-02','2019-05-03','2019-05-04','2019-05-05','2019-05-06','2019-05-07',
    '2019-05-08','2019-05-09','2019-05-10','2019-05-11','2019-05-12','2019-05-13','2019-05-14',
    '2019-05-15','2019-05-16','2019-05-17','2019-05-18','2019-05-19','2019-05-20','2019-05-21',
    '2019-05-22','2019-05-23','2019-05-24','2019-05-25','2019-05-26','2019-05-27','2019-05-28',
    '2019-05-29','2019-05-30','2019-05-31'
  ]

  export default {
    name: 'index',
    props: {
      mixins: [resize],
      className: {
        type: String,
        default: 'chart'
      },
      id: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '200px'
      },
      height: {
        type: String,
        default: '400px'
      }
    },
    data(){
      return {
        chart:null,
        xAxisLabel:may,
        dayCnt:31,
        monthName:'五月',
        failCnt:[],
        successCnt:[]
      }
    },
    mounted() {
      this.changeMonth(5)
      // for(let i = 0; i < 31; i++){
      //   this.successCnt.push(this.getRndInteger(20,50))
      //   this.failCnt.push(this.getRndInteger(0,15))
      // }
      //初始化Echarts实例
      this.initChart()
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose();
      this.chart = null
    },
    methods:{
      changeMonth(value){
        this.successCnt=[];
        this.failCnt=[];
        if(value === 3){
          this.xAxisLabel = march
          this.dayCnt = 31
          this.monthName = '三月'
          for(let i = 0; i < 31; i++){
            this.successCnt.push(Math.floor(Math.random() * (50 - 20 + 1) ) + 20)
            this.failCnt.push(Math.floor(Math.random() * (15 + 1) ))
          }
        }
        if(value === 4){
          this.xAxisLabel = april
          this.dayCnt = 30
          this.monthName = '四月'
          for(let i = 0; i < 30; i++){
            this.successCnt.push(Math.floor(Math.random() * (50 - 20 + 1) ) + 20)
            this.failCnt.push(Math.floor(Math.random() * (15 + 1) ))
          }
        }
        if(value === 5){
          this.xAxisLabel = may
          this.dayCnt = 31
          this.monthName = '五月'
          for(let i = 0; i < 31; i++){
            this.successCnt.push(Math.floor(Math.random() * (50 - 20 + 1) ) + 20)
            this.failCnt.push(Math.floor(Math.random() * (15 + 1) ))
          }
        }
        this.initChart()
      },
      //模拟[min,max]整数
      getRndInteger(min, max) {
          return Math.floor(Math.random() * (max - min + 1) ) + min;
      },
      initChart() {
        //创建echarts实例
        this.chart = echarts.init(document.getElementById(this.id))
        //完成图表绘制配置
        this.chart.setOption({
          grid:{
            //区域是否包含坐标轴的刻度标签
            containLabel:true,
            left:'20',
            right:'50',
            bottom:'10',
          },
          title: {
            top:'10',
            left:'100',
            text: this.monthName + '任务报告',
            textStyle:{
              color:'#fff'
            }
          },
          legend: {
            top:'10',
            data:['成功任务','失败任务'],
            textStyle:{
              color:'#fff'
            }
          },
          xAxis:  {
            type: 'category',
            boundaryGap: false,
            axisLine:{
              lineStyle:{
                color:'#fff'
              }
            },
            data: this.xAxisLabel
          },
          yAxis: {
            type: 'value',
            axisLine:{
              lineStyle:{
                color:'#fff'
              }
            }
          },
          series: [
            {
              name:'成功任务',
              type:'line',
              color:'rgb(79,192,141)',
              data:this.successCnt,
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              },
              markLine: {
                data: [
                  {type: 'average', name: '平均值'},
                  [
                    {
                      symbol: 'none',
                      x: '96%',
                      yAxis: 'max'
                    },
                    {
                      symbol: 'circle',
                      label: {
                        normal: {
                          position: 'start',
                          formatter: '最大值'
                        }
                      },
                      type: 'max',
                      name: '最高点'
                    }
                  ]
                ],
              }
            },
            {
              name:'失败任务',
              type:'line',
              color:'#ff8280',
              data:this.failCnt,
              markPoint: {
                data: [
                  {name: '日最低', value: -2, xAxis: 1, yAxis: -1.5}
                ]
              },
              markLine: {
                data: [
                  {type: 'average', name: '平均值'},
                  [
                    {
                      symbol: 'none',
                      x: '96%',
                      yAxis: 'max'
                    },
                    {
                      symbol: 'circle',
                      label: {
                        normal: {
                          position: 'start',
                          formatter: '最大值'
                        }
                      },
                      type: 'max',
                      name: '最高点'
                    }
                  ]
                ]
              }
            }
          ]
        })
      }
    }
  }
</script>

<style scoped>

</style>
