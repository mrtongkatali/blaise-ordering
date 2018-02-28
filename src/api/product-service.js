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

  createSupplier: (payload) => {
    return new Promise((resolve, reject) => {
      Vue.http.post(`api/supplier/create`, payload).then((res) => {
        resolve(res.data)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  updateCategory: (payload) => {
    return new Promise((resolve, reject) => {
      Vue.http.post(`api/category/update`, payload).then((res) => {
        resolve(res.data)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  updateSupplier: (payload) => {
    return new Promise((resolve, reject) => {
      Vue.http.post(`api/supplier/update`, payload).then((res) => {
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
  },

  loadSupplierList: () => {
    return new Promise((resolve, reject) => {
      Vue.http.get(`api/supplier/all`).then((res) => {
        resolve(res.data.suppliers)
      }).catch((err) => {
        reject(err)
      })
    })
  }
}
