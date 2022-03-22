import axios from 'axios'
import * as _ from 'lodash'
import {numberRegularation} from '../tools/index.js'

// const DAYENUM = Object.freeze({"1일": 1, "5일": 5, "10일": 10, "30일": 30})
// const HEADER = {
//   headers: {
//     'Content-Type': 'text/plain;charset=utf-8'
//   }
// }

export default {
  namespaced: true,
  state: () => ({
    title: '',                // 검색창
    subscribes: {},           // 구독여부

    stock: {},                // 종목 상세 정보
    chartStock: {},           // 그래프 표현을 위한 종목 정보
    subSide: {},              // 유사종목, 뉴스
    
    stocks: [],               // 상장된 모든 종목
    daily: {},                // 오늘의 주식시장
    dailyRank: {},            // 거래대금, 등락률
    
    stockLoading: false,      // 종목 상세정보 로딩
    chartStockLoading: false, // 그래프 표현을 위한 종목 정보 로딩
    subSideLoading: false,    // 유사종목, 뉴스 로딩

    dailyLoading: false,      // 오늘의 주식시장 로딩
    dailyRankLoading: false   // 거래대금, 등락률 로딩
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
    subscribeChange (state, payload) {
      state.subscribes[payload] = !state.subscribes[payload]
    }
  },
  actions: {

    // /stock/{stockId}/{requestDate}
    // 그래프 표현을 위한 종목 정보를 가져온다.
    async getChartStockDetail ({commit, dispatch}, {stockId, requestDate}) {      
      try {
        commit('updateState', {
          chartStockLoading: true
        })
        const res = await axios.get(`/stock/${stockId}/${requestDate}`)
        commit('updateState', {
          chartStockLoading: false,
          chartStock: res.data
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

    // /stock/{stockId}
    // 종목의 상세정보를 가져온다.
    async getStockDetail ({commit}, {stockId}) {
      try {
        commit('updateState', {
          stockLoading: true
        })
        const res = await axios.get(`/stock/${stockId}}`)
        commit('updateState', {
          stockLoading: false,
          chartStock: res.data
        })

      } catch (e) {
        console.log(e)
      }
    },

    // /stock/Sub/{stockId}
    // 유사종목, 뉴스를 가져온다.
    async getStockSub ({commit}, {stockId}) {
      try {
        commit('updateSttae', {
          subSideLoading: true
        })
        const res = await axios.get(`/stock/Sub/${stockId}`)
        commit('updateState', {
          subSideLoading: false,
          subSide: res.data
        })
      } catch (e) {
        console.log(e)
      }
    },

    // 랜딩 페이지
    
    // /daily
    // 오늘의 주식시장
    async getDaily ({commit}) {
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

    // /dailyRank
    // 거래대금, 등락률을 가져온다.
    async getDailyRank ({commit}) {
      try {
        commit('updateState', {
          dailyRankLoading: true
        })
        const res = await axios.get('/dailyRank')
        commit('updateState', {
          dailyRankLoading: false,
          dailyRank: res.data
        })
      } catch (e) {
        console.log(e)
      }
    },    
  }
}