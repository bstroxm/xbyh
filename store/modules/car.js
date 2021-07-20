export default {
  state: { userInfo: null },
  getters: {},
  mutations: {
    storeUpdateUserInfo(state, newUserInfo) {
      // 增量更新
      if (newUserInfo) {
        state.userInfo = {
          ...(state.userInfo || null),
          ...newUserInfo
        }
      } else {
        state.userInfo = null
      }
    }
  },
  actions: {}
}
