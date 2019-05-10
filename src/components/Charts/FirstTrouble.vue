<template>
  <div :id="id2" class="grid-content" :class="className2" :style="{height:height,width:width}"/>
</template>

<script>
  import echarts from 'echarts'
  import resize from './mixins/resize'

  import {fetchChartList} from '@/api/troubletest'

  export default {
    name: "FirstTrouble",
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
        this.setChart()
      },
      setChart(){
        this.chart2 = echarts.init(document.getElementById(this.id2));
        // Generate data
        var category = [];
        var dottedBase = +new Date();
        var lineData = [];
        var barData1 = [];
        var barData2 = [];
        for (var i = 0; i < 30; i++) {
          var date = new Date(dottedBase += 1000 * 3600 * 24);
          category.push([
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate()
          ].join('-'));
          // if (i<=10&&i>=1){
          //     category.push(i);
          // }
          var b = Math.random() * 200;
          var d = Math.random() * (-200);
          barData1.push(b)
          barData2.push(d)
        }


        let option2 = {
          backgroundColor: '#0A1123',
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
              label: {
                show: true,
                backgroundColor: '#333'
              }
            }
          },
          legend: {
            data: ['已处理故障','未处理故障'],
            textStyle: {
              color: '#ccc'
            }
          },
          xAxis: {
            type: 'category',
            data: category,
            axisTick: {
              alignWithLabel: true
            },

            splitLine: {
              show: false,

            },
            axisLabel:{
              //fontWeight:10,
              //interval:2,
              fontsize:2,
              align:'center',
              color:'rgba(255,255,255,0.3)'
            }
          },
          yAxis: [{
            type: 'value',
            splitLine: {
              show: true,
              lineStyle:{
                color:'rgba(255,255,255,0.2)'
              }
            },
            axisLine:{
              show:false
            },
            axisLabel:{

              fontWeight:10,
              fontsize:5,
              color:'rgba(255,255,255,0.3)'
            }

          }],
          series: [{
            name: '已处理故障',
            type: 'bar',
            stack: '总量',
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: 50,
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#BC34BC'},
                    {offset: 1, color: '#7F3594'}
                  ]
                )
              }
            },
            data: barData1
          },{
            name: '未处理故障',
            type: 'bar',
            stack: '总量',
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: 50,
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#4740C8'},
                    {offset: 1, color: '#EF71FF'}
                  ]
                )
              }
            },
            data: barData2
          }]
        };
        this.chart2.setOption(option2);
        window.addEventListener("resize",()=>{
          console.log('111')
          this.chart2.resize();
        });
        let id2=this.id2;
        let body=document.getElementsByClassName('dashboard-editor-container')[0]
        console.log(body)

        let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
        let observer = new MutationObserver(()=>{
          console.log('222')
          this.chart2.resize();
        })
        observer.observe(body, { attributes: true, attributeFilter: ['style'], attributeOldValue: true })
      }
    }
  }
</script>

<style scoped>

</style>
