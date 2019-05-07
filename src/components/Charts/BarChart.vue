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
      loss:{
        type: Object
      },
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

        let name=[]
        let value=[]

        for(let key in this.loss){
          name.push(this.loss[key].name)
          value.push(this.loss[key].value)
        }

        this.chart=echarts.init(document.getElementById(this.id))

        this.chart.setOption({
          title: {
            text: '无人机当前损耗情况',
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
            data: name
          },
          series: [
            {
              name: '值',
              type: 'bar',
              data: value,
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
