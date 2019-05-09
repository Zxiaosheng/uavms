<template>
  <div :id="id" :class="className" style="height:400px;width:98%"/>
</template>

<script>
  import echarts from 'echarts'
  import resize from '../mixins/resize'
  import bmap from 'echarts/extension/bmap/bmap'

  export default {
    mixins: [resize],
    name: "BarChart",
    props: {
      place: {
        type: Array,
      },
      list: {
        type: Array,
      },
      id: {
        type: String,
        default: 'id4'
      },
      className: {
        type: String,
        default: 'chart4'
      },
    },
    mounted() {
      this.chart = echarts.init(document.getElementById(this.id));
      let data = pieData(this.place, this.list);
      var geoCoordMap = {
        '北京市': [116.46, 39.92],
        '安徽': [117.27, 31.86],
        '福建省': [119.3, 26.08],
        '甘肃省': [103.73, 36.03],
        '广东省': [113.23, 23.16],
        '广西壮族自治区': [108.33, 22.84],
        '新疆维吾尔自治区': [43.791789, 87.624947],
        '宁夏回族自治区': [106.27, 38.47],
        '贵州省': [106.71, 26.57],
        '河北省': [114.48, 38.03],
        '河南省': [113.65, 34.76],
        '贵州省': [106.71, 26.57],
        '辽宁省': [123.429092, 41.796768],
        '吉林省': [125.324501, 43.886841],
        '黑龙江省': [126.642464, 45.756966],
        "天津市": [117.190186, 39.125595],
        '内蒙古': [111.751990, 40.841490],
        '宁夏省': [106.232480, 38.486440],
        '山西省': [112.549248, 37.857014],
        '河北省': [114.502464, 38.045475],
        "山东省": [117.000923, 36.675808],
        '陕西省': [108.948021, 34.263161],
        '湖北省': [114.298569, 30.584354],
        '江苏省': [118.76741, 32.041546],
        '安徽省': [117.283043, 31.861191],
        '上海': [121.472641, 31.231707],
        '湖南省': [112.982277, 28.19409],
        '江西省': [115.892151, 28.676493],
        '浙江省': [120.15358, 30.287458],
        '广东省': [113.28064, 23.125177],
        '台湾': [121.5200760, 25.0307240],
        '云南省': [102.71225, 25.040609],
        '贵州省': [106.713478, 26.578342],
        '四川省': [104.065735, 30.659462],
        '青海省': [101.777820, 36.617290],
        '西藏省': [91.11450, 29.644150],
        '新疆省': [87.616880, 43.826630],
        '香港特别行政区': [114.165460, 22.275340],
        '澳门特别行政区': [113.549130, 22.198750],
        '天津': [117.20, 39.12],
        '重庆': [106.55, 29.57]
      };
      let convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            });
          }
        }
        return res;
      };
      this.chart.setOption({
        title: {
          text: '用户人数地区分布',
          left: 'left',
          top: 20,
          textStyle: {
            color: "white",
            fontWeight: "600",
            fontFamily: "楷体",
          },
        },
        tooltip: {
          trigger: 'item'
        },
        bmap: {
          center: [112.982277, 28.19409],
          zoom: 5,
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
        },
        series: [
          {
            name: 'pm2.5',
            type: 'scatter',
            coordinateSystem: 'bmap',
            data: convertData(data),
            symbolSize: function (val) {
              return val[2] / 10;
            },
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: false
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: '#ddb926'
              }
            }
          },
          {
            name: 'Top 5',
            type: 'effectScatter',
            coordinateSystem: 'bmap',
            data: convertData(data.sort(function (a, b) {
              return b.value - a.value;
            }).slice(0, 6)),
            symbolSize: function (val) {
              return val[2] / 10;
            },
            showEffectOn: 'emphasis',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: '#f4e925',
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },
            zlevel: 1
          },
          {
            type: 'custom',
            coordinateSystem: 'bmap',
            renderItem: function (params, api) {
              var points = [];
              var color = api.visual('color');

              return {
                type: 'polygon',
                style: api.style({
                  fill: color,
                  stroke: echarts.color.lift(color)
                })
              };
            },
            itemStyle: {
              normal: {
                opacity: 0.5
              }
            },
            animation: false,
            silent: true,
            data: [0],
            z: -10
          }
        ]
      })
    },
  }
  function pieData(a, b) {
    let c = [];
    for (let i = 0; i < a.length; i++) {
      c[i] = {name: a[i], value: b[i]}
    }
    return c
  }
</script>

<style>


</style>
