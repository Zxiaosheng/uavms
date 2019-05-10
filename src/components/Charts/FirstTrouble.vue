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
//        default: '430px'
        default: '100%'
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
        for (var i = 0; i < 10; i++) {
          var date = new Date(dottedBase += 1000 * 3600 * 24);
          category.push([
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate()
          ].join('-'));

          var b = Math.random() * 200;
          var d = Math.random() * (-200);
          barData1.push(b)
          barData2.push(d)
        }
        let option2 = {
          backgroundColor: '#0A1123',
          legend: {
            data: ['已处理故障','未处理故障'],
            left:'left',
            textStyle: {
              color: '#fff'
            }
          },
          xAxis: {
            type: 'category',
            data: category,
            textStyle:{
              color:'#fff'
            },
            splitLine: {
              show: false,

            },
            axisLabel:{
              fontsize:2,
              color:'rgb(255,255,255)'
            }
          },
          yAxis: [{
            type: 'value',
            splitLine: {
              lineStyle:{
                color:'#fff'
              }
            },
            axisLabel:{
              fontWeight:10,
              fontsize:5,
              color:'rgb(255,255,255)'
            }
          }],
          series: [{
            name: '已处理故障',
            type: 'bar',
            stack: '总量',
            barWidth: 10,
            itemStyle:{
              color:'rgb(24,177,175)',
            },
            data: barData1
          },
            {
              name: '未处理故障',
              type: 'bar',
              barWidth: '25%',
              stack: '总量',
              itemStyle:{
                color:'rgb(15,109,205)',
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
