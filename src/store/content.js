import axios from 'axios'
import * as _ from 'lodash'
import {numberRegularation} from '../tools/index.js'
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
    title: '',  // Search 컴포넌트의 title
    rangeSelected: "30일",
    loading: false,
    loaded: false,

    stock: {},  // 검색한 종목 하나에 대한 주가정보
    stocks: [], // 상장된 모든 종목
    subscribes: {}, // 구독여부
  }),
  getters: {
    // 이름과 코드 매핑
    nameMappingCode: state => {      
      const temp = {}
      state.stocks.map(stock => {
        temp[`${stock[1]}`] = stock[0]
      })
      return temp
    },

    // DetailsInfo Component에서 활용될 차트 이외의 데이터들
    recent: (state, getters) => {
      const stockCloseObj = Object.entries(state.stock).slice(-2)[0]
      const stockYesterdayCloseObj = Object.entries(state.stock).slice(-3)[0]
      return {        
        title: state.stock.Name,    // 기업 이름
        code: getters.nameMappingCode[state.stock.Name], // 기업 코드        
        closeDay: stockCloseObj[0],   // 최근 갱신일           
        closeValue: String(numberRegularation(stockCloseObj[1].Close)),   // 최근 종가   
        changeRate: String(stockCloseObj[1].Change.toFixed(3)),   // 최근 종가 변화율     
        changeValue: numberRegularation((stockCloseObj[1].Close * stockCloseObj[1].Change).toFixed(0)),   // 최근 종가 변화량
        closeVolume: numberRegularation(stockCloseObj[1].Volume),   // 최근 거래량
        changeVolume: String(numberRegularation(stockCloseObj[1].Volume - stockYesterdayCloseObj[1].Volume)), // 최근 거래량 변화율
        changeVolumeRate: numberRegularation(                                                                 // 최근 거래량 변화량
          ((stockCloseObj[1].Volume - stockYesterdayCloseObj[1].Volume) / stockYesterdayCloseObj[1].Volume * 100).toFixed(0))
      }
    },

    // 시가총액 TOP 10
    volumeRank: state => {
      const temp = []
      state.stocks.map(stock => {
        temp.push({
          name: stock[1],
          code: stock[0]
        })
      })
      return temp.slice(0, 10)
    },
    
    // 자동완성을 위한 종목명 테이블
    searchStates: state => {
      const temp = []
      state.stocks.map(stock => {
        temp.push(stock[1])
      })
      return state.stocks
    },
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
    async searchContents ({ state, commit}, payload) {
      const requestDate = DAYENUM[state.rangeSelected]
      try {
        commit('updateState', {
          loading: true
        })
        const root = parseInt(payload) ? 'findByCode' : 'findByName'        
        const url = `/${root}/${payload}/${requestDate}`          
        const res = await axios.get(url, HEADER) 

        const tempStock = _.cloneDeep(res.data)  
        commit('updateState', {
          stock: tempStock,
          loading: false,
          loaded: true,
          title: ''
        })
        commit('chart/createChartData', {
          chartType: 'candle',
          stock: tempStock
        },{ root: true })
        commit('chart/createChartData', {
          chartType: 'line',
          stock: tempStock
        },{ root: true })
      } catch(e) {
        console.log(e)
      }
    },

    async getTodayContents ({commit}) {
      try {
        const url = '/today'
        const res = await axios.get(url ,HEADER) 

        commit('updateState', {
          stocks: res.data.data,
        })
      } catch(e) {
        console.log(e)
      }       
    },
  }
}