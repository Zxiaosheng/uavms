<template>
  <div :id="id" :class="className" style="height:300px;width:98%"/>
</template>

<script>
  import echarts from 'echarts'
  import resize from '../mixins/resize'

  export default {
    mixins: [resize],
    name: "UserRoute",
    props: {
      tableData: {
        type: Object,
      },
      className: {
        type: String,
        default: 'chart2'
      },
      id: {
        type: String,
        default: 'id2'
      },
    },
    mounted() {
      this.chart = echarts.init(document.getElementById(this.id));
      var spirit = 'path://M40.02-99c2.07,1.21,4.26,2.25,6.19,3.66c5.94,4.34,8.23,12.57,4.95,19.79 c-3.21,7.08-6.82,14.03-10.86,20.67c-2.17,3.56-1.25,5.38,1.99,6.36c2.94,0.89,6.36,1.91,9.15,1.21c5.51-1.4,8.33,1.23,10.66,5.29 c4.71,8.22,9.72,16.29,13.84,24.8C81.06-6.65,89,0.4,99.56,5.17C109.82,9.8,120,14.7,129.85,20.15c4.72,2.61,9.09,6.37,10.24,12.97 c-2.89-1.93-5.2-3.75-7.78-5.04c-0.99-0.5-2.6,0.22-4.83,0.5c-5.36-9.35-16.8-9.4-26.74-12.62C91.68,13.04,81.82,11.37,75.66,3 c-5.98-8.13-11.61-16.52-17.4-24.79c-0.46-0.66-0.98-1.27-1.66-2.16c-3.21,7.75-6.78,15-9.12,22.63c-1.15,3.76-0.64,8.37,0.26,12.33 c0.81,3.59,3.01,6.92,4.87,10.22c6.73,11.95,2.41,22.89-2.91,33.75c-0.35,0.72-0.86,1.43-1.46,1.97 c-7.11,6.38-14.48,12.5-21.24,19.22c-2.08,2.07-3.1,5.7-3.62,8.77c-1.92,11.44-3.81,22.92-4.93,34.46 c-0.5,5.16,1.06,10.49,1.28,15.75c0.23,5.7,0.39,11.47-0.15,17.13c-1.15,12.11-2.83,24.17-4.11,36.27c-0.18,1.72,0.8,3.53,1.13,5.33 c0.88,4.76-0.22,6.23-4.71,5.17c-4.53-1.06-8.86-2.94-14.27-4.8c1.98-1.62,2.84-2.83,3.94-3.12c5.42-1.44,7-5.2,6.39-10.23 c-1.39-11.39-3.15-22.73-4.24-34.14c-0.53-5.56,0.16-11.23,0.24-16.85c0.06-4.49,0.01-8.97,0.01-14.72 c-2.79,1.53-5.2,2.27-6.79,3.83c-4.26,4.19-8.39,8.56-12.11,13.22c-1.55,1.95-2.19,4.76-2.79,7.29c-0.47,1.99,0.6,5.02-0.48,6.05 c-2.17,2.08-5.2,3.79-8.13,4.38c-3.61,0.73-7.49,0.18-12.26,0.18c6.34-8.69,11.91-16.11,17.22-23.71c3.29-4.71,6.23-9.67,9.24-14.58 c2.15-3.5,3.76-7.4,6.3-10.57c5.38-6.73,6.74-14.28,6.72-22.64C0.88,68.3,1.36,57.91,2.26,47.58c0.69-7.85,2.15-15.67,3.7-23.41 c0.77-3.83,2.89-7.39,3.72-11.22c1.83-8.4-1.9-16-4.38-23.95C2.96-5.34-0.31,0.12-1.5,6c-1.96,9.72-7.34,17.44-12.26,25.57 c-4.39,7.25-8.79,14.52-12.75,22.01c-2.64,5-4.5,10.41-6.83,15.92c-4.82-5.28-4.65-10.59-0.94-16.97 C-21.4,30.4-12.08,6.78-6.17-18.12c1.4-5.88,1.24-12.11,2.23-18.12c1.2-7.27,4.15-9.56,11.39-9.69c8.65-0.14,13.86-4.77,14.48-13.51 c0.35-5.01,0.16-10.11-0.28-15.12c-0.82-9.3,2.49-16.57,10.17-21.69c2.08-1.39,4.78-1.87,7.2-2.76C39.35-99,39.69-99,40.02-99z';
      let maxData = (this.tableData.man) + (this.tableData.women);
      this.chart.setOption({
        color: ['#188df0'],
        backgroundColor: '#2c343c',
        title: {
          text: '用户性别比例',
          textStyle: {
            color: "white",
            fontWeight: "600",
            fontFamily: "楷体",
          },
        },
        tooltip: {},
        xAxis: {
          max: maxData,
          splitLine: {show: false},
          offset: 10,
          axisLine: {
            lineStyle: {
              color: 'white'
            }
          },
          axisLabel: {
            margin: 10
          }
        },
        yAxis: {
          data: ['男', '女',],
          inverse: true,
          axisTick: {show: false},
          axisLine: {show: false},
          axisLabel: {
            margin: 10,
            textStyle: {
              color: 'white',
              fontSize: 16
            }
          }
        },
        grid: {
          top: 'center',
          height: 200,
          left: 70,
          right: 100
        },
        series: [{
          type: 'pictorialBar',
          symbol: spirit,
          symbolRepeat: 'fixed',
          symbolMargin: '5%',
          symbolClip: true,
          symbolSize: 30,
          symbolBoundingData: maxData,
          data: [this.tableData.man, this.tableData.women],
          markLine: {
            symbol: 'none',
            label: {
              normal: {
                formatter: 'max: {c}',
                position: 'start'
              }
            },
            areaStyle: {
              color: '#188df0',
            },
            itemStyle: {
              normal: {
                color: '#0f375f',
              }
            },
            lineStyle: {
              normal: {
                color: '#188df0',
                type: 'dotted',
                opacity: 0.2,
                width: 2
              }
            },
            data: [{
              type: 'max'
            }]
          },
          z: 10
        }, {
          type: 'pictorialBar',
          itemStyle: {
            normal: {
              opacity: 0.2,
              color:'#188df0'
            }
          },
          label: {
            normal: {
              show: true,
              formatter: function (params) {
                return (params.value / maxData * 100).toFixed(1) + ' %';
              },
              position: 'right',
              offset: [10, 0],
              textStyle: {
                color: '#188df0',
                fontSize: 18
              }
            }
          },
          animationDuration: 0,
          symbolRepeat: 'fixed',
          symbolMargin: '5%',
          symbol: spirit,
          symbolSize: 30,
          symbolBoundingData: maxData,
          data: [maxData, maxData],
          z: 5
        }]
      });
    },
  }
</script>

<style>

</style>
