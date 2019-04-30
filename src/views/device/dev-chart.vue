<template>

    <el-row>
      <el-col :span="12"><RadarChart height="400px" width="300px"/></el-col>
      <el-col :span="12"><BarChart height="400px" width="600px"/></el-col>
    </el-row>

</template>

<script>
  import RadarChart from '@/components/Charts/RadarChart'
  import BarChart from '@/components/Charts/BarChart'

  export default {
    name: "dev-chart",
    components: { RadarChart,BarChart },
    data(){
      return{
        msg: 'hello'
      }
    }
  }
</script>

<style scoped>

</style>
