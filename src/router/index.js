import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('@/pages/public/landing')
    },
    {
      path: '/hello',
      name: 'hello',
      component: () => import('@/components/hello-world')
    }
  ]
})
