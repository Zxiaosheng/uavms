<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
  import echarts from 'echarts'
  import resize from '@/components/Charts/mixins/resize'
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
        chart:null
      }
    },
    mounted(){
      //图表初始化
      this.chart = echarts.init(document.getElementById(this.id));
      this.chart.setOption({
        backgroundColor: 'rgba(10,17,35,0.9)',
        title: {
//          text: '柱状图',
//          subtext:'销售分析',
          x:'center'


        },

        xAxis: [{
          type: 'category',
          boundaryGap: false,
          data: ['0', '6', '12','18', '24'],
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          }
        }],
        yAxis: [{
          type: 'value',
          min:0,
          max:120,
          interval:30,
          gridIndex:0,
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          }

        }],
        series: [{
          name: '未完成任务量',
          type: 'line',
          areaStyle: {
            color:'rgb(40,93,131)',
            backgroundColor: 'rgba(40,93,131,0.5)'
          },
          data: [120,90,65,25,0],
          itemStyle: {
            normal: {
              color: 'rgb(44,110,148)',
            }
          },
          smooth: true,
          symbol: 'none'
        },
          {
            name: '已完成任务量',
            type: 'line',
            areaStyle: {
              color: 'rgb(27,98,108)',
              backgroundColor: 'rgba(27,98,108,0.5)',
            },
            data: [0,30,55,95,120],
            itemStyle: {
              normal: {
                color: 'rgb(44,120,136)',
              }
            },
            smooth: true,
            symbol: 'none'
          }

        ],
        legend:{
          show:true,
          x:'left',
          textStyle:{
            color:'#ccc'
          },
          data:[{
            name:'未完成任务量',
            icon:'square'
            },
            {
              name:'已完成任务量',
              icon:'square'
            }]
        },

      })

    }
  }
</script>
<style>

</style>
