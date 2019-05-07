<template>
  <div class="chart-container">

    <el-row :gutter="20">
      <el-col :span="12">
        <div :id="id" class="grid-content" :class="className" style="height:430px;width:100%;padding:0 20px 0 20px"/>
      </el-col>
      <el-col :span="12">
        <div :id="id1" class="grid-content" :class="className1" style="height:430px;width:100%;padding:0 20px 0 20px"/>
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
      var dataxAxis = ['电机故障', '电源故障', '机械故障'];
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
      //         color:'rgb(20,205,212)',
      //         data:(function (){
      //           var res = [];
      //           var len = 10;
      //           while (len--) {
      //             console.log(list1)
      //             res.push(list1.m);
      //
      //           }
      //           return res;
      //         })()
      //       },
      //       {
      //         name:'飞行机器数',
      //         type:'line',
      //         color:'#0f375f',
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
      //
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
      //
      // //
      // var category = [];
      // var dottedBase = +new Date();
      // var lineData = [];
      // var barData = [];
      //
      // for (var i = 0; i < 20; i++) {
      //   var date = new Date(dottedBase += 3600 * 24 * 1000);
      //   category.push([
      //     date.getFullYear(),
      //     date.getMonth() + 1,
      //     date.getDate()
      //   ].join('-'));
      //   var b = Math.random() * 200;
      //   var d = Math.random() * 200;
      //   barData.push(b)
      //   lineData.push(d + b);
      // }


// option
//       let option2 = {
//         backgroundColor: 'rgb(31,45,41)',
//         title: {
//           text: 'xx地区每日预计飞行路线总数与实际飞行路线总数对比',
//           top:'10',
//           textStyle: {
//             color: '#fff'
//           }
//         },
//         tooltip: {
//           trigger: 'axis',
//           axisPointer: {
//             type: 'shadow'
//           }
//         },
//         legend: {
//           data: ['实际飞行总数', '预计飞行总数'],
//           textStyle: {
//             color: '#ccc'
//           }
//         },
//         xAxis: {
//           data: category,
//           axisLine: {
//             lineStyle: {
//               color: '#ccc'
//             }
//           }
//         },
//         yAxis: {
//           splitLine: {show: false},
//           axisLine: {
//             lineStyle: {
//               color: '#ccc'
//             }
//           }
//         },
//         series: [{
//           name: '实际飞行总数',
//           type: 'line',
//           smooth: true,
//           showAllSymbol: true,
//           symbol: 'emptyCircle',
//           symbolSize: 15,
//           data: lineData
//         }, {
//           name: '预计飞行总数',
//           type: 'bar',
//           barWidth: 10,
//           itemStyle: {
//             normal: {
//               barBorderRadius: 5,
//               color: new echarts.graphic.LinearGradient(
//                 0, 0, 0, 1,
//                 [
//                   {offset: 0, color: '#14c8d4'},
//                   {offset: 1, color: '#43eec6'}
//                 ]
//               )
//             }
//           },
//           data: barData
//         }, {
//           name: 'line',
//           type: 'bar',
//           barGap: '-100%',
//           barWidth: 10,
//           itemStyle: {
//             normal: {
//               color: new echarts.graphic.LinearGradient(
//                 0, 0, 0, 1,
//                 [
//                   {offset: 0, color: 'rgba(20,200,212,0.5)'},
//                   {offset: 0.2, color: 'rgba(20,200,212,0.2)'},
//                   {offset: 1, color: 'rgba(20,200,212,0)'}
//                 ]
//               )
//             }
//           },
//           z: -12,
//           data: lineData
//         }, {
//           name: 'dotted',
//           type: 'pictorialBar',
//           symbol: 'rect',
//           itemStyle: {
//             normal: {
//               color: '#0f375f'
//             }
//           },
//           symbolRepeat: true,
//           symbolSize: [12, 4],
//           symbolMargin: 1,
//           z: -10,
//           data: lineData
//         }]
//       };
//       this.chart2.setOption(option2);
    },
  }
</script>

<style scoped>
  .chart-container{
    position: relative;
    width: 100%;
    height: calc(125vh - 6px);
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
