<template>
  <div class="chart-container">
    <h3>Inventory by type:</h3>
    <chart class="chart" />
    <h3>Prices per toy type:</h3>
    <lineCart class="chart" />
  </div>
</template>

<script>
import chart from '../cmps/chart.dougnut.vue'
import lineCart from '../cmps/chart.line.vue'
export default {
  components: {
    chart,
    lineCart,
  },
}
</script>

<style>
.chart {
  width: 30%;
  margin: 0 auto;
}
.chart-container {
  padding-top: 5vh;
  display: flex;
}
</style>
