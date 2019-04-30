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
        let val=[]

        for(let key in this.res){
          let obj={
            text: this.res[key].name,
            max: 1
          }
          name.push(obj)
          val.push(this.res[key].value)
        }

        console.log(val)

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
              indicator: name,
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
                  value: val,
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
