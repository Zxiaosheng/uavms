<template>
  <div :id="id" :class="className" style="height:300px;width:98%"/>
</template>

<script>
  import echarts from 'echarts'
  import resize from '../mixins/resize'

  export default {
    name: "UserRoute",
    props: {
      mixins: [resize],
      dateData: {
        type: Array,
      },
      newNum: {
        type: Array,
      },
      className: {
        type: String,
        default: 'chart3'
      },
      id: {
        type: String,
        default: 'id3'
      },
    },
    mounted() {
      this.chart = echarts.init(document.getElementById(this.id));
      this.chart.setOption({
        backgroundColor: '#2c343c',
        title: {
          text: '用户统计',
          textStyle: {
            color: "white",
            fontWeight: "600",
            fontFamily: "楷体",
          },
        },
        xAxis: {
          type: 'category',
          data: this.dateData,
          axisLine: {
            lineStyle: {
              color: 'white'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: 'white'
            }
          }
        },
        series: [{
          data: this.newNum,
          type: 'bar',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: '#188df0'},
                  {offset: 0.5, color: '#004881'},
                  {offset: 1, color: '#2B2F3A'}
                ]
              )
            }
          },
        }]
      })    },
  }
</script>

<style>
</style>
