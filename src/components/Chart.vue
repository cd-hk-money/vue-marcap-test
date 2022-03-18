<template>
 <div>
   <apexchart   
    width="300"
    height="300" 
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
    getChartType () { 
      return this.$props.chartType
    },
    options () { 
      return this.$store.state.chart.chartOptions 
    },
    series () { 
      return this.$store.getters['chart/getChartSeries'](this.$props.chartType)
    }
  },
  updated () {
    
  },
}
</script>