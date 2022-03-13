import * as _ from 'lodash'

export default {
  namespaced: true,
  state: () => ({
    interestList: [],
    title: '',
  }),
  getters: {

  },
  mutations: {
    updateState (state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    // updateInterestList (state, payload) {
    //   state.
    // }
  },
  actions: {
    initState () {
      
    },

    // 관심종목 리스트 생성
    addInterestList ({commit, state}, payload) {
      const tempInterestList = _.cloneDeep(state.interestList)
      tempInterestList.push({
        title: payload,
        items: []
      })
      commit('updateState', {
        interestList: tempInterestList,
        title: ''
      })
    },

    // 관심종목 리스트에 관심종목 추가
    addInterest ({commit, state}, payload) {
      const tempInterestList = _.cloneDeep(state.interestList)
      let listIndex = 0
      tempInterestList.find((interestList, index) => {
        if(interestList.title === payload.interestList) {
          listIndex = index
        }
      })
      tempInterestList[listIndex].items.push({
        title: payload.title
      })
      commit('updateState', {
        interestList: tempInterestList
      })
    },
    removeIntreset ({commit, state}, payload) {
      const tempInterestList = _.cloneDeep(state.interestList)
      let listIndex = 0
      tempInterestList.find((interestList, index) => {
        if(interestList.title === payload.title) {
          listIndex = index
        }
      })
      tempInterestList.splice(listIndex, 1)
      commit('updateState', {
        interestList: tempInterestList
      })
    }
  } 
}
