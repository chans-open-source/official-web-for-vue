import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Iview from './iview'
import Initiator from './utils/Initiator'
import VueApis from 'vue-apis'
import Api from './api'

Vue.config.productionTip = false
Vue.use(VueApis, {
  apis: Api,
  showLoading: () => {
    window.globalApp['showLoading']()
  },
  hideLoading: () => {
    window.globalApp['hideLoading']()
  }
})
Vue.use(Iview)

new Vue({
  router,
  store,
  render: h => h(App),
  components: {},
  beforeCreate () {
    Initiator.registerApp(this)
  }
}).$mount('#app')
