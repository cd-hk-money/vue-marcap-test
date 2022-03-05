import { defineStore } from 'pinia' 

export const useChartStore = defineStore('chart_pinia', {
  state: () => ({
    series: [],
    chartOptions: {
      chart: {
        background: '#F0FFFF',
        animations: {
          enabled: true,
          easing: 'easinout',
          animateGradualiy: {
            enabled: true,
            delay: 300
          }
        },
        annotations: {
          // xaxis: [
          //   {
          //     x: 'Oct 06 14:00',
          //     borderColor: '#00E396',
          //     label: {
          //       borderColor: '#00E396',
          //       stlye: {
          //         fontSize: '12px',
          //         color: '#fff',
          //         background: '#00E396'
          //       },
          //       orientation: 'horizontal',
          //       offsetY: 7,
          //       text: 'CODMA'
          //     }
          //   }
          // ]
        },
        toolbar: {
          show: true,
          tools: {
            download: false,
            selection: false,
            pan: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            reset: false
          },
          export: {
            enable: false
          },
          autoSelected: 'zoom'
        },
        id: `123`
      },
      type: 'candlestick',
      xaxis: {
        type: '',
      },
      yaxis: {
        tooltop: {
          enabled: false
        }
      },
      plotOptions: {
        candlestick: {
          wick: {
            useFillColor: true
          }
        }
      }
    },
    candleData: null,
    lineData: null
  }),
  getters: {

  },
  actions: {
    createChartData ({type, data}) {
      let temp = []
      let linetemp = []

      if (type === 'candle') {
        for (let entry of Object.entries(data)) {
          temp.push({
            x: entry[0],
            y: [
              entry[1].Open, entry[1].High, entry[1].Low, entry[1].Close
            ]
          })
        }

        // commit vuex
        this.candleData = temp
      } else if (type === 'line') {
        for (let entry of Object.entries(data)) {
          temp.push({
            x: entry[0],
            y: entry[1].Close
          })
        }
        linetemp = [{
          series: [{
            name: data.Name,
            data: temp.slice(1, -1)
          }]
        }]
        
        // commit vuex
        this.lineData = linetemp[0].series
      } else {
        console.log('타입이 일치하지 않음.')
      }
    }
  }
})