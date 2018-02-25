import Vue from 'vue'
import store from '@/store'

/* eslint-disable prefer-promise-reject-errors */
export default {
  login: (email, password) => {
    return new Promise((resolve, reject) => {
      let hash = crypto.SHA256(password)
      let payload = {
        email: email,
        password: hash.toString(crypto.enc.Hex)
      }
      Vue.http.post(`userservice/login`, payload).then((loginResponse) => {
        if (loginResponse && loginResponse.data && loginResponse.data.userType) {
          // We have data
          let token = loginResponse.headers.token
          let user = loginResponse.data
          store.dispatch('setCredentials', {user, token})
          store.dispatch('resetDatatableFilters')
          resolve(loginResponse.data)
        } else {
          reject('no_data')
        }
      }).catch((loginErr) => {
        store.dispatch('clearUser')
        reject(loginErr)
      })
    })
  },

  logout: () => {
    store.dispatch('clearUser')
  },

  me: () => {
    return new Promise((resolve, reject) => {
      Vue.http.get(`userservice/me`).then((meResponse) => {
        store.dispatch('setCredentials', {user: meResponse.data})
        resolve(meResponse.data)
      }).catch((meErr) => {
        store.dispatch('clearUser')
        reject(meErr)
      })
    })
  }
}
