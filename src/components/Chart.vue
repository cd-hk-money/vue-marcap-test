<template>
 <div>
   <apexchart   
    width="400" 
    :type="chartType" 
    :options="options" 
    :series="series"></apexchart>
 </div>
</template>
<script>
import VueApexCharts from 'vue-apexcharts'
import { useChartStore } from '../store/chart_pinia'
import { computed, reactive, toRefs } from '@vue/composition-api'

function useChart(props) {
  
  const chartStore = useChartStore()

  let state = reactive({
    candleSeries: computed(() => {
      [{
        name: props.name,
        data: chartStore.candleData.slice(1, -1)
      }]
    }),
    lineSeries: computed(() => chartStore.lineData),
    chartType: computed(() => props.chartType),
    series: computed(() => {
      if (props.chartType === 'line') return this.lineSeries
      else return this.candleSeries
    }),
    options: computed(() => chartStore.chartOptions)
  })

  return toRefs(state)
}

export default {
  components: {
    apexchart: VueApexCharts
  },
  props: ['propSeries','chartType','name'],
  setup (props) {
    // use store
    let {candleSeries, lineSeries, chartType, series, options } = useChart(props)
    const chartStore = useChartStore()
    // created
    chartStore.createChartData({
      type: 'line',
      series: props.propSeries
    })
    chartStore.createChartData({
      type: 'candle',
      series: props.propSeries
    })
    
    return { candleSeries, lineSeries, chartType, series, options }
  }
}
</script>