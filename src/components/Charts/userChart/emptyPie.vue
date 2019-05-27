<template>
  <div :id="id" :class="className" style="height:180px;width:98%"/>
</template>

<script>
  import echarts from 'echarts'
  import resize from '../mixins/resize'

  export default {
    name: "UserRoute",
    mixins: [resize],
    props: {
      add: {
        type: Number,
      },
      del: {
        type: Number,
      },
      className: {
        type: String,
        default: 'chart'
      },
      id: {
        type: String,
        default: 'id'
      },
    },
    mounted() {
      this.chart = echarts.init(document.getElementById(this.id));
      //空圆形图
      this.chart.setOption({
        backgroundColor: 'rgb(44,52,60)',
        color: ['#188df0', '#004881', '#4FB1FD'],
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: ['新增人数', '删除人数', '净增人数'],
          textStyle: {
            color: "white",
            fontWeight: "600",
            fontFamily: "楷体",
          },
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['40%', '60%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '10',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {value: this.add, name: '新增人数'},
              {value: this.del, name: '删除人数'},
              {value: this.add - this.del, name: '净增人数'}
            ]
          }
        ]
      });
    },
  }

</script>

<style>

</style>
