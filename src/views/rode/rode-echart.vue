<template>
  <div>
    <div :id="id" :class="className" :style="{height:height,width:width}" />
    <!--<div id="chart1" class="chart1" style="height: 400px;weight: 400px" />-->
  </div>
</template>

<script>
  import echarts from 'echarts'
  import resize from '../../components/Charts/mixins/resize'
  export default {
    name: "rode-echart",
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
        default: '30%'
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

      var colors = ['#5793f3', '#d14a61', '#675bba'];
      this.chart = echarts.init(document.getElementById(this.id));
      // chart1 = echarts.init(document.getElementById(chart1));

      this.chart.setOption({
        backgroundColor: '#2c343c',

        title: {
          text: '福州市五区飞行航程统计饼图',
          left: 'center',
          top: 20,
          textStyle: {
            color: '#ccc'
          }
        },

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
            data: [
              {value: 335, name: '仓山区'},
              {value: 310, name: '晋安区'},
              {value: 274, name: '鼓楼区'},
              {value: 235, name: '台江区'},
              {value: 400, name: '马尾区'}
            ].sort(function (a, b) {
              return a.value - b.value;
            }),
            roseType: 'radius',
            label: {
              normal: {
                textStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              }
            },
            itemStyle: {
              normal: {
                color: '#c23531',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
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
      // chart1.setOption({
      //   color: colors,
      //
      //   tooltip: {
      //     trigger: 'axis',
      //     axisPointer: {
      //       type: 'cross'
      //     }
      //   },
      //   grid: {
      //     right: '20%'
      //   },
      //   toolbox: {
      //     feature: {
      //       dataView: {show: true, readOnly: false},
      //       restore: {show: true},
      //       saveAsImage: {show: true}
      //     }
      //   },
      //   legend: {
      //     data:['蒸发量','降水量','平均温度']
      //   },
      //   xAxis: [
      //     {
      //       type: 'category',
      //       axisTick: {
      //         alignWithLabel: true
      //       },
      //       data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
      //     }
      //   ],
      //   yAxis: [
      //     {
      //       type: 'value',
      //       name: '蒸发量',
      //       min: 0,
      //       max: 250,
      //       position: 'right',
      //       axisLine: {
      //         lineStyle: {
      //           color: colors[0]
      //         }
      //       },
      //       axisLabel: {
      //         formatter: '{value} ml'
      //       }
      //     },
      //     {
      //       type: 'value',
      //       name: '降水量',
      //       min: 0,
      //       max: 250,
      //       position: 'right',
      //       offset: 80,
      //       axisLine: {
      //         lineStyle: {
      //           color: colors[1]
      //         }
      //       },
      //       axisLabel: {
      //         formatter: '{value} ml'
      //       }
      //     },
      //     {
      //       type: 'value',
      //       name: '温度',
      //       min: 0,
      //       max: 25,
      //       position: 'left',
      //       axisLine: {
      //         lineStyle: {
      //           color: colors[2]
      //         }
      //       },
      //       axisLabel: {
      //         formatter: '{value} °C'
      //       }
      //     }
      //   ],
      //   series: [
      //     {
      //       name:'蒸发量',
      //       type:'bar',
      //       data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
      //     },
      //     {
      //       name:'降水量',
      //       type:'bar',
      //       yAxisIndex: 1,
      //       data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
      //     },
      //     {
      //       name:'平均温度',
      //       type:'line',
      //       yAxisIndex: 2,
      //       data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
      //     }
      //   ]
      // })
    }
  }
</script>

<style scoped>

</style>
