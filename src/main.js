import Vue from 'vue'
import App from './App.vue'
import vuetify from './vuetify'
import store from './store'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
Vue.config.productionTip = false

console.log("Vue.$cookies", Vue.$cookies)
// set default config
Vue.$cookies.config('7d')
new Vue({
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
