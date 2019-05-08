<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" style="border-radius: 4px"/>
</template>

<script>
  import echarts from 'echarts'
  import resize from '@/components/Charts/mixins/resize'
  import {fetchTasklist} from '@/api/task'

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
        default: '600px'
      },
      height: {
        type: String,
        default: '300px'
      }
    },
    data() {
      return {
        chart: null,
        result:[
          {
            value:10,
            name:'消防任务',
            itemStyle:{
              color:'#FF9900'
            }
          },
          {
            value:25,
            name:'医疗任务',
            itemStyle:{
              color:'#44cc9f'
            }
          },
          {
            value:15,
            name:'交通任务',
            itemStyle:{
              color:'#00CCCC'
            }
          },
          {
            value:25,
            name:'物流任务',
            itemStyle:{
              color:'#996666'
            }
          },
          {
            value:20,
            name:'巡警任务',
            itemStyle:{
              color:'#00CCFF'
            }
          },
          {
            value:35,
            name:'其他任务',
            itemStyle:{
              color:'#FF9999'
            }
          }
        ]
      }
    },
    mounted() {
      //初始化Echarts实例
      this.initChart()
      fetchTasklist({}).then(resp=>{
        for (let i = 0; i < this.result.length; i++){
          this.result[i].value = this.countLen(resp.data.items,this.result[i].name)
        }
        //console.log(this.result)
        this.initChart()
      })
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose();
      this.chart = null
    },
    methods:{
      //根据领域名称判断领域任务类型数据
      countLen(list,typeName){
        return list.filter(item=>{
          return item.taskTypes.typeName.includes(typeName)
        }).length;
      },
      initChart(){
        //创建echarts实例
        this.chart = echarts.init(document.getElementById(this.id))
        //完成图表绘制配置
        this.chart.setOption({
          title : {
            x:'center'
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            x : 'center',
            y : 'bottom',
            data:['消防任务','医疗任务','交通任务','物流任务','巡警任务','其他任务']
          },
          calculable : true,
          series : [
            {
              name:'领域覆盖率',
              type:'pie',
              radius : [20, 110],
              center : ['50%', '50%'],
              roseType : 'radius',
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: true
                }
              },
              lableLine: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: true
                }
              },
              data:this.result
            }
          ]
        })
      }
    }
  }
</script>

<style scoped>

</style>
