<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
  import echarts from 'echarts'
  import resize from '@/components/Charts/mixins/resize'

  import { getAllTaskSta } from '@/api/device'
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
        chart: null,
        tasks: []

      }
    },
    methods: {
      async getAllTask(){

        const { data } = await getAllTaskSta()

        let option = {
          title: {
            text: '各类设备总数'
          },
          color:['rgb(37,96,149)','rgb(67,164,215)','rgb(77,191,254)','rgb(78,236,239)','rgb(133,190,135)'],
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:['总数']
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
            data: ['消防','医疗','交通','物流','巡警','其他']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name:'总数',
              type:'line',
              stack: '总量',
              data:data
            }
          ]
        }

        this.chart.setOption(option)
      }
    },
    mounted() {
      this.chart = echarts.init(document.getElementById(this.id))

      this.getAllTask()
    }
  }
</script>

<style scoped>

</style>
