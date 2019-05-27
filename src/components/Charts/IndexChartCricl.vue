<template>
  <div :id="id" class="grid-content" :class="className" :style="{height:height,width:width}"/>
</template>

<script>
  import echarts from 'echarts'
  import resize from '../../components/Charts/mixins/resize'
  import {fetchTasklist} from '@/api/task'
    export default {
        name: "RodeChartCircl",
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
            default: '100%'
          },
          height: {
            type: String,
            default: '500px'
          }

        },
        data() {
          return {
            chart: null,
            result:[
              {value:335, name:'消防任务'},
              {value:310, name:'医疗任务'},
              {value:234, name:'交通任务'},
              {value:135, name:'物流任务'},
              {value:154, name:'巡警任务'}
            ]
          }
        },
      methods:{
        //根据领域名称判断领域任务类型数据
        countLen(list,typeName){
          console.log(list[0].taskType.typeName.includes(typeName)   )
          return list.filter(item=>{
            return typeName.includes(item.taskType.typeName)
          }).length;
//          return 1
        }},
        mounted() {
          this.chart = echarts.init(document.getElementById(this.id));
          fetchTasklist().then(resp=>{
            for (let i = 0; i < this.result.length; i++){
              this.result[i].value = this.countLen(resp.data.data.items,this.result[i].name)
            }
            let option1 = {
              backgroundColor:'#0A1123',
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)",
              },

              color:['rgb(37,96,149)','rgb(67,164,215)','rgb(44,116,135)','rgb(78,236,239)','rgb(133,190,135)'],
              series: [
                {
                  name:'任务类型',
                  type:'pie',
                  radius: ['50%', '70%'],
                  avoidLabelOverlap: false,
                  label: {
                    normal: {
                      show: true,
                      // position: 'center',
                      formatter: '{b}'
                    }
                  },
                  labelLine: {
                    normal: {
                      show: true
                    }
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '30',
                      fontWeight: 'bold'
                    }
                  },
                  data:this.result
                }
              ]
            }

            this.chart.setOption(option1)
//        console.log(resp)
//            this.initChart()
          })

      }
    }
</script>

<style scoped>

</style>
