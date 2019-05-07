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
        isRouterAlive:undefined,
        progressData:[{value: 0, name: '进度'}],
        occupancyData:[{value: 80, name: '占用率'}]
      }
    },
    mounted() {
      //初始化echarts实例
      this.initChart();
      setInterval(()=>{
        this.progressData[0].value += 1
        this.occupancyData[0].value -= this.occupancyData[0].value/100
        if(this.progressData[0].value > 100){
          this.progressData[0].value = 0;
        }
        this.initChart()
      },1000)
    },
    beforeDestroy() {
      if(this.initChart){
        clearInterval(this.initChart)
      }
      if (!this.chart) {
        return
      }
      this.chart.dispose();
      this.chart = null
    },
    methods:{
      initChart() {
        //创建echarts实例
        this.chart = echarts.init(document.getElementById(this.id))
        //完成图表绘制配置
        this.chart.setOption({
          tooltip : {
            formatter: "{a} <br/>{c} {b}"
          },
          title: {
            top:'10',
            left:'20',
            text: '机器实时占用率与任务实时进度',
            textStyle:{
              color:'#fff'
            }
          },
          series : [
            {
              name: '当日任务进度',
              type: 'gauge',
              center: ['70%', '55%'],
              z: 3,
              min: 0,
              max: 100,
              splitNumber: 10,
              radius: '75%',
              // 坐标轴线
              axisLine: {
                lineStyle: {
                  width: 6,
                  color:[[0.2, '#ff8280'], [0.8, '#65d0de'],[1, 'rgb(79, 192, 141)']],
                  shadowColor: 'rgba(101, 208, 222, 0.8)',
                  shadowBlur: 100
                }
              },
              // 坐标轴小标记
              axisTick: {
                length: 20,
                lineStyle: {
                  color: 'auto'
                }
              },
              // 分隔线
              splitLine: {
                length: 10,
                lineStyle: {
                  color: 'auto'
                }
              },
              // 刻度样式
              axisLabel: {
                backgroundColor: 'auto',
                borderRadius: 2,
                color: '#fff',
                padding: 3,
                textShadowBlur: 2,
                textShadowOffsetX: 1,
                textShadowOffsetY: 1,
                textShadowColor: '#fff'
              },
              // 表盘中心名称
              title : {
                fontWeight: 'bolder',
                fontSize: 20,
                fontStyle: 'normal',
                color:'#fff'
              },
              detail : {
                formatter: value=>{
                  return value + '%'
                },
                fontWeight: 'bolder',
                borderRadius: 3,
                backgroundColor: '#65d0de',
                borderColor: '#aaa',
                shadowBlur: 5,
                shadowColor: '#333',
                shadowOffsetX: 0,
                shadowOffsetY: 3,
                borderWidth: 2,
                textBorderColor: '#000',
                textBorderWidth: 2,
                textShadowBlur: 2,
                textShadowColor: '#fff',
                textShadowOffsetX: 0,
                textShadowOffsetY: 0,
                fontFamily: 'Arial',
                width: 100,
                color: '#eee',
                rich: {}
              },
              color:'#fff',
              data:this.progressData
            },
            {
              name: '转速',
              type: 'gauge',
              center: ['30%', '55%'],
              radius: '60%',
              min:0,
              max:100,
              endAngle:45,
              splitNumber:10,
              // 坐标轴线
              axisLine: {
                lineStyle: {
                  width: 6,
                  color:[[0.8, 'rgb(79, 192, 141)'], [1, '#ff8280']],
                  shadowColor: 'rgba(79, 192, 141, 0.8)',
                  shadowBlur: 60
                }
              },
              // 坐标轴小标记
              axisTick: {
                length:12,
                lineStyle: {
                  color: 'auto'
                }
              },
              // 分隔线
              splitLine: {
                length:20,
                lineStyle: {
                  color: 'auto'
                }
              },
              pointer: {
                width:4
              },
              title: {
                offsetCenter: [0, '-30%'],
                fontWeight: 'bolder',
                fontSize: 18,
                fontStyle: 'normal',
                color:'#fff'
              },
              detail: {
                fontWeight: 'bolder',
                formatter: function (value) {
                  value = (value + '').split('.');
                  value.length < 2 && (value.push('00'));
                  return ('00' + value[0]).slice(-2)
                    + '.' + (value[1] + '00').slice(0, 2)+'%';
                },
              },
              data:this.occupancyData
            }
          ]
        },true);
      }
    }
  }
</script>

<style scoped>

</style>
