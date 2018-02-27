import Vue from 'vue'

/* eslint-disable prefer-promise-reject-errors */
export default {
  createCategory: (payload) => {
    return new Promise((resolve, reject) => {
      Vue.http.post(`api/category/create`, payload).then((res) => {
        resolve(res.data)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  loadCategoryList: () => {
    return new Promise((resolve, reject) => {
      Vue.http.get(`api/category/all`).then((res) => {
        resolve(res.data.categories)
      }).catch((err) => {
        reject(err)
      })
    })
  }
}
