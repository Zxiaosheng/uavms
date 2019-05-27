<template>
  <div :id="id" class="grid-content" :class="className" style="height:500px;width:100%"/>
</template>

<script>
  import echarts from 'echarts'
  import resize from '../../components/Charts/mixins/resize'
  import { fetchChartList} from '@/api/rode-echart'
    export default {
        name: "RodeChartPie",
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
          cp:{
            type: Number
          }
        },
        data() {
          return {
            chart: null,
            list:[],
            list1:[],
            name:'',
            cityId:''
          }
        },
        mounted() {
          this.changeCp()
      },
      watch:{
          cp(){
            this.changeCp()
          }
      },
      methods:{
        setChart(){
            //饼图
          this.chart = echarts.init(document.getElementById(this.id));
            let id={
              "cityId":this.cityId
            }
            fetchChartList(id).then(response => {
              console.log(response)
              this.list = response.data
              // this.list = response.data.item
              // for(var i=0;i<this.list.length;i++){
              //   this.list[i].value+= Math.round(Math.random() * 20)
              // }

              this.chart.setOption({

                title: {
                  text: this.name+'市五区飞行路线总数统计饼图',
                  left: 'center',
                  top: 20,
                  textStyle: {
                    color: '#ffffff'
                  }
                },

                tooltip: {
                  trigger: 'item',
                  formatter: "{a} <br/>{b} : {c} ({d}%)"
                },

                visualMap: {
                  show: false,
                  min: 80,
                  max: 600,
                  inRange: {
                    colorLightness: [0, 1]
                  }
                },
                series: [
                  {
                    name: '飞行航程',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '50%'],
                    data:this.list
                      .sort(function (a, b) {
                        return a.value - b.value;
                      }),
                    roseType: 'radius',
                    label: {
                      normal: {
                        textStyle: {
                          color: '#ffffff'
                        }
                      }
                    },
                    labelLine: {
                      normal: {
                        lineStyle: {
                          color: '#ffffff'
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20
                      }
                    },
                    itemStyle: {
                      normal: {
                        color: '#0f375f',
                      }
                    },
                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                      return Math.random() * 200;
                    }
                  }
                ]
              })
            })
          // console.log(this.name)
         },
        changeCp(){
          switch (this.cp) {
            case 1:
              this.cityId='A'
              this.name='福州'
              this.setChart()
              break;
            case 2:
              this.cityId='B'
              this.name='厦门'
              this.setChart()
              break;
            case 3:
              this.cityId='G'
              this.name='南平'
              this.setChart()
              break;
            case 4:
              this.cityId='C'
              this.name='泉州'
              this.setChart()
              break;
            case 5:
              this.cityId='D'
              this.name='漳州'
              this.setChart()
              break;
            case 6:
              this.cityId='H'
              this.name='三明'
              this.setChart()
              break;
            case 7:
              this.cityId='F'
              this.name='莆田'
              this.setChart()
              break;
            case 8:
              this.cityId='I'
              this.name='龙岩'
              this.setChart()
              break;
            case 9:
              this.cityId='E'
              this.name='宁德'
              this.setChart()
              break;
          }
        }
      }
    }
</script>

<style scoped>

</style>
