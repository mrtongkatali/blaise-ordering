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
      path: '/login',
      name: 'login',
      component: () => import('@/pages/public/login')
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import('@/pages/public/registration')
    }
  ]
})
