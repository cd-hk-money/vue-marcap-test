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
    contents: [],
    stock: {},
    singleStock: {},
    volumeRank: {},
    nameMappingCode: {}
  }),
  getters: {},
  mutations: {
    updateState (state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    initStock (state) {
      state.stock = null
    }
  },
  actions: {
    async searchContents ({ state, commit, dispatch }, payload) {
      const selectedDay = DAYENUM[state.rangeSelected]
      // const selectedStock = STOCK[state.stockSelected]
      // if (!state.title && selectedStock === 1)
      //   return
              
      try {
        commit('updateState', {
          loading: true
        })
        const root = findByX(payload)
        const url = `/${root}/${payload}/${selectedDay}`          
        const res = await axios.get(url, HEADER) // finance_server.py
        let tempStock = _.cloneDeep(res.data)  
        commit('updateState', {
          stock: tempStock,
          loading: false,
          loaded: true,
          title: ''
        })
        dispatch('chart/createCandledata', tempStock, {root: true})
        dispatch('chart/createLinedata', tempStock, {root: true})
      } catch(e) {
        console.log(e)
      } 
    },

    // 오늘의 기업 지표를 가져오고, 특정 기준에 따라 정렬된 데이터를 store에 저장
    async getTodayContents ({ commit }) {
      try {
        const url = '/today'
        const res = await axios.get(url ,HEADER) // finance_server.py
        const nameMappingCodeTemp = {}
        const volumeRankTemp = []

        res.data.data.map( stock => {
          nameMappingCodeTemp[`${stock[1]}`] = stock[0]
        })
        res.data.data.slice(0,9).map( stock => {
          volumeRankTemp.push({
            name: stock[1],
            code: stock[0]
          })
        })
        commit('updateState', {
          volumeRank: volumeRankTemp,
          nameMappingCode: nameMappingCodeTemp
        })
      } catch(e) {
        console.log(e)
      }
       
    }
  }
}

function findByX (arg) {
  return parseInt(arg) ? 'findByCode' : 'findByName'
}

 