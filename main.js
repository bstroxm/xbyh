import Vue from 'vue'
import uView from 'uview-ui'
import App from './App'
import store from './store'
import uc from './services/user-center'

Vue.use(uView)
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$uc = uc

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()
