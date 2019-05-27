<template>
  <div :id="id" :class="className" style="height:300px;width:98%"/>
</template>

<script>
  import echarts from 'echarts'
  import resize from '../mixins/resize'
  export default {
    name: "UserRoute",
    mixins: [resize],
    props: {
      dateData: {
        type: Array,
      },
      yNum: {
        type: Array,
      },
      className: {
        type: String,
        default: 'chart1'
      },
      id: {
        type: String,
        default: 'id1'
      },
    },
    mounted() {
      this.chart = echarts.init(document.getElementById(this.id));
      //折线图
      this.chart.setOption({
        backgroundColor: '#2c343c',
        title: {
          text: '最近一年用户增加趋势',
          textStyle: {
            color: "white",
            fontWeight: "600",
            fontFamily: "楷体",
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: this.dateData,
            axisLine: {
              lineStyle: {
                color: 'white'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: 'white'
              }
            },
            splitArea: {
              areaStyle: {
                color: 'blue',
                backgroundColor: 'blue',
              }
            },
          },
        ],
        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            data: this.yNum,
            type: 'line',
            areaStyle: {
              color: '#004881',
            },
            itemStyle: {
              normal: {
                color: '#0f375f',
              }
            },
          },
        ]
      })
    },
  }
</script>
<style>

</style>
