<template>
  <div :id="id2" class="grid-content" :class="className2" :style="{height:height,width:width}"/>
</template>

<script>
  import echarts from 'echarts'
  import resize from './mixins/resize'

  import {fetchChartLineBar1,fetchChartLineBar2} from '@/api/rode-echart'

  export default {
    name: "RodeChart",
    mixins: [resize],
    props: {
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '430px'
      },
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
        list: [],
        name:''
      }
    },
    watch:{
      cp(){
        this.changeCp()
      }
    },
    mounted() {
      this.changeCp()
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
        this.chart2 = echarts.init(document.getElementById(this.id2));
        // 预计飞行总数与实际飞行总数差距图
        var category = [];
        var dottedBase = +new Date();
        var lineData = [];
        var barData = [];
        var cData = [];

        let id={
          "cityId":this.cityId
        }
        /**
         * 获取柱形图折线图实际飞行路线总数
         */
        // fetchChartLineBar1(id).then(response => {      //预计飞行路线总数
        //   let datalist1 = new Array()
        //   datalist1 = response.data
        //   fetchChartLineBar2(id).then(response =>{      //实际飞行路线总数
        //     let datalist2 = new Array()
        //     datalist2 = response.data
        //
        //
        //     let arr=new Array()
        //
        //     for(var n=0;n<datalist1.length;n++){
        //       let flag=false
        //       for(var m=0;m<datalist2.length;m++){
        //         if(datalist2[m].time!=datalist1[n].time){
        //           flag=true
        //           break
        //         }
        //       }
        //       if(flag){
        //         let d={
        //           "time":datalist1[n].time,
        //           "value":0
        //         }
        //         arr.push(d)
        //         flag=true
        //       }
        //     }
        //     for(var idx=0;idx<arr.length;idx++){
        //       datalist2.push(arr[idx])
        //     }
        //
        //     for (var i = 0; i < datalist1.length; i++) {
        //       var date = new Date(dottedBase -= 3600 * 24 * 1000);
        //       category.push([
        //         date.getFullYear(),
        //         date.getMonth() + 1,
        //         date.getDate()
        //       ].join('-'));
        //
        //
        //       // barData.push(b) //预计飞行总数
        //       // var b = Math.round(datalist1[i].value);
        //       // var d = Math.round(datalist2[i].value);
        //
        //       // lineData.push(d); //实际飞行总数
        //       // cData.push(Math.abs(d - b));
        //     }
        //   })


        for (var i = 0; i < 30; i++) {
          var date = new Date(dottedBase -= 3600 * 24 * 1000);
          category.push([
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate()
          ].join('-'));



          var b = Math.round(Math.random() * 10);
          var d = Math.round(Math.random() * 10);


          barData.push(b) //预计飞行总数
          lineData.push(d); //实际飞行总数
          cData.push(Math.abs(d - b));
        }
          let option2 = {
            // backgroundColor: 'rgb(31,45,41)',
            title: {
              text: this.name + '市每日预计飞行路线总数与实际飞行路线总数对比',
              top: '10',
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
              data: lineData,
              itemStyle: {
                normal: {
                  color: 'rgb(36,128,220)',
                }
              }
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
            }, {
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

      }
    }
  }
</script>

<style scoped>

</style>
