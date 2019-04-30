<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
  import echarts from 'echarts'
  import resize from './mixins/resize'
  export default {
    name: "BarChart",
    props: {
      mixins: [resize],
      className: {
        type: String,
        default: 'chartBar'
      },
      id: {
        type: String,
        default: 'chartBar'
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
      this.initChart()
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart(){
        this.chart=echarts.init(document.getElementById(this.id))

        this.chart.setOption({
          title: {
            text: '无人机当前服役情况',
            subtext: '数据分析'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['峰值']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: 'category',
            data: ['巴西','印尼','美国','印度','中国']
          },
          series: [
            {
              name: '2011年',
              type: 'bar',
              data: [18203, 23489, 29034, 104970, 131744],
              itemStyle: {
                color: '#3ea8d9'
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
