<template>
 <div>
   <apexchart   
    width="400" 
    :type="getChartType" 
    :options="options" 
    :series="series"></apexchart>
 </div>
</template>
<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  components: {
    apexchart: VueApexCharts
  },
  props: ['propSeries','chartType','name'],
  computed: {
    candleSeries () {
      return this.$store.state.chart.candleData
    },
    lineSeries () { 
      return this.$store.state.chart.lineData 
    },
    getChartType () { 
      return this.$props.chartType
    },
    options () { 
      return this.$store.state.chart.chartOptions 
    },
    series () { 
      return this.$props.chartType === 'line' ? this.lineSeries : this.candleSeries 
    }
  },
  updated () {
    
  },
}
</script>