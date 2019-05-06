<template>
  <div>
    <p>近一周关键指标</p>
    <ul>
      <li>
        <p>新增人数</p>
        <div>{{tableData.add}}</div>
      </li>
      <li>
        <p>删除人数</p>
        <p></p>
      </li>
      <li>
        <p>净增人数</p>
        <p></p>
      </li>
    </ul>
  </div>

  <!--<div class="chart-container">-->
    <!--<userChart height="100%" width="100%"/>-->
  <!--</div>-->
</template>

<script>
  import userChart from '@/components/Charts/userChart'
  import {userMap} from '@/api/userManager'

  export default {
    name: "UserRoute",
    components: {userChart},
    data() {
      return {
        // 从后台获取的总数据
        tableData: [],
      }
    },
    mounted() {
      // 首次挂载列表组件
      userMap({}).then(response => {
        console.log(response)
        this.tableData = response
        console.log(this.tableData.data)
        // 获得数据总数
        this.total = response.data.total
      })
    },
  }
</script>

<style scoped>
  .chart-container {
    position: relative;
    width: 100%;
    height: calc(100vh - 84px);
  }
</style>
