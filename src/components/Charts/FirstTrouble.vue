<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />


</template>
<script>

</script>
<script>
  import echarts from 'echarts'
  import resize from './mixins/resize'

  export default {
    mixins: [resize],
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      id: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '200px'
      },
      height: {
        type: String,
        default: '200px'
      }
    },
    data() {
      return {
        chart: null

      }
    },
    mounted() {
      this.chart = echarts.init(document.getElementById(this.id))
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
      let option = {
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

      this.chart.setOption(option)
    },
  }
</script>

<style>
</style>
