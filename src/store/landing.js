// 랜딩 페이지

import axios from "axios"
export default {
  namespaced: true,
  state: () => ({
    daily: {},            // 오늘의 주식시장 Obj
    amountTop: {},        // 거래대금 상위 10 Obj
    changeRatioTop: {},    // 등락률 상위 10 Obj

    dailyLoading: false,  // 오늘의 주식시장 로딩
    amountLoading: false, // 거래대금 로딩
    changeRatioLoading: false, // 등락률 로딩
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
      state.amountTop = {}
      state.changeRatioTop = {}
    },
  },
  actions: {

    // /daily
    async getDailyMaket ({commit}) {
      try {
        commit('updateState', {
          dailyLoading: true
        })  
        const res = await axios.get('/daily')
        commit('updateState', {
          dailyLoading: false,
          daily: res.data
        })
      } catch (e) {
        console.log(e)
      }
    },

    // /stocks_marcap/amount_top
    async getAmountTop ({commit}) {
      try {
        commit('updateState', {
          amountLoading: true
        })
        const res = await axios.get('/stocks_marcap/amount_top')
        commit('updateState', {
          amountLoading: false,
          amountTop: res.data
        })
      } catch (e) {
        console.log(e)
      }
    },

    // /stocks_marcap/changeratio_top
    async getChangeRatioTop ({commit}) {
      try {
        commit('updateState', {
          changeRatioLoading: true
        })
        const res = await axios.get('/stocks_marcap/changeratio_top')
        commit('updateState', {
          changeRatioLoading: false,
          changeRatioTop: res.data
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}