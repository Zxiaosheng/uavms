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
        data:[
          ['score', 'amount', 'type'],
          [80, 8000, '其他任务'],
          [70, 7000, '医疗任务'],
          [60, 6000, '交通任务'],
          [50, 5000, '物流任务'],
          [40, 4000, '巡警任务'],
          [30, 3000, '消防任务'],
        ]
      }
    },
    mounted() {
      //数据包装处理
      this.data.map(item=>{
        if(typeof item[1] === 'number' && typeof item[0] === 'number'){
          item[1] = this.getRndInteger(0,10000)
          item[0] = parseFloat((item[1]/10000)*100)
        }
      })
      this.initChart();
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
          dataset: {
            source: this.data
          },
          title: {
            top:'10',
            right:'20',
            text: '服务领域',
            textStyle:{
              color:'#fff'
            }
          },
          grid: {
            containLabel: true,
            left:'22'
          },
          xAxis: {
            name: '服务数',
            axisLine:{
              lineStyle:{
                color:'#fff'
              }
            },
          },
          yAxis: {
            name:'领域',
            type: 'category',
            axisLine:{
              lineStyle:{
                color:'#fff'
              }
            },
          },
          visualMap: {
            orient: 'horizontal',
            left: 'center',
            min: 10,
            max: 100,
            text: ['高服务域', '低服务域'],
            textStyle:{
              color:'#fff'
            },
            // Map the score column to color
            dimension: 0,
            inRange: {
              color: ['#D7DA8B', '#E15457']
            }
          },
          series: [
            {
              type: 'bar',
              encode: {
                // Map the "amount" column to X axis.
                x: 'amount',
                // Map the "type" column to Y axis
                y: 'type'
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
