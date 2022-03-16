import axios from "axios"

export default {
  namespaced: true,
  state: () => ({
    stock: {},
    chartStock: {},
    subSide: {}
  }),
  getters: {

  },
  mutations: {
    updateState (state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },    
    initState (state) {
      state.stock = {}
      state.chartStock = {}
      state.subSide= {}
    }
  },
  actions: {
    async getStockDetail ({commit}, payload) {      
      try {
        const res = await axios.get(`/stockDetail/${payload.title}`, {
          requestDate: payload.requestDate
        })
        commit('updateState', {
          stock: res.data
        })
      } catch (e) {
        console.log(e)
      }
    },

    async getChartStockDetail ({commit, dispatch}, payload) {
      try {
        const res = await axios.get(`/stockDetail/${payload.title}`)
        commit('updateState', {
          chartStock: res.data
        })

        // res.data를 candle 데이터로 사용할 수 있게끔 가공?
        const candleTemp = []

        dispatch('/chart/createChartData', {
          chartType: 'candle',
          data: candleTemp
        },{root: true})
      } catch (e) {
        console.log(e)
      }
    },

    async getStockSubSide ({commit}, payload) {
      try {
        const res = await axios.get(`/stockSubside/${payload.title}`)
        commit('updateState', {
          subSide: res.data
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}