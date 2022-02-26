<template>
 <div>
   <apexchart width="400" type="candlestick" :options="options" :series="candleSeries"></apexchart>
 </div>
</template>
<script>
import VueApexCharts from 'vue-apexcharts'
export default {
  components: {
    apexchart: VueApexCharts
  },
  props: {
    propSeries: Object,
    name: String
  },
  computed: {
    candleSeries () {
      let candleData = []

      for(let entry of Object.entries(this.$props.propSeries)){
        candleData.push({
          x: entry[0],
          y: [
            entry[1].Open,
            entry[1].High,
            entry[1].Low,
            entry[1].Close,
          ]          
        })
      }
      return [{
        name : this.$props.name,
        data: candleData
      }]
      // return this.$store.state.chart.candleData
    },
    options: {
      get () {
        return this.$store.state.chart.chartOptions
      },
      set () {

      }
    }
  },
  created () {
    console.log('chart created.')
  },
  updated () {
    console.log('chart updated.')
  }
  
}
</script>