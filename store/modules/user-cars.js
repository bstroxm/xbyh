export default {
  state: { currentUserCarId: '', userCars: [] },
  getters: {},
  mutations: {
    storeUpdateCurrentUserCarId(state, newUserCarId) {
      // 增量更新
      if (newUserCarId) {
        state.currentUserCarId = newUserCarId
      }
    },
    storeUpdateUserCars(state, newUserCars) {
      // 增量更新
      if (newUserCars) {
        state.userCars = newUserCars
      }
    }
  },
  actions: {
    async getUserCars({ commit }) {
      const userCars = await this._vm.$db.getUserCars()
      commit('storeUpdateUserCars', userCars)
    }
  }
}
