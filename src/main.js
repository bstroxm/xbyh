import Vue from 'vue'
import uView from 'uview-ui'
import App from './App'
import store from './store'
import uc from './services/user-center'
import db from './services/db'

Vue.use(uView)
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$uc = uc
Vue.prototype.$db = db

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()
