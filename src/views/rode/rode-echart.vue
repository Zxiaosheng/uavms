<template>
  <div class="chart-container">

    <el-row :gutter="20">
      <el-col :span="12">
        <div :id="id" class="grid-content" :class="className" style="height:430px;width:100%;padding: 0 20px 0 20px"/>
      </el-col>
      <el-col :span="12">
        <div :id="id1" class="grid-content" :class="className1" style="height:430px;width:100%;padding: 0 20px 0 20px"/>
      </el-col>
    </el-row>

    <el-row >
      <el-col :span="24">
        <div :id="id2" class="grid-content" :class="className2" style="height:430px;width:100%;padding: 0 20px 0 20px"/>
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
  import { fetchChartList,fetchMChartList } from '@/api/rode-echart'
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
        list:[]
      }
    },
    mounted() {

      var colors = ['#5793f3', '#d14a61', '#675bba'];

      this.chart = echarts.init(document.getElementById(this.id));
      this.chart1 = echarts.init(document.getElementById(this.id1));
      this.chart2 = echarts.init(document.getElementById(this.id2));


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

      //某某地区飞行数据实时展示
      fetchMChartList().then(response =>{
        let list1=response.data.items

      let option1 = {
        backgroundColor: 'rgb(31,45,41)',
        textStyle: {
          color: '#fff'
        },
        title: {
          text: '飞行数据实时展示',
          top:'10',
          textStyle: {
            color: '#fff'
          }
        },
        // grid:{
        //   width:'100%'
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: 'rgba(20,200,212,0.3)'
            }
          }
        },
        legend: {
          data:['飞行路线数', '飞行机器数'],
          top:'10',
          textStyle: {
            color: '#fff'
          }
        },
        toolbox: {
          show: true,
          feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: {
          show: false,
          start: 0,
          end: 100
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            data: (function (){
              var now = new Date();
              var res = [];
              var len = 10;
              while (len--) {
                res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
                now = new Date(now - 2000);
              }
              return res;
            })()
          },
          {
            type: 'category',
            boundaryGap: true,
            data: (function (){
              var res = [];
              var len = 10;
              while (len--) {
                res.push(10 - len - 1);
              }
              return res;
            })()
          }
        ],
        yAxis: [
          {
            type: 'value',
            scale: true,
            name: '路线总数',
            max: 30,
            min: 0,
            boundaryGap: [0.2, 0.2],

          },
          {
            type: 'value',
            scale: true,
            name: '机器总数',
            max: 1200,
            min: 0,
            boundaryGap: [0.2, 0.2]
          }
        ],
        series: [
          {
            name:'飞行路线数',
            type:'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            color:'rgb(44,133,222)',
            data:(function (){
              var res = [];
              var len = 10;
              while (len--) {
                res.push(list1.m);

              }
              return res;
            })()
          },
          {
            name:'飞行机器数',
            type:'line',
            data:(function (){
              var res = [];
              var len = 0;
              while (len < 10) {
                res.push(list1.r);
                len++;
              }
              return res;
            })()
          }
        ]
      };
      this.chart1.setOption(option1);
      app.count = 11;
      setInterval(()=>{
        let axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');

        var data0 = option1.series[0].data;
        var data1 = option1.series[1].data;
        data0.shift();
        data0.push(Math.round(Math.random() * 1000));
        data1.shift();
        data1.push((Math.random() * 10 + 5).toFixed(1) - 0);

        option1.xAxis[0].data.shift();
        option1.xAxis[0].data.push(axisData);
        option1.xAxis[1].data.shift();
        option1.xAxis[1].data.push(app.count++);

        this.chart1.setOption(option1);
      }, 2100);
      })

      //
      var category = [];
      var dottedBase = +new Date();
      var lineData = [];
      var barData = [];

      for (var i = 0; i < 20; i++) {
        var date = new Date(dottedBase += 3600 * 24 * 1000);
        category.push([
          date.getFullYear(),
          date.getMonth() + 1,
          date.getDate()
        ].join('-'));
        var b = Math.random() * 200;
        var d = Math.random() * 200;
        barData.push(b)
        lineData.push(d + b);
      }


// 预计飞行总数与实际飞行总数差距图
     let option2 = {
        backgroundColor: 'rgb(31,45,41)',
       title: {
         text: 'xx地区每日预计飞行路线总数与实际飞行路线总数对比',
         top:'10',
         textStyle: {
           color: '#fff'
         }
       },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['实际飞行总数', '预计飞行总数'],
          textStyle: {
            color: '#ccc'
          }
        },
        xAxis: {
          data: category,
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          }
        },
        yAxis: {
          splitLine: {show: false},
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          }
        },
        series: [{
          name: '实际飞行总数',
          type: 'line',
          smooth: true,
          showAllSymbol: true,
          symbol: 'emptyCircle',
          symbolSize: 15,
          data: lineData
        }, {
          name: '预计飞行总数',
          type: 'bar',
          barWidth: 10,
          itemStyle: {
            normal: {
              barBorderRadius: 5,
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: '#14c8d4'},
                  {offset: 1, color: '#43eec6'}
                ]
              )
            }
          },
          data: barData
        },  {
          name: '实际飞行总数与预计飞行总数差额',
          type: 'pictorialBar',
          symbol: 'rect',
          itemStyle: {
            normal: {
              color: '#0f375f'
            }
          },
          symbolRepeat: true,
          symbolSize: [12, 4],
          symbolMargin: 1,
          z: -10,
          data: lineData
        }]
      };
     this.chart2.setOption(option2);
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
    /*border: 2px solid red;*/
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
