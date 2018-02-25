// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/app'
import router from '@/router'
import store from '@/store'
import axios from 'axios'
import Vuetify from 'vuetify'
import 'babel-polyfill'

import 'vuetify/dist/vuetify.min.css'
import 'npm/mdi/scss/materialdesignicons.scss'

import '@/assets/main.styl'

Vue.use(Vuetify)
Vue.use(store)
Vue.config.productionTip = false

let http = axios.create({
  baseURL: process.env.API_SERVER_URL
})

http.interceptors.request.use(config => {
  if (store.getters.getToken !== null) {
    config.headers = { Authorization: `Bearer ${store.getters.getToken}` }
  }

  return config
})

Vue.http = Vue.axios = http

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
