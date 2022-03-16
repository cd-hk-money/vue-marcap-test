export default {
  namespaced: true,
  state: () => ({
    amountTop: {},
    changeRatioTop: {}
  }),
  getters: {

  },
  mutations: {
    updateState (state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    initState (state) {
      state.amountTop = {}
      state.changeRatioTop = {}
    },
  },
  actions: {
    async getLandingPage ({commit}) {
      try {
        commit('')
      } catch (e) {
        console.log(e)
      }
    }
  }
}