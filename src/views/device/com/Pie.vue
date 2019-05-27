<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
  import echarts from 'echarts'
  import resize from '@/components/Charts/mixins/resize'
  import { getAllType,getAllSta } from '@/api/device'

  export default {
    name: "Pie",
    mixins: [resize],
    props: {
      className: {
        type: String,
        default: 'chart1'
      },
      id: {
        type: String,
        default: 'chart1'
      },
      width: {
        type: String,
        default: '30%'
      },
      height: {
        type: String,
        default: '400px'
      }
    },
    data() {
      return {
        chart: null,
        typeData: [],
        deviceStatistics: []
      }
    },
    methods: {
      async getAllType(){
        const { data } = await getAllType()
        this.typeData=data

        this.getAllSta()
      },

      async getAllSta(){
        const { data } = await getAllSta()
        this.deviceStatistics=data

        let option = {
          title : {
            text: '设备使用统计',
            subtext: '来自使用记录',
            x:'center'
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            // data: ['微型','小型','中型','大型','特大型']
            data: this.typeData
          },
          series : [
            {
              name: '访问来源',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              // data:[
              //   {value:335, name:'微型'},
              //   {value:310, name:'小型'},
              //   {value:234, name:'中型'},
              //   {value:234, name:'大型'},
              //   {value:135, name:'特大型'}
              // ],
              data: this.deviceStatistics,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
              color:['rgb(37,96,149)','rgb(67,164,215)','rgb(77,191,254)','rgb(78,236,239)','rgb(133,190,135)']
            }
          ]
        }

        this.chart.setOption(option)
      }

    },
    mounted() {


      this.chart = echarts.init(document.getElementById(this.id))

      this.getAllType()
    }
  }
</script>

<style scoped>

</style>
