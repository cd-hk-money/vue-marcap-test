// 종목 상세정보 페이지

import axios from "axios"

export default {
  namespaced: true,
  state: () => ({
    stock: {},                // 종목 정보
    chartStock: {},           // 그래프 표현을 위한 종목 정보
    subSide: {},              // 유사종목, 뉴스

    stockLoading: false,      // 종목정보 로딩
    chartStockLoading: false, // 그래프 표현을 위한 종목 정보 로딩
    subSideLoading: false,    // 유사종목, 뉴스 로딩
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

    // /stockDetail/{title}
    // 그래프 표현을 위한 종목 정보를 가져온다.
    async getChartStockDetail ({commit, dispatch}, payload) {      
      try {
        commit('updateState', {
          chartStockLoading: true
        })
        const res = await axios.get(`/stockDetail/${payload.title}`, {
          requestDate: payload.requestDate
        })
        commit('updateState', {
          chartStockLoading: false,
          stock: res.data
        })

        const candleTemp = []
        dispatch('/chart/createChartData', {
          chartType: 'candle',
          data: candleTemp
        },{root: true})
      } catch (e) {
        console.log(e)
      }
    },

    // /stockDetail/{title}
    // 종목 정보를 가져온다.
    async getStockDetail ({commit}, payload) {
      try {
        commit('updateState', {
          stockLoading: true
        })
        const res = await axios.get(`/stockDetail/${payload.title}`)
        commit('updateState', {
          stockLoading: false,
          chartStock: res.data
        })

      } catch (e) {
        console.log(e)
      }
    },

    // /stockSubside/{title}
    // 유사종목, 뉴스를 가져온다.
    async getStockSubSide ({commit}, payload) {
      try {
        commit('updateSttae', {
          subSideLoading: true
        })
        const res = await axios.get(`/stockSubside/${payload.title}`)
        commit('updateState', {
          subSideLoading: false,
          subSide: res.data
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}