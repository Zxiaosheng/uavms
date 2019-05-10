<template>
  <div class="chart-container">

    <el-row :gutter="20">
      <el-col :span="12">
        <div :id="id" class="grid-content" :class="className" style="height:430px;width:100%;padding:100px 20px 0 20px"/>
      </el-col>
      <el-col :span="12">
        <div :id="id1" class="grid-content" :class="className1" style="height:430px;width:100%;padding:100px 20px 0 0px"/>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <div :id="id2" class="grid-content" :class="className2" style="height:430px;width:100%;padding:0 20px 0 20px"/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import echarts from 'echarts'
  //行政区划图
  import 'echarts/lib/chart/map'
  //引入对应图表的js文件
  import 'echarts/map/js/china.js'
  import resize from '../../components/Charts/mixins/resize'
  import { fetchChartList,fetchMChartList } from '@/api/trouble-echart'
  export default {
    name: "rode-echart",
    mixins: [resize],
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      className1: {
        type: String,
        default: 'chart1'
      },
      className2: {
        type: String,
        default: 'chart2'
      },
      id: {
        type: String,
        default: 'chart'
      },
      id1: {
        type: String,
        default: 'chart1'
      },
      id2: {
        type: String,
        default: 'chart2'
      }
    },
    data() {
      return {
        chart: null,
        chart1: null,
        listechart:[],
      }
    },
    mounted() {

      var colors = ['#5793f3', '#d14a61', '#675bba'];
      var dataxAxis = ['电机故障', '电源故障', '机械故障', '摄像头故障', '底座故障'];
      var datayAxis = ['故障次数'];
      var data = [220, 182, 191];
      var yMax = 500;
      var dataShadow = [];

      this.chart = echarts.init(document.getElementById(this.id));
      this.chart1 = echarts.init(document.getElementById(this.id1));
      this.chart2 = echarts.init(document.getElementById(this.id2));

      //柱状图
      fetchChartList().then(response => {
        this.listechart = response.data.items

        this.chart.setOption({
          backgroundColor: 'rgb(31,45,41)',

          title: {
            text: '无人机故障统计图',
            // subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom',
            textStyle: {
              color: '#fff'
            }
          },
          xAxis: {
            data: dataxAxis,
            axisLabel: {
              inside: false,
              textStyle: {
                color: '#fff'
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            z: 10
          },
          yAxis: {
            nameTextStyle: {
              color: '#fff'
            },
            name : '故障次数',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#fff'
              }
            }
          },
          dataZoom: [
            {
              type: 'inside'
            }
          ],
          series: [
            { // For shadow
              type: 'bar',
              itemStyle: {
                normal: {color: 'rgba(0,0,0,0.05)'}
              },
              barGap:'-100%',
              barCategoryGap:'40%',
              data: this.list,
              animation: false
            },
            {
              type: 'bar',
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#83bff6'},
                      {offset: 0.5, color: '#188df0'},
                      {offset: 1, color: '#188df0'}
                    ]
                  )
                },
                emphasis: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#2378f7'},
                      {offset: 0.7, color: '#2378f7'},
                      {offset: 1, color: '#83bff6'}
                    ]
                  )
                }
              },
              data: this.listechart
            }
          ]
        })
      })

      //饼图
      fetchChartList().then(response => {
        this.listechart = response.data.items

        this.chart1.setOption({
          backgroundColor: 'rgb(31,45,41)',

          title: {
            text: '无人机故障占比饼图',
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
              name: '无人机故障占比',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data:
                // this.list
                [
                {value:300, name:'电机故障'},
                {value:332,name:'电源故障'},
                {value:325,name:'机械故障'},
                {value:432,name:'摄像头故障'},
                {value:402,name:'底座故障'}
              ]
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
                  color: '#188df0',
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
  .chart-container{
    position: relative;
    width: 100%;
    /*height: calc(125vh - 6px);*/
    height: 100%;
    background-color: rgb(48,65,86);
  }
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
    margin-top: 10px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
