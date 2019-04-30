<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
  import echarts from 'echarts'
  import resize from '@/components/Charts/mixins/resize'
  export default {
    name: 'index',
    props: {
      mixins: [resize],
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
        default: '600px'
      }
    },
    data(){
      return {
        chart:null
      }
    },
    mounted() {
      //初始化Echarts实例
      this.initChart()
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose();
      this.chart = null
    },
    methods:{
      initChart() {
        //创建echarts实例
        this.chart = echarts.init(document.getElementById(this.id))
        //完成图表绘制配置
        this.chart.setOption({
          title: {
            text: '柱状图',
            subtext: '各省市冰激凌卡销量',
            //left:'center',
            left: '10%',
            top: '2%'
          },
          xAxis: {
            data: ["广东", "福建", "浙江", "江苏", "山东"]
          },
          yAxis: {
            //起始点的值
            gridIndex: 0,
            min: 0,
            max: 30,
            //y轴增长步长
            interval: 5
          },
          //数据序列，数据分析的维度
          series: [
            //可以多个纬度去分析
            {
              //维度名称
              name: '大王卡',
              //该维度的图形类型
              type: 'pie',
              data: [10, 20, 28, 22, 10],
              itemStyle: {
                color: '#304156'
              }
            },
            {
              //维度名称
              name: '帝王卡',
              //该维度的图形类型
              type: 'pie',
              data: [5, 10, 5, 20, 18],
              itemStyle: {
                color: '#4fc08d'
              }
            }
          ],
          //配置图例
          legend: {
            show: true,
            data: [
              //数据序列有几个，图例就应该有几个
              {
                name: '大王卡',
                icon: 'circle'
              },
              {
                name: '帝王卡',
                icon: 'circle'
              }
            ]
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#304156'
              }
            }
          },
          //工具箱
          toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
              //标记
              mark: { show: true },
              //数据视图
              dataView: { show: true, readOnly: false },
              //刷新
              restore: { show: true },
              //保存图片
              saveAsImage: { show: true }
            }
          },
        })
      }
    }
  }
</script>

<style scoped>

</style>
