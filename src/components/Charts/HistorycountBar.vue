<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
  import echarts from 'echarts'
  import resize from './mixins/resize'
//  import Mock from 'mockjs'
  import {taskechart,taskcount} from '@/api/history-count'

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
        chart: null,
        list1:[],
        list2:[],
        list3:[],
        list4:[],
        list5:[],
        list6:[],
        timelist:[],
        sumlist:[],
        legendlist:[],
        legend:''
      }
    },
    methods: {
      async getList(){
        let res = await taskechart()
        console.log(this.list.length);
      },
      json_array(data){
        var len=eval(data).length;
        var arr=[];
        for(var i=0;i<len;i++){
          arr[i]=data[i].taskcount;
        }
        return arr;
      },
      json_timearray(data){
        var len=eval(data).length;
        var arr=[];
        for(var i=0;i<len;i++){
          arr[i]=data[i].taskdate;
        }
        return arr;
      },
      sumtask(sumlist){
        let sum=0;
        for(let i=0;i<sumlist.length;i++){
          sum+=sumlist[i]
        }
        return sum
      },
      legendtask(data){
        this.leg=data[0].taskType.typeName
        return this.leg
      }
    },
    mounted(){
        taskcount({type:1}).then(response=>{
            this.list1=response.data
          taskcount({type:2}).then(response=> {
            this.list2 = response.data
            taskcount({type: 3}).then(response => {
              this.list3 = response.data
              taskcount({type: 4}).then(response => {
                this.list4 = response.data
                taskcount({type: 5}).then(response => {
                  this.list5 = response.data
                  taskcount({type: 6}).then(response => {
                    this.list6 = response.data
                    this.legendlist.push(this.legendtask(this.list1),this.legendtask(this.list2),this.legendtask(this.list3),this.legendtask(this.list4),this.legendtask(this.list5),this.legendtask(this.list6))

                    var itemStyle = {
                      normal: {
                        shadowBlur: 10,
                        shadowOffsetX: 10,
                        shadowOffsetY: -10,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                    };
                    let option = {
                        baseOption: {
                          backgroundColor: '#1F2D3D',
                          color: [
                            '#7289AB', '#73B9BC', '#73A373', '#fec42c', '#E69D87', '#CC5B58'
                          ],
                          label: {
                            normal: {
                              textStyle: {
                                color: '#999'
                              }
                            },
                            emphasis: {
                              textStyle: {
                                color: '#fff'
                              }
                            }
                          },
                          tooltip: {},
                          calculable: true,
                          grid: {
                            y: '35%',
                            y2: '5%',
                            tooltip: {
                              trigger: 'axis',
                              axisPointer: {
                                type: 'shadow',
                                label: {
                                  backgroundColor: 'rgba(20,200,212,0.3)',
                                  show: true,
                                  formatter: function (params) {
                                    return params.value.replace('\n', '');
                                  }
                                }
                              }
                            },
                          },
                          xAxis: [
                            {
                              name: '执行日期',
                              type: 'category',
                              nameLocation: 'end',
                              axisLabel: {'interval': 0,fontSize: 16},
                              data: this.json_timearray(this.list1),
                              splitLine: {show: false},
                              nameTextStyle: {
                                color: '#fff',
                                fontSize: 18
                              },
                              axisLine: {
                                lineStyle: {
                                  color: '#eee'
                                }
                              },

                            }
                          ],
                          yAxis: [
                            {
                              type: 'value',
                              name: '执行次数',
                              nameLocation: 'end',
                              nameTextStyle: {
                                color: '#fff',
                                fontSize: 18
                              },
                              axisLabel: {fontSize: 16},
                              axisLine: {
                                lineStyle: {
                                  color: '#eee'
                                }
                              },
                            }
                          ],
                          series: [
                            {name:this.legendlist[0],itemStyle: itemStyle,type: 'bar',data: this.json_array(this.list1),  markPoint : {
                              data : [
                                {type : 'max', name: '最大值'},
                                {type : 'min', name: '最小值'}
                              ]
                            },},
                            {name: this.legendlist[1], itemStyle: itemStyle,type: 'bar',data: this.json_array(this.list2),  markPoint : {
                              data : [
                                {type : 'max', name: '最大值'},
                                {type : 'min', name: '最小值'}
                              ]
                            },},
                            {name: this.legendlist[2],itemStyle: itemStyle, type: 'bar',data: this.json_array(this.list3),  markPoint : {
                              data : [
                                {type : 'max', name: '最大值'},
                                {type : 'min', name: '最小值'}
                              ]
                            },},
                            {name: this.legendlist[3], itemStyle: itemStyle,type: 'bar',data: this.json_array(this.list4),  markPoint : {
                              data : [
                                {type : 'max', name: '最大值'},
                                {type : 'min', name: '最小值'}
                              ]
                            },},
                            {name: this.legendlist[4], itemStyle: itemStyle,type: 'bar',data: this.json_array(this.list5),  markPoint : {
                              data : [
                                {type : 'max', name: '最大值'},
                                {type : 'min', name: '最小值'}
                              ]
                            },},
                            {name: this.legendlist[5], itemStyle: itemStyle,type: 'bar',data: this.json_array(this.list6),  markPoint : {
                              data : [
                                {type : 'max', name: '最大值'},
                                {type : 'min', name: '最小值'}
                              ]
                            }},
                            {
                              name: '总飞行次数',
                              type: 'pie',
                              center: ['50%', '18%'],
                              radius: '20%',
                              z: 100,
                              label: {
                                normal: {
                                  textStyle: {
                                    fontSize: 20
                                  }
                                }
                              },
                              itemStyle: {
                                normal: {
                                  opacity: 0.9,
                                  shadowBlur: 5,
                                  shadowOffsetX: 5,
                                  shadowOffsetY: 5,
                                  shadowColor: 'rgba(0, 0, 0,0.7)'
                                }
                              },
                              data:[
                                {name: this.legendlist[0], value: this.sumtask(this.json_array(this.list1))},
                                {name: this.legendlist[1], value: this.sumtask(this.json_array(this.list2))},
                                {name: this.legendlist[2], value: this.sumtask(this.json_array(this.list3))},
                                {name: this.legendlist[3], value: this.sumtask(this.json_array(this.list4))},
                                {name: this.legendlist[4], value: this.sumtask(this.json_array(this.list5))},
                                {name: this.legendlist[5], value: this.sumtask(this.json_array(this.list6))}
                                ]
                            },
                          ]
                        },
                        options: []
                      };
                      option.baseOption.title = {
                        left: 'left',
                        top: 15,
                        textStyle: {
                          color: '#fff',
                          fontWeight: 'normal',
                          fontSize: 24
                        },
                        text: '无人机最近一周各种任务的执行次数统计',
                        subtext: '数据来自中国联通统计小组',
                        left: 'left',
                      };
                      option.baseOption.toolbox = {
                        show: true,
                        orient: 'vertical',
                        x: 20,
                        left:'left',
                        top: 'center',
                        feature: {
                          mark: {show: true},
                          dataView: {show: true, readOnly: false},
                          magicType: {show: true, type: ['line', 'bar', 'tiled']},
                          restore: {show: true},
                          saveAsImage: {show: true}
                        }
                      };
                      option.baseOption.legend = {
                        x: 'right',
                        top: 15,
                        textStyle: {
                          color: '#fff',
                          "fontSize": 18
                        },
                        data: this.legendlist,
                      };

                      this.chart = echarts.init(document.getElementById(this.id))
                      this.chart.setOption(option)
                  })
                })
              })
            })
          })
        })
    }
}

</script>

<style>

</style>
