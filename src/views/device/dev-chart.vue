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

        let resTemp={
          windRes: {
            name: '抗风系数',
            value: this.dev.windRes
          },
          waterRes: {
            name: '抗水系数',
            value: this.dev.waterRes
          },
          hitRes: {
            name: '放撞击系数',
            value: this.dev.hitRes
          },
          flexibility: {
            name: '灵活系数',
            value: this.dev.flexibility
          },
          emcRes: {
            name: '抗电磁干扰系数',
            value: this.dev.emcRes
          }
        }
        return resTemp
      },
      loss(){

        let lossTemp = {
          wingLoss: {
            name: '机翼损耗率',
            value: this.dev.wingLoss
          },
          powerLoss: {
            name: '电池损耗率',
            value: this.dev.powerLoss
          },
          cameraLoss: {
            name: '摄像头损耗率',
            value: this.dev.cameraLoss
          },
          packLoss: {
            name: '机舱损耗率',
            value: this.dev.packLoss
          },
          engineLoss: {
            name: '引擎损耗率',
            value: this.dev.engineLoss
          },
          baseLoss: {
            name: '底座损耗率',
            value: this.dev.baseLoss
          }
        }
        return lossTemp
      }
    }
  }
</script>

<style scoped>

</style>
