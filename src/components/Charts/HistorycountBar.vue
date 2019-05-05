<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
  import echarts from 'echarts'
  import resize from './mixins/resize'
  import Mock from 'mockjs'

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
      methods:{
        mockdata(arr){
          for(let i=0;i<12;i++) {
            let l = Mock.mock("@integer(1,300)")
            arr.push(l)
          }
          return arr
        }
      },
      mounted() {
        const List1 = []
        const List2 = []
        const List3 = []
        const List4 = []
        const List5 = []
        const List6 = []

        this.chart = echarts.init(document.getElementById(this.id))


        let option = {
//          color: ['#003366', '#006699', '#4cabce', '#e5323e'],
          title: {text: '执行次数统计'},
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['消防型', '物流型', '医疗型', '天眼型','交通型','其它型'],
            selected: {
              '交通型': false, '天眼型': false, '其它型': false
            }
          },
          toolbox: {
            show: true,
            orient: 'vertical',
            left: 'left',
            top: 'center',
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              axisTick: {show: false},
              data: ['1', '2', '3','4', '5', '6','7', '8', '9','10', '11', '12']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '消防型',
              type: 'bar',
              barGap: 0,
              data: this.mockdata(List1)
            },
            {
              name: '物流型',
              type: 'bar',
              data: this.mockdata(List2)
            },
            {
              name: '医疗型',
              type: 'bar',
              data: this.mockdata(List3)
            },
            {
              name: '天眼型',
              type: 'bar',
              data: this.mockdata(List4)
            },
            {
              name: '交通型',
              type: 'bar',
              data: this.mockdata(List5)
            },
            {
              name: '其它型',
              type: 'bar',
              data: this.mockdata(List6)
            }
          ]
        };

        this.chart.setOption(option)
      },
    }
</script>

<style>
</style>
