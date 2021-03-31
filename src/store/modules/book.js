const book = {
  state: {
    test: 1,
    test1: 222
  },
  mutations: {
    SET_TEST: (state, newTest) => {
      state.test = newTest
    }
  },
  actions: {
    setTest: ({ commit, state }, newTest) => {
      commit('SET_TEST', newTest)
    }
  },
  modules: {
  }
}

export default book