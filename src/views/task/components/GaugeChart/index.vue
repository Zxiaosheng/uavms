<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" style="border-radius: 4px"/>
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
        default: '400px'
      }
    },
    data(){
      return {
        chart:null,
        data1:[{value: 80, name: '百分比'}]
      }
    },
    mounted() {
      //初始化Echarts实例
      this.initChart();
      setInterval(()=>{
        this.data1[0].value = (Math.random() * 100).toFixed(2) - 0;
        this.initChart()
      },2000)
    },
    beforeDestroy() {
      if(this.initChart){
        clearInterval(this.initChart)
      }
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
          tooltip : {
            formatter: "{a} <br/>{c} {b}"
          },
          series : [
            {
              name: '速度',
              type: 'gauge',
              center: ['70%', '55%'],
              z: 3,
              min: 0,
              max: 220,
              splitNumber: 11,
              radius: '75%',
              axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                  width: 6
                }
              },
              axisTick: {            // 坐标轴小标记
                length: 15,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                  color: 'auto'
                }
              },
              splitLine: {           // 分隔线
                length: 10,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                  color: 'auto'
                }
              },
              axisLabel: {
                backgroundColor: 'auto',
                borderRadius: 2,
                color: '#eee',
                padding: 3,
                textShadowBlur: 2,
                textShadowOffsetX: 1,
                textShadowOffsetY: 1,
                textShadowColor: '#fff'
              },
              title : {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: 'bolder',
                fontSize: 20,
                fontStyle: 'italic'
              },
              detail : {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                formatter: function (value) {
                  value = (value + '').split('.');
                  value.length < 2 && (value.push('00'));
                  return ('00' + value[0]).slice(-2)
                    + '.' + (value[1] + '00').slice(0, 2);
                },
                fontWeight: 'bolder',
                borderRadius: 3,
                backgroundColor: '#444',
                borderColor: '#aaa',
                shadowBlur: 5,
                shadowColor: '#333',
                shadowOffsetX: 0,
                shadowOffsetY: 3,
                borderWidth: 2,
                textBorderColor: '#000',
                textBorderWidth: 2,
                textShadowBlur: 2,
                textShadowColor: '#fff',
                textShadowOffsetX: 0,
                textShadowOffsetY: 0,
                fontFamily: 'Arial',
                width: 100,
                color: '#eee',
                rich: {}
              },
              color:'#fff',
              data:this.data1
            },
            {
              name: '转速',
              type: 'gauge',
              center: ['30%', '55%'],    // 默认全局居中
              radius: '55%',
              min:0,
              max:7,
              endAngle:45,
              splitNumber:7,
              axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                  width: 8
                }
              },
              axisTick: {            // 坐标轴小标记
                length:12,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                  color: 'auto'
                }
              },
              splitLine: {           // 分隔线
                length:20,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                  color: 'auto'
                }
              },
              pointer: {
                width:5
              },
              title: {
                offsetCenter: [0, '-30%'],       // x, y，单位px
              },
              detail: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: 'bolder'
              },
              data:[{value: 1.5, name: 'x1000 r/min'}]
            }
          ]
        },true);
      }
    }
  }
</script>

<style scoped>

</style>
