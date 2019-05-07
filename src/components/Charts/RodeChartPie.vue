<template>
  <div :id="id" class="grid-content" :class="className" style="height:430px;width:100%;padding: 0 20px 0 20px"/>
</template>

<script>
  import echarts from 'echarts'
  //行政区划图
  import 'echarts/lib/chart/map'
  //引入对应图表的js文件
  import 'echarts/map/js/china.js'
  import resize from '../../components/Charts/mixins/resize'
  import { fetchChartList,fetchMChartList } from '@/api/rode-echart'
    export default {
        name: "RodeChartPie",
        mixins: [resize],
        props: {
          className: {
            type: String,
            default: 'chart'
          },
          id: {
            type: String,
            default: 'chart'
          }
        },
        data() {
          return {
            chart: null,
            list:[]
          }
        },
        mounted() {

        this.chart = echarts.init(document.getElementById(this.id));


        //饼图
        fetchChartList().then(response => {
          this.list = response.data.items

          this.chart.setOption({
            backgroundColor: 'rgb(31,45,41)',

            title: {
              text: '福州市五区飞行路线总数统计饼图',
              left: 'center',
              top: 20,
              textStyle: {
                color: '#ffffff'
              }
            },
            // grid:{
            //   width:'100%'
            // },

            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },

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
                name: '飞行航程',
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data:this.list
                //   [
                //   {value:300,name:'仓山区'},
                //   {value:332,name:'晋安区'},
                //   {value:325,name:'鼓楼区'},
                //   {value:432,name:'台江区'},
                //   {value:402,name:'马尾区'}
                // ]
                  .sort(function (a, b) {
                    return a.value - b.value;
                  }),
                roseType: 'radius',
                label: {
                  normal: {
                    textStyle: {
                      color: '#ffffff'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    lineStyle: {
                      color: '#ffffff'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#0f375f',
                    // shadowBlur: 200,
                    // shadowColor: 'rgba(0, 0, 0,0.5)'
                  }
                },

                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                  return Math.random() * 200;
                }
              }
            ]
          })
        })
      },
    }
</script>

<style scoped>

</style>
