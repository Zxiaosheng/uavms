<template>
  <div :id="id1" class="grid-content" :class="className1" style="height:430px;width:100%;"/>
</template>

<script>
  import echarts from 'echarts'
  import resize from '../../components/Charts/mixins/resize'
  import { fetchChartList,fetchMChartList } from '@/api/rode-echart'
    export default {
        name: "RodeChartBar",
        mixins: [resize],
        props: {
          className1: {
            type: String,
            default: 'chart1'
          },
          id1: {
            type: String,
            default: 'chart1'
          },
        },
        data() {
          return {
            chart1: null,
            list:[]
          }
        },
        mounted(){
          //某某地区飞行数据实时展示
          this.chart1 = echarts.init(document.getElementById(this.id1));

          fetchMChartList().then(response =>{
            let list1=response.data.items

            let option1 = {
              // backgroundColor: 'rgb(31,45,41)',
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
        }
    }
</script>

<style scoped>

</style>
