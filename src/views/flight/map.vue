<template>
  <div class="chart-container">
    <div :id="id" :class="className" style="height:550px;width:100%" />
  </div>
</template>

<script>

  import echarts from 'echarts'
  // import resize from './mixins/resize'
  import resize from '@/components/Charts/mixins/resize'
  import bmap from 'echarts/extension/bmap/bmap';

  export default {
    name: "Flight",
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
        default: '100%'
      },
      mapName: {
        type: String,
        default: '福州'
      }
    },
    data(){
      return{
        chart: null
      }
    },
    watch:{
      mapName(){
        this.initChart()
      }
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
        this.chart = echarts.init(document.getElementById(this.id))

        let startPoint=startPoint = {}
        let temp=[]
        let geoCoordMap={}
        // if(this.mapName==='福州'){
        //
        //   startPoint = {
        //     x: 119.31217,
        //     y: 26.064285
        //   }118.674555,24.883913
        startPoint = {
            x: 118.674555,
            y: 24.883913
        }
          //地图上的坐标对应地点
          geoCoordMap = {
            '清源山': [118.617063,24.952075],
            '泉州站': [118.575669,24.979329],
            '仙公山': [118.656157,25.123882],
            '国际机场': [118.596366,24.803119],
            '灵应寺': [118.559572,25.163657],
            '仰恩大学': [118.612464,25.116554],
            '紫帽山': [118.515878,24.901744],
            '泉港': [118.917169,25.133304],
            '石狮': [118.680304,24.763227],
            '惠安': [118.805635,25.040104],

          }

          //[[{原点},{目标点,值}]]
          let BJData = [
            [{name: '泉州站'}, {name: '泉港',value: 60}],
            [{name: '泉州站'}, {name: '仰恩大学',value: 60}],
            [{name: '泉州站'}, {name: '灵应寺',value: 60}],
            [{name: '泉州站'}, {name: '清源山',value: 60}]
          ];

          let SHData = [
            [{name: '泉港'}, {name: '灵应寺',value: 60}],
          ];

          let GZData =[
            [{name: '清源山'}, {name: '泉港',value: 60}],
            [{name: '清源山'}, {name: '灵应寺',value: 60}]
          ];
          let CTData =[
            [{name: '国际机场'}, {name: '紫帽山',value: 60}],
            [{name: '国际机场'}, {name: '泉州站',value: 60}]
          ];
          let FDData =[
            [{name: '仙公山'}, {name: '国际机场',value: 60}],
            [{name: '仙公山'}, {name: '惠安',value: 100}]
          ];

          temp=[
            ['泉州站', BJData],
            ['泉港', SHData],
            ['清源山', GZData],
            ['国际机场', CTData],
            ['仙公山', FDData]
          ]


        // 地图自定义样式
        let bmap = {
          center: [startPoint.x, startPoint.y],
          zoom: 12,
          roam: true,
          mapStyle: {
            styleJson: [
              {
                "featureType": "water",
                "elementType": "all",
                "stylers": {
                  "color": "#044161"
                }
              },
              {
                "featureType": "land",
                "elementType": "all",
                "stylers": {
                  "color": "#004981"
                }
              },
              {
                "featureType": "boundary",
                "elementType": "geometry",
                "stylers": {
                  "color": "#064f85"
                }
              },
              {
                "featureType": "railway",
                "elementType": "all",
                "stylers": {
                  "visibility": "off"
                }
              },
              {
                "featureType": "highway",
                "elementType": "geometry",
                "stylers": {
                  "color": "#004981"
                }
              },
              {
                "featureType": "highway",
                "elementType": "geometry.fill",
                "stylers": {
                  "color": "#005b96",
                  "lightness": 1
                }
              },
              {
                "featureType": "highway",
                "elementType": "labels",
                "stylers": {
                  "visibility": "off"
                }
              },
              {
                "featureType": "arterial",
                "elementType": "geometry",
                "stylers": {
                  "color": "#004981"
                }
              },
              {
                "featureType": "arterial",
                "elementType": "geometry.fill",
                "stylers": {
                  "color": "#00508b"
                }
              },
              {
                "featureType": "poi",
                "elementType": "all",
                "stylers": {
                  "visibility": "off"
                }
              },
              {
                "featureType": "green",
                "elementType": "all",
                "stylers": {
                  "color": "#056197",
                  "visibility": "off"
                }
              },
              {
                "featureType": "subway",
                "elementType": "all",
                "stylers": {
                  "visibility": "off"
                }
              },
              {
                "featureType": "manmade",
                "elementType": "all",
                "stylers": {
                  "visibility": "off"
                }
              },
              {
                "featureType": "local",
                "elementType": "all",
                "stylers": {
                  "visibility": "off"
                }
              },
              {
                "featureType": "arterial",
                "elementType": "labels",
                "stylers": {
                  "visibility": "off"
                }
              },
              {
                "featureType": "boundary",
                "elementType": "geometry.fill",
                "stylers": {
                  "color": "#029fd4"
                }
              },
              {
                "featureType": "building",
                "elementType": "all",
                "stylers": {
                  "color": "#1a5787"
                }
              },
              {
                "featureType": "label",
                "elementType": "all",
                "stylers": {
                  "visibility": "off"
                }
              }
            ]
          }
        }


        //飞机形状 svg图标
        var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

        var convertData = function(data) {
          var res = [];
          for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            var fromCoord = geoCoordMap[dataItem[0].name];
            var toCoord = geoCoordMap[dataItem[1].name];
            if (fromCoord && toCoord) {
              res.push({
                fromName: dataItem[0].name,
                toName: dataItem[1].name,
                coords: [fromCoord, toCoord],
                value: dataItem[1].value
              });
            }
          }

          return res;
        };

        var color = ['#a6c84c', '#ffa022', '#46bee9'];
        var series = [];

        temp.forEach(function(item, i) {
          series.push(
            //原点
            {
              name: item[0] + ' Top10',
              type: 'effectScatter',
              coordinateSystem: 'bmap',
              zlevel: 2,
              rippleEffect: {
                brushType: 'stroke'
              },
              label: {
                normal: {
                  show: true,
                  position: 'right',
                  formatter: '{b}'
                }
              },
              symbolSize: function(val) {
                return val[2] / 4;
              },
              showEffectOn: 'render',
              itemStyle: {
                normal: {
                  color: color[i]
                }
              },
              data: [{
                name: '',
                value: geoCoordMap[item[0]].concat([100])
              }]
            },
            //原点到目标点移动的线
            {
              name: item[0] + ' Top10',
              type: 'lines',
              coordinateSystem: 'bmap',
              zlevel: 1,
              effect: {
                show: true,
                period: 6,
                trailLength: 0.7,
                color: '#fff',
                symbolSize: 3
              },
              lineStyle: {
                normal: {
                  color: color[i],
                  width: 0,
                  curveness: 0.2
                }
              },
              data: convertData(item[1])
            },
            //原点到目标点初始存在的线，飞机svg
            {
              name: item[0] + ' Top10',
              type: 'lines',
              coordinateSystem: 'bmap',
              // symbol: ['none', 'arrow'],
              // symbolSize: 10,
              zlevel: 2,
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
                  opacity: 0.4,
                  curveness: 0.2
                }
              },
              data: convertData(item[1])
            },
            //目标点
            {
              name: item[0] + ' Top10',
              type: 'effectScatter',
              coordinateSystem: 'bmap',
              zlevel: 2,
              rippleEffect: {
                brushType: 'stroke'
              },
              label: {
                normal: {
                  show: true,
                  position: 'right',
                  formatter: '{b}'
                }
              },
              symbolSize: function(val) {
                return val[2] / 4;
              },
              showEffectOn: 'render',
              itemStyle: {
                normal: {
                  color: color[i]
                }
              },
              data: item[1].map(function(dataItem) {
                return {
                  name: dataItem[1].name,
                  value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                };
              })
            }
          );
        });



        let option = {
          bmap: bmap,
          color: ['gold', 'aqua', 'lime'],

          title: {
            text: '泉州路线规划',
            subtext: '来自路线数据统计',
            // sublink:'http://data-visual.cn',
            left: 'center',
            textStyle: {
              color: '#fff'
            }
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            show: false,
            top: '50',
            left: 'center',
            data: ['北京 Top10', '上海 Top10', '广州 Top10'],
            textStyle: {
              color: '#fff'
            },
            selectedMode: 'multiple'
          },
          geo: {
            map: 'bmap',
            polyline: true,
            progressiveThreshold: 500,
            progressive: 200,
            label: {
              emphasis: {
                show: false
              }
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: '#323c48',
                borderColor: '#404a59'
              },
              emphasis: {
                areaColor: '#2a333d'
              }
            }
          },
          series: series
        }

        this.chart.setOption(option)
      }
    },
    mounted() {
      this.initChart()
    }
  }
</script>

<style scoped>
  .chart-container{
    background-color: #0a0f24;
    text-align: center;
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
