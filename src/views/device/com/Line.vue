<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
  import echarts from 'echarts'
  import resize from '@/components/Charts/mixins/resize'
  export default {
    name: "Pie",
    mixins: [resize],
    props: {
      className: {
        type: String,
        default: 'chart2'
      },
      id: {
        type: String,
        default: 'chart2'
      },
      width: {
        type: String,
        default: '60%'
      },
      height: {
        type: String,
        default: '400px'
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
        title: {
          text: '设备执行任务统计'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data:['消防','测绘','物流','医疗','天眼']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一','周二','周三','周四','周五','周六','周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name:'消防',
            type:'line',
            stack: '总量',
            data:[120, 132, 101, 134, 90, 230, 210]
          },
          {
            name:'测绘',
            type:'line',
            stack: '总量',
            data:[220, 182, 191, 234, 290, 330, 310]
          },
          {
            name:'物流',
            type:'line',
            stack: '总量',
            data:[150, 232, 201, 154, 190, 330, 410]
          },
          {
            name:'医疗',
            type:'line',
            stack: '总量',
            data:[320, 332, 301, 334, 390, 330, 320]
          },
          {
            name:'天眼',
            type:'line',
            stack: '总量',
            data:[820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }

      this.chart.setOption(option)
    }
  }
</script>

<style scoped>

</style>
