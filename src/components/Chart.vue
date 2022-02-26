<template>
 <div>
   <apexchart width="400" type="candlestick" :options="options" :series="candleSeries"></apexchart>
 </div>
</template>
<script>
import VueApexCharts from 'vue-apexcharts'
import { mapActions } from 'vuex'
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
      return [{
        name : this.$props.name,
        data: this.$store.state.chart.candleData
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
  methods: {
    ...mapActions('chart', [
      'createCandledata'
    ])
  },
  created () {
    this.createCandledata(this.$props.propSeries)
  },
  updated () {
  }
  
}
</script>