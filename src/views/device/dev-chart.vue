<template>

    <el-row>
      <el-col :span="12"><RadarChart :res='res' height="400px" width="80%"/></el-col>
      <el-col :span="12"><BarChart :loss='loss' height="400px" width="100%"/></el-col>
    </el-row>

</template>

<script>
  import RadarChart from '@/components/Charts/RadarChart'
  import BarChart from '@/components/Charts/BarChart'

  export default {
    name: "dev-chart",
    props: ['dev'],
    components: { RadarChart,BarChart },
    data(){
      return{
        msg: 'hello'
      }
    },
    computed: {
      res(){
        return this.dev.res
      },
      loss(){
        return this.dev.loss
      }
    }
  }
</script>

<style scoped>

</style>
