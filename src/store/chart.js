export default {
  namespaced :true,
  state: ()=>({
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
    candleData: [],
    lineData: []
  }),
  getters: {
    vuetifyChart: state => payload => {      
      const temp = []
      state.lineData[0].data.map(v => {
        temp.push(v.y)
      })
      return temp.slice(0, payload.requestDate)
    }
  },
  mutations: {
    updateState (state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    }
  },
  actions: {
    createChartData ({ commit }, payload) {
      const {chartType, stock} = payload
      let temp = []
      let chartTemp = []
      let lineTemp = []      

      if (chartType === 'candle') {
        for (let entry of Object.entries(stock)) {
          temp.push({
            x: entry[0],
            y: [
              entry[1].Open,
              entry[1].High,
              entry[1].Low,
              entry[1].Close
            ]
          })
        }

        chartTemp = [{
          name: stock.Name,
          data: temp.slice(0, -1)
        }]

        commit('updateState', {
          candleData: chartTemp
        })
      } else if (chartType === 'line') {
        for (let entry of Object.entries(stock)) {
          temp.push({
            x: entry[0],
            y: entry[1].Volume
          })
        }        

        lineTemp = [{
          name: stock.Name,
          data: temp.slice(0, -1)
        }]

        commit('updateState', {
          lineData: lineTemp
        })
      } else {
        console.log('error!')
      }
    }
  }
}