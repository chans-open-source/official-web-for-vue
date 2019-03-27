import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Api from './api'
import Iview from './iview'
import Initiator from './utils/Initiator'

Vue.config.productionTip = false
Vue.use(Api)
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
