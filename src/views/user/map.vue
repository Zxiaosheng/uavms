<template>
  <div class="allBox">
    <h4>无人机用户管理</h4>
    <div class="body">
      <div>近一周关键指标</div>
      <ul style="margin:0;padding:0;display: flex;align-items: center;justify-content: center;">
        <div shadow="always" :id="id1" :class="className1"
             style="background:#1F2D29;height:150px;width:350px;margin:20px"/>
        <li class="bor">
          <p>新增人数</p>
          <p>{{ tableData.add }}</p>
        </li>
        <li class="bor">
          <p>删除人数</p>
          <p>{{ tableData.del }}</p>
        </li>
        <li>
          <p>净增人数</p>
          <p>{{ newadd }}</p>
        </li>
      </ul>
    </div>
    <div class="pieChar">
      <div class="chart-container">
        <userChart height="80%" :aaa="value1" width="80%"/>
      </div>
    </div>
  </div>
</template>

<script>
  import userChart from '@/components/Charts/userChart'
  import {userMap} from '@/api/userManager'
  import echarts from 'echarts'
  import resize from '../../components/Charts/mixins/resize'

  export default {
    name: "UserRoute",
    components: {userChart},
    props: {
      mixins: [resize],
      className1: {
        type: String,
        default: 'chart1'
      },
      id1: {
        type: String,
        default: 'id1'
      },
    },
    data() {
      return {
        // 从后台获取的总数据
        tableData: {},
        newadd: '',
        value1: [],
        chart1: '',
      }
    },
    mounted() {
      this.chart1 = echarts.init(document.getElementById(this.id1));
      // 首次挂载列表组件
      userMap({}).then(response => {
        this.tableData = response.data
        // 获得数据总数
        this.total = response.data.total
        this.newadd = response.data.add - response.data.del
        //空圆形图
        this.chart1.setOption({
          backgroundColor: 'rgb(44,52,60)',
          color: ['#6F00D2', '#C23531', '#6cacde'],
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data: ['新增人数', '删除人数', '净增人数'],
            textStyle: {
              color: "white",
              fontWeight: "600",
              fontFamily: "楷体",
            },
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['40%', '60%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '10',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              backgroundStyle: {
                borderWidth: 5, //内边框宽度
                borderColor: 'yellow', //背景内边框
                color: 'white', //背景颜色
                shadowColor: 'red', //阴影
                shadowBlur: 10, //阴影模糊
              },
              outline: {
                itemStyle: {
                  borderWidth: '100',
                  borderColor: 'yellow',
                  shadowBlur: 10,
                  shadowColor: 'red',
                  borderRadius: 30,
                }
              },
              data: [
                {value: this.tableData.add, name: '新增人数'},
                {value: this.tableData.del, name: '删除人数'},
                {value: this.tableData.add - this.tableData.del, name: '净增人数'},
              ]
            }
          ]
        });
      })
    },
    methods: {
      getSTime(val) {
        console.log('val', val)
        this.value1 = val;//这个sTime是在data中声明的，也就是v-model绑定的值
      }
    }
  }
</script>

<style scoped>
  .chart-container {
    position: relative;
    width: 100%;
    height: calc(220vh - 30px);
  }

  ul, li, p {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .body {
    margin-top: 10px;
    border: 1px solid grey;
    margin: 0 auto;
  }

  .body > div, .pieNum {
    font-size: 15px;
    padding-left: 5px;
    font-weight: 600;
    font-family: "楷体", "楷体_GB2312";
  }

  ul {
    display: flex;
  }

  ul > li {
    height: 100px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .bor {
    border-right: 1px solid gainsboro;
  }

  ul > li > p {
    font-size: 18px;
    height: 45px;
  }

  h4 {
    text-align: center;
    margin: 0 auto;
    height: 40px;
    line-height: 40px;
    color: white;
  }

  .pieChar {
    margin-top: 10px;
    border: 1px solid grey;
  }

  .allBox {
    background: #304156;
  }
</style>
