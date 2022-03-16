import Vue from 'vue'
import Vuex from 'vuex'
import content from './content'
import interest from './interest'
import chart from './chart'
import details from './details'
import landing from './landing'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    
  },
  getters: {

  },
  mutations: {

  },
  actions: {
  },
  modules: {
    content,
    chart,
    interest,
    details,
    landing
  }
})
