import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    tabbarList: [
      {
        pagePath: '/pages/fuel-consumption/index',
        iconPath: 'drip',
        selectedIconPath: 'drip-fill',
        text: '油耗',
        customIcon: true
      },
      // {
      //   pagePath: '/pages/cost/index',
      //   iconPath: 'rmb-circle',
      //   selectedIconPath: 'rmb-circle-fill',
      //   text: '费用',
      //   customIcon: false
      // },
      {
        pagePath: '/pages/add-remember/index',
        iconPath: '/static/img/add.svg',
        selectedIconPath: '/static/img/add.svg',
        text: '记一笔',
        midButton: true,
        customIcon: true
      },
      // {
      //   pagePath: '/pages/bai-space/index',
      //   iconPath: 'space',
      //   selectedIconPath: 'space-fill',
      //   text: '空间',
      //   customIcon: true
      // },
      {
        pagePath: '/pages/my/index',
        iconPath: 'account',
        selectedIconPath: 'account-fill',
        text: '我的',
        customIcon: false
      }
    ],
    defaultColor: {
      primary: {
        common: '#2979ff',
        dark: '#2b85e4',
        light: '#ecf5ff',
        disabled: '#a0cfff'
      }
    }
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: { user }
})

export default store
