import * as _ from 'lodash'
import axios from 'axios'
export default {
  namespaced: true,
  state: () => ({
    interestList: [],
    title: '',
  }),
  getters: {
    getInterestList: state => {
      return state.interestList
    }
  },
  mutations: {
    updateState (state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    updateInterestList (state, payload) {
       state.interestList = _.cloneDeep(payload)
    }
  },
  actions: {
    // 관심종목 리스트 정보를 가져온다.
    async initInterestList ({commit}, payload) {
      try {
        const res = await axios.get('/interestList', {
          memberId: payload
        })
        commit('updateInterestList', res.data)        
      } catch (e) {
        console.log(e)
      }
    },

    // 관심종목 리스트를 추가한다.
    async addInterestList2 ({commit}, payload) {
      try {
        const res = await axios.post('/interestList', {
          memberId: payload.memberId,
          item: payload.interestTitle
        })
        commit('updateInterestList', res.data)
      } catch (e) {
        console.log(e)
      }
    },

    // 관심종목 리스트의 이름을 변경한다.
    async editInterestList ({commit}, payload) {
      try {
        const res = await axios.patch(`/interestList/${payload.interestListId}`, {
          title: payload.newTitle
        })
        commit('updateInterestList', res.data)
      } catch (e) {
        console.log(e)
      }
    },

    // 관심종목 리스트에 관심종목을 추가한다.
    async addInterestListItem({commit}, payload) {
      try {
        const res = await axios.post('/interestItem', {
          memberId: payload.memberId,
          interestId: payload.interestId,
          item: payload.symbol
        })
        commit('updateInterestList', res.data)
      } catch (e) {
        console.log(e)
      }
    },

    
    // 프론트에서 샘플로써 자체적으로 처리하는 actions들
    // 나중에 삭제 예정

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
