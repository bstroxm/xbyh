import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    tabbarList: [
      {
        pagePath: '/pages/application/fuel-consumption/index',
        iconPath: 'oil',
        selectedIconPath: 'oil-fill',
        text: '油耗',
        customIcon: true
      },
      // {
      //   pagePath: '/pages/application/cost/index',
      //   iconPath: 'rmb-circle',
      //   selectedIconPath: 'rmb-circle-fill',
      //   text: '费用',
      //   customIcon: false
      // },
      {
        pagePath: '/pages/data-collect/add-remember/index',
        iconPath: '/static/img/add.svg',
        selectedIconPath: '/static/img/add.svg',
        text: '记一笔',
        midButton: true,
        customIcon: true
      },
      // {
      //   pagePath: '/pages/application/bai-space/index',
      //   iconPath: '',
      //   selectedIconPath: '',
      //   text: '空间',
      //   customIcon: true
      // },
      {
        pagePath: '/pages/account/my/index',
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
