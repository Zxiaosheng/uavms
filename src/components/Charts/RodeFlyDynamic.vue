<template>
  <div class="chart-container">
    <div :id="id" :class="className" :style="{height:height,width:width}" />
  </div>
</template>

<script>

  import echarts from 'echarts'
  import resize from './mixins/resize'
  import bmap from 'echarts/extension/bmap/bmap';

  export default {
    name: "RodeDynamic.vue",
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
        default: '1200px'
      },
      height: {
        type: String,
        default: '700px'
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
        if(this.mapName==='福州'){

          startPoint = {
            x: 119.31217,
            y: 26.064285
          }

          //地图上的坐标对应地点
          geoCoordMap = {
            '福州大学': [119.203223,26.060391],
            '奥体公园': [119.277962,26.024034],
            '海峡会展中心': [119.372248,26.033124],
            '台江万达': [119.348389,26.058314],
            '三坊七巷': [119.302971,26.08817],
            '东二环泰禾': [119.344365,26.0944],
            '鼓山': [119.418817,26.085055],
            '福州站': [119.32683,26.119576],
            '福州南站': [119.39812,25.992342],

            '茶亭': [119.312888,26.072334],
            '师大': [119.21774,26.031436],
            '泰和福州院子': [119.361038,25.992732]
          }

          //[[{原点},{目标点,值}]]
          let BJData = [
            [{name: '三坊七巷'}, {name: '海峡会展中心',value: 60}],
            [{name: '三坊七巷'}, {name: '鼓山',value: 60}],
            [{name: '三坊七巷'}, {name: '福州站',value: 60}],
            [{name: '三坊七巷'}, {name: '福州大学',value: 60}]
          ];

          let SHData = [
            [{name: '福州站'}, {name: '福州南站',value: 60}],
          ];

          let GZData =[
            [{name: '海峡会展中心'}, {name: '三坊七巷',value: 60}],
            [{name: '海峡会展中心'}, {name: '泰和福州院子',value: 60}]
          ];
          let CTData =[
            [{name: '茶亭'}, {name: '师大',value: 60}],
            [{name: '师大'}, {name: '茶亭',value: 60}]
          ];
          let FDData =[
            [{name: '福州大学'}, {name: '奥体公园',value: 60}]
          ];

          temp=[
            ['三坊七巷', BJData],
            ['福州站', SHData],
            ['海峡会展中心', GZData],
            ['茶亭', CTData],
            ['福州大学', FDData]
          ]
        }else if(this.mapName==='厦门'){

          startPoint = {
            x: 118.124385,
            y: 24.51595
          }

          geoCoordMap = {
            '厦大(思明)': [118.112887,24.441889],
            '中山公园': [118.097077,24.465046],
            '鼓浪屿': [118.07408,24.451363],
            '沧海区': [118.049071,24.48662],
            '湖里万达': [118.182039,24.510032],
            '集美区': [118.101964,24.575247],
            '怀远公园': [118.241381,24.544484],
          }

          //[[{原点},{目标点,值}]]
          let BJData = [
            [{name: '厦大(思明)'}, {name: '湖里万达',value: 60}],
            [{name: '湖里万达'}, {name: '厦大(思明)',value: 60}],
            [{name: '湖里万达'}, {name: '怀远公园',value: 60}],
            [{name: '厦大(思明)'}, {name: '中山公园',value: 60}]
          ];

          let SHData = [
            [{name: '中山公园'}, {name: '鼓浪屿',value: 60}],
            [{name: '中山公园'}, {name: '沧海区',value: 60}],
            [{name: '鼓浪屿'}, {name: '中山公园',value: 60}],
          ];

          let GZData =[
            [{name: '集美区'}, {name: '沧海区',value: 60}],
            [{name: '沧海区'}, {name: '集美区',value: 60}]
          ];

          temp=[
            ['厦大(思明)', BJData],
            ['中山公园', SHData],
            ['集美区', GZData]
          ]
        }


        // 地图自定义样式
        let bmap = {
          center: [startPoint.x, startPoint.y],
          zoom: 13,
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
            text: this.mapName+'路线规划',
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
    position: relative;
    width: 100%;
    height: 100%;
    background-color: rgb(48,65,86);
  }
</style>
