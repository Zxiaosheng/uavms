<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" style="border-radius: 4px"/>
</template>

<script>
  import echarts from 'echarts'
  import resize from '@/components/Charts/mixins/resize'
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
        failCnt:[],
        successCnt:[]
      }
    },
    mounted() {
      for(let i = 0; i < 31; i++){
        this.successCnt.push(this.getRndInteger(20,50))
        this.failCnt.push(this.getRndInteger(0,15))
      }
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
            left:'20',
            text: '当月任务报告',
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
            data: [
              '2019-05-01','2019-05-02','2019-05-03','2019-05-04','2019-05-05','2019-05-06','2019-05-07',
              '2019-05-08','2019-05-09','2019-05-10','2019-05-11','2019-05-12','2019-05-13','2019-05-14',
              '2019-05-15','2019-05-16','2019-05-17','2019-05-18','2019-05-19','2019-05-20','2019-05-21',
              '2019-05-22','2019-05-23','2019-05-24','2019-05-25','2019-05-26','2019-05-27','2019-05-28',
              '2019-05-29','2019-05-30','2019-05-31'
            ]
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
