import axios from 'axios'
import moment from 'moment'

const DAYENUM = Object.freeze({"하루": 1, "일주일": 2, "한달": 3, "분기": 4})
const STOCK = Object({"단일종목": 1, "전체종목": 2})
const HEADER = {
  headers: {
    'Content-Type': 'text/plain;charset=utf-8'
  }
}

export default {
  namespaced: true,
  state: () => ({
    title: '',
    rangeSelected: "하루",
    stockSelected: "단일종목",
    loading: false,
    loaded: false,
    contents: [],
    stock: {
      Code: null,
      Name: null,
      Dept: null,
      Close: null,
      ChangeCode: null,
      Changes: null,
      ChangesRatio: null,
      Open: null,
      High: null,
      Low: null,
      Volume: null,
      Amount: null,
      Marcap: null,
      Stocks: null,
      MarketId: null,
      Rank: null
    }
  }),
  getters: {},
  mutations: {
    updateState (state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    updateStock (state, payload) {
      state.stock = payload
    },
    initStock (state) {
      state.stock = null
    }
  },
  actions: {
    async searchContents ({ state, commit }) {
      
      const selectedDay = DAYENUM[state.rangeSelected]
      const selectedStock = STOCK[state.stockSelected]
      let res = null

      let start = ''
      let end = getDate(7) // YYYY-MM-DD

      if (!state.title && selectedStock === 1)
        return
              
      switch (selectedDay) {
        case 1: // 하루
          break
        case 2: // 일주일ㄴ
          start = getDate(14)
          break
        case 3: // 달ㄴ
          start = getDate(37)
          break
        case 4: // 분기
          start = getDate(97)
          break
      }
      try {
        commit('updateState', {
          loading: true
        })
  
        if (selectedDay === 1) {
          console.log('request : ' + `/${state.title}/${end}`)
          res = await axios.get(`/${state.title}/${end}`, HEADER)
        }
        else {
          console.log('request : ' + `/${state.title}/${start}/${end}`)
          res = await axios.get(`/${state.title}/${start}/${end}`, HEADER)
        }
        commit('updateStock', JSON.parse(res.data))
        commit('updateState', {
          loading: false,
          loaded: true
        })
      } catch(e) {
        console.log(e)
      } 
    }
  }
}

function getDate (day) {
  const i = -day
  const today = moment()
  return today.add(i, 'day').format('YYYY-MM-DD')
}
 