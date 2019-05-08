<template>
  <div :id="id2" class="grid-content" :class="className2" style="height:430px;width:100%"/>
</template>

<script>
  import echarts from 'echarts'
  import resize from '../../components/Charts/mixins/resize'
  import { fetchChartList,fetchMChartList } from '@/api/rode-echart'
    export default {
        name: "RodeChart",
        mixins: [resize],
        props: {
          className2: {
            type: String,
            default: 'chart2'
          },
          id2: {
            type: String,
            default: 'chart2'
          },
          cp:{
            type: Number
          }
        },
        data() {
          return {
            chart2: null,
            list:[],
            name:''
          }
        },
        watch:{
          cp(){
            this.changeCp()
          }
        },
        mounted(){
          this.changeCp()
        },
        methods:{
          //加载图表
          setChart(){
            this.chart2 = echarts.init(document.getElementById(this.id2));
            // 预计飞行总数与实际飞行总数差距图
            var category = [];
            var dottedBase = +new Date();
            var lineData = [];
            var barData = [];
            var cData= [];

            for (var i = 0; i < 20; i++) {
              var date = new Date(dottedBase -= 3600 * 24 * 1000);
              category.push([
                date.getFullYear(),
                date.getMonth() + 1,
                date.getDate()
              ].join('-'));
              var b = Math.round(Math.random() * 200);
              var d = Math.round(Math.random() * 200);
              barData.push(b) //预计飞行总数
              lineData.push(d); //实际飞行总数
              cData.push(Math.abs(d-b));
            }


            let option2 = {
              // backgroundColor: 'rgb(31,45,41)',
              title: {
                text: this.name+'市每日预计飞行路线总数与实际飞行路线总数对比',
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
                name: '实际飞行总数-预计飞行总数',
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
                data: cData
              }]
            };
            this.chart2.setOption(option2);
          },
          //修改标题
          changeCp(){
            switch (this.cp) {
              case 1:
                this.name='福州'
                this.setChart()
                break;
              case 2:
                this.name='厦门'
                console.log(this.name)
                this.setChart()
                break;
              case 3:
                this.name='南平'
                this.setChart()
                break;
              case 4:
                this.name='泉州'
                this.setChart()
                break;
              case 5:
                this.name='漳州'
                this.setChart()
                break;
              case 6:
                this.name='三明'
                this.setChart()
                break;
              case 7:
                this.name='莆田'
                this.setChart()
                break;
              case 8:
                this.name='龙岩'
                this.setChart()
                break;
              case 9:
                this.name='宁德'
                this.setChart()
                break;
            }
          }
        }

    }
</script>

<style scoped>

</style>
