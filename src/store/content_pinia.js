import axios from 'axios'
import { defineStore } from 'pinia'
import { useChartStore } from './chart_pinia'

const DAYENUM = Object.freeze({"1일": 1, "5일": 5, "10일": 10, "30일": 30})
// const STOCK = Object({"단일종목": 1, "전체종목": 2})
const HEADER = {
  headers: {
    'Content-Type': 'text/plain;charset=utf-8'
  }
}

export const useContentStore = defineStore("content_pinia", {
  state: () => ({
    title: '', //
    rangeSelected: "30일", //          
    stockSelected: "단일종목", //        
    loading: false, //
    loaded: false, //
    contents: [], //
    stock: {}, //
    singleStock: {}, //
    volumeRank: {}, //
    nameMappingCode: {}, //
    kospi: {} // 
  }),
  getters: {

  },
  actions: {
    // 컨텐츠 검색
    async searchContents (payload) {
      const chartStore = useChartStore()
      try {
        const selectedDay = DAYENUM[this.rangeSelected]

        this.loading = true
        const root = parseInt(payload) ? 'findByCode' : 'findByName'
        const url = `/${root}/${payload}/${selectedDay}`   
        const res = await axios.get(url, HEADER)

        // commit vuex
        this.stock = res.data
        this.loading = false
        this.loaded = true
        this.title = ''

        console.log('stock:' ,this.stock)
        // dispatch vuex
        chartStore.createChartData({
          type: 'candle',
          data: res.data
        })
        chartStore.createChartData({
          type: 'line',
          data: res.data
        })
        
      } catch (error) {
        console.log(error)
        return error
      }
    },
    async initContents () {
      // const chartStore = useChartStore()
      try {
        const url = '/today'
        const res = await axios.get(url, HEADER)
        const nameMappingCodeTemp = {}
        const volumeRankTemp = []
        // const res_kos = await axios.get('/today/KOSPI', HEADER)

        res.data.data.map( stock => {
          nameMappingCodeTemp[`${stock[1]}`] = stock[0]
        })

        res.data.data.slice(0,9).map( stock => {
          volumeRankTemp.push({
            name: stock[1],
            code: stock[0]
          })
        })
        
        // commit vuex
        this.volumeRank = volumeRankTemp
        this.nameMappingCode = nameMappingCodeTemp
        // this.kospi = res_kos.data

        // dispatch vuex
        // chartStore.createChartData({
        //   type: 'candle',
        //   data: res_kos.data
        // })
      } catch (error) {
        console.log(error)
        return error
      }
    }
  }
})

 