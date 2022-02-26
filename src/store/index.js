import Vue from 'vue'
import Vuex from 'vuex'
import content from './content'
// import contents from '/.contents'
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
    // contents,    
    chart

  }
})
