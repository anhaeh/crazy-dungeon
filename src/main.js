import Vue from "vue"
import App from "./App.vue"
import store from "./store"
import './registerServiceWorker'
import router from './router'
import axios from 'axios'

/** user dungeon */
axios.defaults.headers.common['Authorization'] = 'Token 43d2e7f540939ac5e34eeee07b7fb96e74344002'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
