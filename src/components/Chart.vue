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
import { mapActions } from 'vuex'

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
  methods: {
    ...mapActions('chart', [
      'createChartData',
    ])
  },
  updated () {
    // this.createChartData({
    //   type: 'line',
    //   serie: this.$props.propSeries
    // })
    // this.createChartData({
    //   type: 'candle',
    //   serie: this.$props.propSeries
    // })
  },
}
</script>