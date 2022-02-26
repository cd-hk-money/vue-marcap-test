export default {
  namespaced :true,
  state: ()=>({
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
  mutations: {
    updateState (state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    }
  },
  actions: {
    createCandledata ({ commit }, payload) {
      const tempCandleData = []
      for(let entry of Object.entries(payload)){
        tempCandleData.push({
          x: entry[0],
          y: [
            entry[1].Open, 
            entry[1].High,
            entry[1].Low,
            entry[1].Close,
          ]
        })
      }
      commit('updateState',{
        candleData: tempCandleData
      })
    },
    createLinedata ({ commit }, payload) {
      const temp = []
      for(let entry of Object.entries(payload)){
        temp.push({
          x: entry[0],
          y: entry[1].Close
        })        
      }
      const tempLineData = [{
        series: [{
          name: payload.Name,
          data: temp.slice(1, -1)
        }]
      }]
      commit('updateState', {
        lineData: tempLineData[0].series
      })    
    },
  }
}