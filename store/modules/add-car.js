export default {
  state: { sourceForm: null, selectBrand: null, selectSeries: null, selectCar: null },
  getters: {},
  mutations: {
    storeUpdateSourceForm(state, newSourceForm) {
      // 增量更新
      if (newSourceForm) {
        state.sourceForm = {
          ...state.sourceForm,
          ...newSourceForm
        }
      } else {
        state.sourceForm = null
      }
    },
    storeUpdateSelectBrand(state, newSelectBrand) {
      // 增量更新
      if (newSelectBrand) {
        state.selectBrand = {
          ...state.selectBrand,
          ...newSelectBrand
        }
      } else {
        state.selectBrand = null
      }
    },
    storeUpdateSelectSeries(state, newSelectSeries) {
      // 增量更新
      if (newSelectSeries) {
        state.selectSeries = {
          ...state.selectSeries,
          ...newSelectSeries
        }
      } else {
        state.selectSeries = null
      }
    },
    storeUpdateSelectCar(state, newSelectCar) {
      // 增量更新
      if (newSelectCar) {
        state.selectCar = {
          ...state.selectCar,
          ...newSelectCar
        }
      } else {
        state.selectCar = null
      }
    }
  },
  actions: {}
}
