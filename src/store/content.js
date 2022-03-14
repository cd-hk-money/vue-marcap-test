import axios from 'axios'
import * as _ from 'lodash'
const DAYENUM = Object.freeze({"1일": 1, "5일": 5, "10일": 10, "30일": 30})
// const STOCK = Object({"단일종목": 1, "전체종목": 2})
const HEADER = {
  headers: {
    'Content-Type': 'text/plain;charset=utf-8'
  }
}

export default {
  namespaced: true,
  state: () => ({
    title: '',
    rangeSelected: "30일",
    stockSelected: "단일종목",
    loading: false,
    loaded: false,
    stock: {},
    stocks: {},
    subscribes: {},
    volumeRank: {},
    nameMappingCode: {},
    searchStates: []
  }),
  getters: {

  },
  mutations: {
    updateState (state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    initStock (state) {
      state.stock = null
    },
    subscribeChange (state, payload) {
      state.subscribes[payload] = !state.subscribes[payload]
    }
  },
  actions: {

    async searchContents ({ state, commit, dispatch}, payload) {
      const requestDate = DAYENUM[state.rangeSelected]
      const title = payload
      try {
        commit('updateState', {
          loading: true
        })
        const root = parseInt(payload) ? 'findByCode' : 'findByName'        
        const url = `/${root}/${title}/${requestDate}`          
        const res = await axios.get(url, HEADER) 

        const tempStock = _.cloneDeep(res.data)  
        commit('updateState', {
          stock: tempStock,
          loading: false,
          loaded: true,
          title: ''
        })
        dispatch('chart/createChartData', {
          chartType: 'candle',
          stock: tempStock
        },{ root: true })
        dispatch('chart/createChartData', {
          chartType: 'line',
          stock: tempStock
        },{ root: true })
      } catch(e) {
        console.log(e)
      } finally {
        console.log("searchContents done.")
      }
    },

    async getTodayContents ({commit}) {
      try {
        const url = '/today'
        const res = await axios.get(url ,HEADER) 

        const nameMappingCodeTemp = {}
        const volumeRankTemp = []
        const searchStatesTemp = []
        const subscribesTemp = {}
        
        res.data.data.map( stock => {
          const title = stock[1]
          const code = stock[0]
          nameMappingCodeTemp[`${title}`] = code
          subscribesTemp[`${title}`] = false
        })

        res.data.data.slice(0,9).map( stock => {
          volumeRankTemp.push({
            name: stock[1],
            code: stock[0]
          })
        })

        res.data.data.map( stock => {
          searchStatesTemp.push(stock[1])
        })

        commit('updateState', {
          volumeRank: volumeRankTemp,
          nameMappingCode: nameMappingCodeTemp,
          searchStates: searchStatesTemp,
          subscribes: subscribesTemp
        })
      } catch(e) {
        console.log(e)
      }       
    },
  }
}