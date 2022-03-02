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
    nameMappingCode: {},
    kospi: {}
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
    // # payload로 주어진 인자로 AJAX요청
    async searchContents ({ state, commit, dispatch }, payload) {
      const selectedDay = DAYENUM[state.rangeSelected]

      console.log(state)              
      try {
        commit('updateState', {
          loading: true
        })
        const root = findByX(payload)
        const url = `/${root}/${payload}/${selectedDay}`          
        const res = await axios.get(url, HEADER) 
        let tempStock = _.cloneDeep(res.data)  
        commit('updateState', {
          stock: tempStock,
          loading: false,
          loaded: true,
          title: ''
        })
        dispatch('chart/createChartData', {
          type: 'candle',
          data: tempStock
        },{root: true})
        dispatch('chart/createChartData', {
          type: 'line',
          data: tempStock
        },{root: true})
      } catch(e) {
        console.log(e)
      } 
    },

    // 오늘의 기업 지표를 가져오고, 특정 기준에 따라 정렬된 데이터를 store에 저장
    async getTodayContents ({ state, commit, dispatch }) {
      try {
        const url = '/today'
        const res = await axios.get(url ,HEADER) 
        const nameMappingCodeTemp = {}
        const volumeRankTemp = []
        const res_kos = await axios.get('/today/KOSPI', HEADER)

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
          nameMappingCode: nameMappingCodeTemp,
          kospi: res_kos.data
        })
        dispatch('chart/createCandledata', state.kospi, {root: true})
      } catch(e) {
        console.log(e)
      }       
    }

  }
}

function findByX (arg) {
  return parseInt(arg) ? 'findByCode' : 'findByName'
}

 