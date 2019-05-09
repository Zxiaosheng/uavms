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
        list:[],
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
        this.list = response.data.items

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
              data: this.list
            }
          ]
        })
      })

      //某某地区飞行数据实时展示
      // fetchMChartList().then(response =>{
      //   let list1=response.data.items
      //
      //   let option1 = {
      //     backgroundColor: 'rgb(31,45,41)',
      //     textStyle: {
      //       color: '#fff'
      //     },
      //     title: {
      //       text: '飞行数据实时展示',
      //       top:'10',
      //       textStyle: {
      //         color: '#fff'
      //       }
      //     },
      //     // grid:{
      //     //   width:'100%'
      //     // },
      //     tooltip: {
      //       trigger: 'axis',
      //       axisPointer: {
      //         type: 'cross',
      //         label: {
      //           backgroundColor: 'rgba(20,200,212,0.3)'
      //         }
      //       }
      //     },
      //     legend: {
      //       data:['飞行路线数', '飞行机器数'],
      //       top:'10',
      //       textStyle: {
      //         color: '#fff'
      //       }
      //     },
      //     toolbox: {
      //       show: true,
      //       feature: {
      //         dataView: {readOnly: false},
      //         restore: {},
      //         saveAsImage: {}
      //       }
      //     },
      //     dataZoom: {
      //       show: false,
      //       start: 0,
      //       end: 100
      //     },
      //     xAxis: [
      //       {
      //         type: 'category',
      //         boundaryGap: true,
      //         data: (function (){
      //           var now = new Date();
      //           var res = [];
      //           var len = 10;
      //           while (len--) {
      //             res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
      //             now = new Date(now - 2000);
      //           }
      //           return res;
      //         })()
      //       },
      //       {
      //         type: 'category',
      //         boundaryGap: true,
      //         data: (function (){
      //           var res = [];
      //           var len = 10;
      //           while (len--) {
      //             res.push(10 - len - 1);
      //           }
      //           return res;
      //         })()
      //       }
      //     ],
      //     yAxis: [
      //       {
      //         type: 'value',
      //         scale: true,
      //         name: '路线总数',
      //         max: 30,
      //         min: 0,
      //         boundaryGap: [0.2, 0.2],
      //
      //       },
      //       {
      //         type: 'value',
      //         scale: true,
      //         name: '机器总数',
      //         max: 1200,
      //         min: 0,
      //         boundaryGap: [0.2, 0.2]
      //       }
      //     ],
      //     series: [
      //       {
      //         name:'飞行路线数',
      //         type:'bar',
      //         xAxisIndex: 1,
      //         yAxisIndex: 1,
      //         color:'rgb(44,133,222)',
      //         data:(function (){
      //           var res = [];
      //           var len = 10;
      //           while (len--) {
      //             res.push(list1.m);
      //
      //           }
      //           return res;
      //         })()
      //       },
      //       {
      //         name:'飞行机器数',
      //         type:'line',
      //         data:(function (){
      //           var res = [];
      //           var len = 0;
      //           while (len < 10) {
      //             res.push(list1.r);
      //             len++;
      //           }
      //           return res;
      //         })()
      //       }
      //     ]
      //   };
      //   this.chart1.setOption(option1);
      //   app.count = 11;
      //   setInterval(()=>{
      //     let axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');
      //
      //     var data0 = option1.series[0].data;
      //     var data1 = option1.series[1].data;
      //     data0.shift();
      //     data0.push(Math.round(Math.random() * 1000));
      //     data1.shift();
      //     data1.push((Math.random() * 10 + 5).toFixed(1) - 0);
      //
      //     option1.xAxis[0].data.shift();
      //     option1.xAxis[0].data.push(axisData);
      //     option1.xAxis[1].data.shift();
      //     option1.xAxis[1].data.push(app.count++);
      //
      //     this.chart1.setOption(option1);
      //   }, 2100);
      // })


      //饼图
      fetchChartList().then(response => {
        this.list = response.data.items

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
              data: [
                {value:300,name:'电机故障'},
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
