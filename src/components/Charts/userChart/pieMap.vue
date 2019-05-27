<template>
  <div :id="id" :class="className" style="height:400px;width:98%"/>
</template>

<script>
  import echarts from 'echarts'
  import resize from '../mixins/resize'

  export default {
    name: "UserRoute",
    mixins: [resize],
    props: {
      place: {
        type: Array,
      },
      list: {
        type: Array,
      },
      className: {
        type: String,
        default: 'chart5'
      },
      id: {
        type: String,
        default: 'id5'
      },
    },
    mounted() {
      this.chart = echarts.init(document.getElementById(this.id));
      this.chart.setOption({
        backgroundColor: '#2c343c',
        title: {
          text: '用户人数城市分布',
          left: 'left',
          top: 20,
          textStyle: {
            color: "white",
            fontWeight: "600",
            fontFamily: "楷体",
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        visualMap: {
          show: true,
          min: 0,
          max: 20,
          inRange: {
              colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: '用户人数分布',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: pieData(this.place, this.list),
            roseType: 'radius',
            label: {
              normal: {
                textStyle: {
                  color: 'white'
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                    color: '#188df0'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              }
            },
            itemStyle: {
              normal: {
                color: '#188DF0',
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
    },
  }

  function pieData(a, b) {
    let c = [];
    for (let i = 0; i < a.length; i++) {
      c[i] = {name: a[i], value: b[i]}
    }
    return c
  }
</script>


<style>

</style>
