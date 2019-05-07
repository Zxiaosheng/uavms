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
    mounted(){
      var dataMap = {};

      const List1 = []
      const List2 = []
      const List3 = []
      const List4 = []
      const List5 = []
      const List6 = []

      const List11 = []
      const List21 = []
      const List31 = []
      const List41 = []
      const List51 = []
      const List61 = []

      const List111 = []
      const List211 = []
      const List311 = []
      const List411 = []
      const List511 = []
      const List611 = []

      function dataFormatter(obj) {
        var pList = ['1月', '2月', '3月','4月', '5月', '6月','7月', '8月', '9月','10月', '11月', '12月']
        var temp;
        for (var year = 2016; year <= 2018; year++) {
          var max = 0;
          var sum = 0;
          temp = obj[year];
          for (var i = 0, l = temp.length; i < l; i++) {
            max = Math.max(max, temp[i]);
            sum += temp[i];
            obj[year][i] = {
              name : pList[i],
              value : temp[i]
            }
          }
          obj[year + 'max'] = Math.floor(max / 100) * 100;
          obj[year + 'sum'] = sum;
        }
        return obj;
      }

      dataMap.data1 = dataFormatter({
        //max : 60000,
        2016:this.mockdata(List1),
        2018:this.mockdata(List2),
        2017:this.mockdata(List3),
      });

      dataMap.data2 = dataFormatter({
        //max : 4000,
        2016:this.mockdata(List4),
        2018:this.mockdata(List5),
        2017:this.mockdata(List6),
      });

      dataMap.data3 = dataFormatter({
        //max : 26600,
        2016:this.mockdata(List41),
        2018:this.mockdata(List51),
        2017:this.mockdata(List61),
      });

      dataMap.data4 = dataFormatter({
        //max : 25000,
        2016:this.mockdata(List411),
        2018:this.mockdata(List511),
        2017:this.mockdata(List611),
      });

      dataMap.data5 = dataFormatter({
        //max : 3600,
        2016:this.mockdata(List11),
        2018:this.mockdata(List21),
        2017:this.mockdata(List31),
      });

      dataMap.data6 = dataFormatter({
        //max : 3200,
        2016:this.mockdata(List111),
        2018:this.mockdata(List211),
        2017:this.mockdata(List311),
      });

      var itemStyle = {
        normal: {
          opacity: 0.9,
          shadowBlur: 10,
          shadowOffsetX: 10,
          shadowOffsetY: 10,
          shadowColor: 'rgba(0, 0, 0,0.7)'
        }
      };
      let option = {
        baseOption: {
          backgroundColor: '#1F2D29',
          color: [
            '#7289AB','#73B9BC','#73A373','#fec42c', '#E69D87', '#C23531'
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
          timeline: {
            itemStyle:{
              normal:{
                color:'#fff',
                borderColor:'fff'
              },
              emphasis:{
                color:'#fff',
                borderColor:'fff'
              }
            },
            lineStyle:{
              color:'#fff',
            },
//              orient: 'vertical',
//              left:'90%',
//              x2:'0.3%',
//              top:90,
//              bottom:90,
            axisType: 'category',
            autoPlay: true,
            playInterval: 2000,
            data: [
              '2016','2017',
              {
                value: '2018',
                tooltip: {
                  formatter: '{b} 飞行次数第一个里程碑'
                },
                symbol: 'diamond',
                symbolSize: 16
              }
            ],
            label: {
              formatter : function(s) {
                return (new Date(s)).getFullYear();
              },
              normal:{
//                  position:'right',
                color:'#fff',
                fontSize:15,
//                  rotate:'30',
//                  lineHeight:30,
              }
            }
          },
          title: {
            left: 'left',
            top: 15,
            textStyle: {
              color: '#fff',
              fontWeight: 'normal',
              fontSize: 20
            },
            subtext: '数据来自中国联通统计小组',
            left: 'left'
          },
          tooltip:{},
          toolbox: {
            show: true,
            orient: 'vertical',
            x:20,
            top: 'center',
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          legend: {
            x: 'right',
            top: 15,
            textStyle:{
              color:'#fff'
            },
            data: ['消防型','物流型','医疗型','天眼型','交通型','其它型'],
//            selected: {
//              '天眼型': false, '交通型': false, '其它型': false
//            }
          },
          calculable : true,
          grid: {
//              x: '10%',
//              x2: 150,
            y: '28%',
            y2: '15%',
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
              name: '月份',
              'type':'category',
              nameLocation: 'end',
              'axisLabel':{'interval':0},
              'data':['1月', '2月', '3月','4月', '5月', '6月','7月', '8月', '9月','10月', '11月', '12月'],
              splitLine: {show: false},
              nameTextStyle: {
                color: '#fff',
                fontSize: 14
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
                fontSize: 14
              },
              axisLine: {
                lineStyle: {
                  color: '#eee'
                }
              },
            }
          ],
          series: [
            {name: '消防型', type: 'bar',itemStyle: itemStyle,},
            {name: '物流型', type: 'bar',itemStyle: itemStyle,},
            {name: '医疗型', type: 'bar',itemStyle: itemStyle,},
            {name: '交通型', type: 'bar',itemStyle: itemStyle,},
            {name: '天眼型', type: 'bar',itemStyle: itemStyle,},
            {name: '其它型', type: 'bar',itemStyle: itemStyle,},
            {
              name: '占比',
              type: 'pie',
              center: ['50%', '16%'],
              radius: '23%',
              z: 100,
              fontSize:40,
              label: {
                normal: {
                  textStyle: {
                    fontSize:15
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
              }
            },
          ]
        },
        options: [
          {
            title : {
              text: '2016年无人机执行次数统计',
            },
            series : [
              {data: dataMap.data1['2016'],
                markPoint : {
                data : [
                  {type : 'max', name: '最大值'},
                  {type : 'min', name: '最小值'}
                ]
              },},
              {data: dataMap.data2['2016'],
                markPoint : {
                  data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                  ]
                },},
              {data: dataMap.data3['2016'],
                markPoint : {
                  data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                  ]
                },},
              {data: dataMap.data4['2016'],
                markPoint : {
                  data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                  ]
                },},
              {data: dataMap.data5['2016'],
                markPoint : {
                  data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                  ]
                },},
              {data: dataMap.data6['2016'],
                markPoint : {
                  data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                  ]
                }},
              {data: [
                {name: '消防型', value: dataMap.data1['2016sum']},
                {name: '物流型', value: dataMap.data2['2016sum']},
                {name: '医疗型', value: dataMap.data3['2016sum']},
                {name: '交通型', value: dataMap.data4['2016sum']},
                {name: '天眼型', value: dataMap.data5['2016sum']},
                {name: '其它型', value: dataMap.data6['2016sum']}
              ]}
            ]
          },
          {
            title : {text: '2017年无人机执行次数统计'},
            series : [
              {data: dataMap.data1['2017'],
                markPoint : {
                data : [
                  {type : 'max', name: '最大值'},
                  {type : 'min', name: '最小值'}
                ]
              },},
              {data: dataMap.data2['2017'],
                markPoint : {
                  data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                  ]
                },},
              {data: dataMap.data3['2017'],
                markPoint : {
                  data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                  ]
                },},
              {data: dataMap.data4['2017'],
                markPoint : {
                  data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                  ]
                },},
              {data: dataMap.data5['2017'],
                markPoint : {
                  data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                  ]
                },},
              {data: dataMap.data6['2017'],
                markPoint : {
                  data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                  ]
                },},
              {data: [
                {name: '消防型', value: dataMap.data1['2017sum']},
                {name: '物流型', value: dataMap.data2['2017sum']},
                {name: '医疗型', value: dataMap.data3['2017sum']},
                {name: '交通型', value: dataMap.data4['2016sum']},
                {name: '天眼型', value: dataMap.data5['2016sum']},
                {name: '其它型', value: dataMap.data6['2017sum']}
              ]}
            ]
          },
          {
            title : {text: '2018年无人机执行次数统计'},
            series : [
              {data: dataMap.data1['2018'],
                markPoint : {
                  data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                  ]
                },},
              {data: dataMap.data2['2018'],
                markPoint : {
                  data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                  ]
                },},
              {data: dataMap.data3['2018'],
                markPoint : {
                  data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                  ]
                },},
              {data: dataMap.data4['2018'],
                markPoint : {
                  data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                  ]
                },},
              {data: dataMap.data5['2018'],
                markPoint : {
                  data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                  ]
                },},
              {data: dataMap.data6['2018'],
                markPoint : {
                  data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                  ]
                },},
              {data: [
                {name: '消防型', value: dataMap.data1['2018sum']},
                {name: '物流型', value: dataMap.data2['2018sum']},
                {name: '医疗型', value: dataMap.data3['2018sum']},
                {name: '交通型', value: dataMap.data4['2018sum']},
                {name: '天眼型', value: dataMap.data5['2018sum']},
                {name: '其它型', value: dataMap.data6['2018sum']}
              ]}
            ]
          },

        ]
      };
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption(option)
    }
  }
</script>

<style>

</style>
