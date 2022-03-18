export default {
  namespaced :true,
  state: ()=>({
    chartOptions: {
      chart: {
        background: '#fff',
        animations: {
          enabled: true,
          easing: 'easinout',
          animateGradualiy: {
            enabled: true,
            delay: 500
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
      stroke: {
        show: true,
        curve: 'smooth'
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
    },
    getChartSeries: state => payload => {
      return payload.type === 'line'? state.lineData : state.candleData
    },
  },
  mutations: {
    updateState (state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },

    createChartData (state, payload) {
      const {chartType, stock} = payload
      let temp = []

      if (chartType === 'candle') {
        for (let entry of Object.entries(stock)) {          
          temp.push({
            x: entry[0].slice(5, ),
            y: [
              entry[1].Open,
              entry[1].High,
              entry[1].Low,
              entry[1].Close
            ]
          })
        }

        state.candleData = [{
          name: stock.Name,
          data: temp.slice(0, -1)
        }]        

      } else if (chartType === 'line') {
        for (let entry of Object.entries(stock)) {
          temp.push({
            x: entry[0].slice(5, ),
            y: entry[1].Volume
          })
        }   

        state.lineData = [{
          name: stock.Name,
          data: temp.slice(0, -1)
        }]

      } else {
        console.log('error!')
      }
    }
  },
  actions: {

  }
}