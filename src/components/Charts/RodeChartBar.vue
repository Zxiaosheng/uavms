<template>
  <div :id="id1" class="grid-content" :class="className1" style="height:500px;width:100%;"/>
</template>

<script>
  import echarts from 'echarts'
  import resize from '../../components/Charts/mixins/resize'
  import {fetchChartLine1,fetchChartLine2} from '@/api/rode-echart'
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
          cp:{
            type: Number
          }
        },
        data() {
          return {
            chart1: null,
            list1:[],
            list2:[],
            name:''
          }
        },
        mounted(){
          this.changeCp()
        },
        watch:{
          cp(){
            this.changeCp()
          }
        },
        methods:{
          changeCp(){
            switch (this.cp) {
              case 1:
                this.cityId='A'
                this.name='福州'
                this.setChart()
                break;
              case 2:
                this.cityId='B'
                this.name='厦门'
                this.setChart()
                break;
              case 3:
                this.cityId='G'
                this.name='南平'
                this.setChart()
                break;
              case 4:
                this.cityId='C'
                this.name='泉州'
                this.setChart()
                break;
              case 5:
                this.cityId='D'
                this.name='漳州'
                this.setChart()
                break;
              case 6:
                this.cityId='H'
                this.name='三明'
                this.setChart()
                break;
              case 7:
                this.cityId='F'
                this.name='莆田'
                this.setChart()
                break;
              case 8:
                this.cityId='I'
                this.name='龙岩'
                this.setChart()
                break;
              case 9:
                this.cityId='E'
                this.name='宁德'
                this.setChart()
                break;
            }
          },
          setChart(){
            this.chart1 = echarts.init(document.getElementById(this.id1));
            var dottedBase = +new Date();
            var category = []

            this.list1=[]
            this.list2=[]

            let id={
              "cityId":this.cityId
            }

            /**
             * 获取折线图飞行路线总数
             */
            fetchChartLine1(id).then(response => {
              let datalist1 = new Array()
              datalist1 = response.data

              console.log(datalist1)
              for (var i = 0; i < datalist1.length; i++) {
                  var date = new Date(dottedBase -= 3600 * 24 * 1000)
                  category.push([
                    date.getFullYear(),
                    date.getMonth() + 1,
                    date.getDate()
                  ].join('-'));
                this.list1.push(datalist1[i].value)
              }
              fetchChartLine2(id).then(response => {
                let datalist2 = new Array();
                datalist2= response.data
                console.log(datalist2)
                for(var n = 0;n < datalist2.length; n++){
                  this.list2.push(datalist2[n].value)
                }

                // for (var i = 0; i < 30; i++) {
                //   var date = new Date(dottedBase -= 3600 * 24 * 1000)
                //   category.push([
                //     date.getFullYear(),
                //     date.getMonth() + 1,
                //     date.getDate()
                //   ].join('-'));
                //   this.list1.push(Math.ceil(Math.random() * 10))
                //   this.list2.push(Math.ceil(Math.random() * 500))
                //   console.log(this.list1)
                // }

                var timeData = category

                let option1 = {
                  title: {
                    text: this.name + '市飞行路线总数与飞行机器数统计图',
                    x: 'center',
                    textStyle: {
                      color: '#fff'
                    }
                  },
                  textStyle: {
                    color: '#fff'
                  },
                  tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                      animation: false
                    }
                  },
                  legend: {
                    data: ['流量', '降雨量'],
                    x: 'left'
                  },
                  toolbox: {
                    feature: {
                      dataZoom: {
                        yAxisIndex: 'none'
                      },
                      restore: {},
                      saveAsImage: {}
                    }
                  },
                  axisPointer: {
                    link: {xAxisIndex: 'all'}
                  },
                  dataZoom: [
                    {
                      show: true,
                      realtime: true,
                      start: 30,
                      end: 70,
                      xAxisIndex: [0, 1]
                    },
                    {
                      type: 'inside',
                      realtime: true,
                      start: 30,
                      end: 70,
                      xAxisIndex: [0, 1]
                    }
                  ],
                  grid: [{
                    left: 50,
                    right: 50,
                    height: '35%'
                  }, {
                    left: 50,
                    right: 50,
                    top: '55%',
                    height: '35%'
                  }],
                  xAxis: [
                    {
                      type: 'category',
                      boundaryGap: false,
                      axisLine: {
                        onZero: true,
                        lineStyle: {
                          color: '#eee'
                        }
                      },
                      data: timeData,

                    },
                    {
                      gridIndex: 1,
                      type: 'category',
                      boundaryGap: false,
                      axisLine: {
                        onZero: true,
                        lineStyle: {
                          color: '#eee'
                        }
                      },
                      data: timeData,
                      position: 'top'
                    }
                  ],
                  yAxis: [
                    {
                      name: '飞行机器总数',
                      type: 'value',
                      axisLine: {
                        lineStyle: {
                          color: '#eee'
                        }
                      },
                      max: 200
                    },
                    {
                      gridIndex: 1,
                      name: '飞行路线总数',
                      type: 'value',
                      axisLine: {
                        lineStyle: {
                          color: '#eee'
                        }
                      },
                      max: 50,
                      inverse: true
                    }
                  ],
                  series: [
                    {
                      name: '飞行机器总数',
                      type: 'line',
                      symbolSize: 8,
                      hoverAnimation: false,
                      itemStyle: {
                        normal: {
                          color: '#14c8d4'
                        }
                      },
                      data: this.list2
                    },
                    {
                      name: '飞行路线总数',
                      type: 'line',
                      xAxisIndex: 1,
                      yAxisIndex: 1,
                      symbolSize: 8,
                      hoverAnimation: false,
                      itemStyle: {
                        normal: {
                          color: 'rgb(36,128,220)',
                        }
                      },
                      data: this.list1
                    }
                  ]
                };
                this.chart1.setOption(option1);
              })
            })
          }
        }
    }
</script>

<style scoped>

</style>
