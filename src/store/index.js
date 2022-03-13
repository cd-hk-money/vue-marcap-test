import Vue from 'vue'
import Vuex from 'vuex'
import content from './content'
import interest from './interest'
import chart from './chart'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    
  },
  mutations: {
    updateState (state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    }
  },
  actions: {
  },
  modules: {
    content,
    chart,
    interest

  }
})
