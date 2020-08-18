import Vue from "vue"
import App from "./App.vue"
import store from "./store"
import './registerServiceWorker'
import router from './router'
import axios from 'axios'

/** token from user dungeon */
axios.defaults.headers.common['Authorization'] = 'Token 377ea964f12e598d637566e9033fb4a64e62b791'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
