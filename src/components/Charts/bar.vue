<template>
    <div :id="id" :class="className" :style="{height:height,width:width}" />


</template>
<script>

</script>
<script>
  import echarts from 'echarts'
  import resize from './mixins/resize'

  export default {
    mixins: [resize],
    props: {
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
        default: '200px'
      }
    },
    data() {
      return {
        chart: null

      }
    },
    mounted() {
      this.chart = echarts.init(document.getElementById(this.id))
      let option = {
        legend:{
//          x: 60,
          left:'left',
          top: 15,
          textStyle:{
            color:'#fff'
          },
        },
        tooltip: {},
        backgroundColor: '#0A1123',
        color: ['rgba(24,177,175,0.9)','rgba(15,109,205,0.9)'],
        dataset: {
          source: [
            ['product', '未完成', '已完成'],
            ['大型机', 43, 93],
            ['中型机', 83, 73],
            ['小型机', 86, 65],

          ]
        },
        xAxis : [
          {
            type : 'category',
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            }
          }
        ],
        yAxis:[
          {
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            }
          }
        ],
        series: [
          {type: 'bar',barWidth: '15%',
            markLine : {
              data : [
                {type : 'min', name: '最小值'}
              ]
            },
          },
          {type: 'bar',barWidth: '15%',
            markLine : {
              data : [
                {type : 'max', name: '最大值'}
              ]
            },
          },

        ]
      };
      this.chart.setOption(option)
    },
  }
</script>

<style>
</style>
