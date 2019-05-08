<template>
  <div class="chart-container">
    <chart height="100%" width="100%" />
  </div>
</template>

<script>
  import Chart from '@/components/Charts/HistorycountBar'

  export default {
    name: 'Bar',
    components: { Chart }
  }
</script>

<style>
  .chart-container{
    position: relative;
    width: 100%;
    height: calc(95vh - 25px);
    background-color: #304156;
  }
</style>
