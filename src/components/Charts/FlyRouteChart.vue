<template>
  <div class="chart-container">

        <div :id="id" :class="className" style="height:100%;width:100%" />

  </div>
</template>

<script>
import echarts from 'echarts'


// 行政区划图
import 'echarts/lib/chart/map'
// 引入对应图表的js文件
import 'echarts/map/js/china'
import 'echarts/map/js/province/fujian'
import resize from './mixins/resize'

export default {
  name: 'FlyRouteChart',
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
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      const targetValue1 = [
        [{
          name: '龙岩'
        }, {
          name: '福州',
          value: 100
        }],
        [{
          name: '长乐'
        }, {
          name: '福州',
          value: 100
        }],
        [{
          name: '福安'
        }, {
          name: '福州',
          value: 100
        }],
        [{
          name: '莆田'
        }, {
          name: '福州',
          value: 100
        }],
        [{
          name: '厦门'
        }, {
          name: '福州',
          value: 100
        }]
      ]
      const targetValue2 = [
        [{
          name: '福安'
        }, {
          name: '莆田',
          value: 100
        }],
        [{
          name: '福清'
        }, {
          name: '莆田',
          value: 100
        }],
        [{
          name: '建阳'
        }, {
          name: '莆田',
          value: 100
        }],
        [{
          name: '晋江'
        }, {
          name: '莆田',
          value: 100
        }],
        [{
          name: '南安'
        }, {
          name: '莆田',
          value: 100
        }]
      ]
      const targetValue3 = [
        [{
          name: '南平'
        }, {
          name: '厦门',
          value: 100
        }],
        [{
          name: '宁德'
        }, {
          name: '厦门',
          value: 100
        }],
        [{
          name: '泉州'
        }, {
          name: '厦门',
          value: 100
        }],
        [{
          name: '龙海'
        }, {
          name: '厦门',
          value: 100
        }],
        [{
          name: '武夷山'
        }, {
          name: '厦门',
          value: 100
        }]
      ]
      const exportValue1 = [
        [{
          name: '福州'
        }, {
          name: '武夷山',
          value: 100
        }],
        [{
          name: '福州'
        }, {
          name: '龙海',
          value: 100
        }],
        [{
          name: '福州'
        }, {
          name: '建阳',
          value: 100
        }],
        [{
          name: '福州'
        }, {
          name: '龙岩',
          value: 100
        }]
      ]
      const exportValue2 = [
        [{
          name: '莆田'
        }, {
          name: '南安',
          value: 100
        }],
        [{
          name: '莆田'
        }, {
          name: '长乐',
          value: 100
        }]
      ]
      const exportValue3 = [
        [{
          name: '厦门'
        }, {
          name: '三明',
          value: 100
        }],
        [{
          name: '厦门'
        }, {
          name: '邵武',
          value: 100
        }],
        [{
          name: '厦门'
        }, {
          name: '晋江',
          value: 100
        }],
        [{
          name: '厦门'
        }, {
          name: '宁德',
          value: 100
        }]
      ]
      const geoCoordMap = {
        '福州': [119.306239,26.075302],
        '长乐': [119.31, 25.58],
        '福安': [119.39, 27.06],
        '福清': [119.23, 25.42],
        '建瓯': [118.20, 27.03],
        '建阳': [118.07, 27.21],
        '晋江': [118.35, 24.49],
        '龙海': [117.48, 24.26],
        '龙岩': [117.01, 25.06],
        '南安': [118.23, 24.57],
        '南平': [118.10, 26.38],
        '宁德': [119.31, 26.39],
        '莆田': [119.007558,25.431011],
        '泉州': [118.36, 24.56],
        '三明': [117.36, 26.13],
        '邵武': [117.29, 27.20],
        '石狮': [118.38, 24.44],
        '武夷山': [118.02, 27.46],
        '厦门': [118.11022,24.490474],
        '永安': [117.23, 25.58],
        '漳平': [117.24, 25.17],
        '漳州': [117.39, 24.31]
      }
      const XAData = targetValue1
      const XNData = targetValue2
      const YCData = targetValue3
      const XIYData = exportValue1
      const XNNData = exportValue2
      const INCData = exportValue3
      const planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z'
      const convertData = function(data) { // 数据转换，将数据转换为res数组的模式
        var res = []
        for (var i = 0; i < data.length; i++) {
          var dataItem = data[i]
          var fromCoord = geoCoordMap[dataItem[0].name]
          var toCoord = geoCoordMap[dataItem[1].name]
          if (fromCoord && toCoord) {
            res.push({
              fromName: dataItem[0].name,
              toName: dataItem[1].name,
              coords: [fromCoord, toCoord],
              value: dataItem[1].value
            })
          }
        }
        return res
      }
      const color = ['#a6c84c', '#ffa022', '#46bee9'] // 航线的颜色
      const series = [];
      [
        ['进港', targetValue1],
        ['进港', targetValue2],
        ['进港', targetValue3]
      ].forEach(function(item, i) {

        series.push({
          name: item[0],
          type: 'lines',
          zlevel: 1,
          effect: {
            show: true,
            period: 6,
            trailLength: 0.7,
            color: 'white', // arrow箭头的颜色
            symbolSize: 1
          },
          lineStyle: {
            normal: {
              color: color[i],
              width: 0,
              curveness: 0.2
            }
          },
          data: convertData(item[1])
        }, {
          name: item[0],
          type: 'lines',
          zlevel: 2,
          symbol: ['none',
            'arrow'
          ],
          symbolSize: 10,
          effect: {
            show: true,
            period: 6,
            trailLength: 0,
            symbol: planePath,
            symbolSize: 15
          },
          lineStyle: {
            normal: {
              color: color[i],
              width: 1,
              opacity: 0.6,
              curveness: 0.2
            }
          },
          data: convertData(item[1])
        }, {
          name: item[0],
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          rippleEffect: {
            brushType: 'stroke'
          },
          label: {
            normal: {
              show: false,
              position: 'right',
              formatter: '{b}'
            }
          },
          symbolSize: function(val) {
            return val[2] / 20
          },
          itemStyle: {
            normal: {
              color: color[i]
            },
            emphasis: {
              areaColor: '#2037c7'
            }
          },
          data: item[1]
            .map(function(dataItem) {
              return {
                name: dataItem[1].name,
                value: geoCoordMap[dataItem[0].name]
                  .concat([dataItem[1].value]) //  根据货量调节城市大小
              }
            })
        })
      });

      [
        ['出港', exportValue1],
        ['出港', exportValue2],
        ['出港', exportValue3]
      ].forEach(function(item, i) {
        series.push({
          name: item[0],
          type: 'lines',
          zlevel: 1,
          effect: {
            show: true,
            period: 6,
            trailLength: 0.7,
            color: 'white', // arrow箭头的颜色
            symbolSize: 1
          },
          lineStyle: {
            normal: {
              color: color[i],
              width: 0,
              curveness: 0.2
            }
          },
          data: convertData(item[1])
        }, {
          name: item[0],
          type: 'lines',
          zlevel: 2,
          symbol: ['none',
            'arrow'
          ],
          symbolSize: 10,
          effect: {
            show: true,
            period: 6,
            trailLength: 0,
            symbol: planePath,
            symbolSize: 15
          },
          lineStyle: {
            normal: {
              color: color[i],
              width: 1,
              opacity: 0.6,
              curveness: 0.2
            }
          },
          data: convertData(item[1])
        }, {
          name: item[0],
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          rippleEffect: {
            brushType: 'stroke'
          },
          label: {
            normal: {
              show: false,
              position: 'right',
              formatter: '{b}'
            }
          },
          symbolSize: function(val) {
            return val[2] / 20
          },
          itemStyle: {
            normal: {
              color: color[i]
            },
            emphasis: {
              areaColor: '#0b14b7'
            }
          },
          data: item[1]
            .map(function(dataItem) {
              return {
                name: dataItem[1].name,
                value: geoCoordMap[dataItem[1].name]
                  .concat([dataItem[1].value])
              }
            })
        })
      });
      // 被攻击点
      ['福州','莆田','厦门'].forEach(function(item, i) {
        series.push({
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          rippleEffect: {
            period: 4,
            brushType: 'stroke',
            scale: 4
          },
          label: {
            normal: {
              show: true,
              position: 'right',
              color: '#00ffff',
              formatter: '{b}',
              textStyle: {
                color: '#00ffff'
              }
            },
            emphasis: {
              show: false
            }
          },
          symbolSize: 20,
          itemStyle: {
            normal: {
              show: true,
              color: color[i]
            }
          },
          data: [{
            name: item,
            value: geoCoordMap[item]
              .concat([100])
          }
          ]
        })
      });
      this.chart = echarts.init(document.getElementById(this.id))
      let setting={
        backgroundColor: 'rgba(0,0,0,0.8)',
          title: {
        show: false,
          text: '三场进出港航线图',
          left: 'center',
          textStyle: {
          color: '#fff'
        }
      },
        tooltip: {
          trigger: 'item',
            formatter: function(params, ticket, callback) {
            if (params.seriesType == 'effectScatter') {
              return '线路：' + params.data.name + '' +
                params.data.value[2]
            } else if (params.seriesType == 'lines') {
              return params.data.fromName + '>' +
                params.data.toName + '<br />' +
                params.data.value
            } else {
              return params.name
            }
          }
        },
        //	geo地理坐标系组件
        geo: {
          map: '福建',
            label: {
            emphasis: {
              show: true,
                color: '#fff'
            }
          },
          roam: true,
            itemStyle: {
            normal: {
              areaColor: '#07056e',
                borderColor: '#195bb9',
                borderWidth: 1
            },
            emphasis: {
              areaColor: '#2B91B7'
            }
          }
        },
        series: series
      }
       if(window.location.href.includes('demo'))
        setting.legend={
          orient: 'horizontal',
          top: '70%',
          right: '20%',
          selected: {
            '进港': true
          },
          data: ['进港', '出港'],
          textStyle: {
            color: '#fff'
          },
          selectedMode: 'single'
        }
      this.chart.setOption(setting)
    }
  }
}
</script>

<style scoped>
  .chart-container{
    position: relative;
    width: 100%;
    height: 100%;
    background-color: rgb(48,65,86);
  }
</style>
