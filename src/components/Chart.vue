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
  props: [
    'propSeries',
    'chartType',
    'name'
  ],
  computed: {
    candleSeries () {
      console.log('candle!')
      let data = this.$store.state.chart.candleData.slice(1, -1)
      return [{
        name: this.$props.name,
        data: data
      }]
    },
    getChartType () {
      return this.$props.chartType
    },
    lineSeries () {
      return this.$store.state.chart.lineData
    },
    series () {
      let type = this.$props.chartType
      if (type === 'line') {
        console.log('lineSeriesCalled')
        return this.lineSeries
      } else
      return this.candleSeries 
    },
    options: {
      get () {
        return this.$store.state.chart.chartOptions
      },
      set () {

      }
    }
  },
  methods: {
    ...mapActions('chart', [
      'createCandledata',
      'createLinedata'
    ])
  },
  created () {
    this.createCandledata(this.$props.propSeries)
    this.createLinedata(this.$props.propSeries)
  },
  updated () {

  }  
}
</script>