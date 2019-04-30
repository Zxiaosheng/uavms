<template>
  <div>
    <div :id="id" :class="className" :style="{height:height,width:width}" />
  </div>

</template>

<script>
  import echarts from 'echarts'
  import resize from './mixins/resize'

  export default {
    mixins: [resize],
    name: "RadarChart",
    props: {
      res: {
        type: Object
      },
      className: {
        type: String,
        default: 'chartRadar'
      },
      id: {
        type: String,
        default: 'chartRadar'
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
      console.log("res:")
      console.log(this.res)
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
            text: '无人机性能分析图'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            x: 'center',
            data:['性能指标']
          },
          radar: [
            {
              indicator: [
                {text: '品牌', max: 100},
                {text: '内容', max: 100},
                {text: '可用性', max: 100},
                {text: '功能', max: 100},
                {text: '功能', max: 100}
              ],
              center: ['50%','55%'],
              radius: 100
            }
          ],
          series: [
            {
              type: 'radar',
              tooltip: {
                trigger: 'item'
              },
              itemStyle: {
                normal: {
                  areaStyle:{type: 'default'},
                  color: '#3ea8d9'
                },
              },
              data: [
                {
                  value: [60,73,85,40,60],
                  name: '无人机性能分析'
                }
              ]
            }
          ]
        })
      }
    }
  }
</script>

<style scoped>

</style>
