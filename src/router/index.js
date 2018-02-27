import Vue from 'vue'
import Router from 'vue-router'
import { UserService } from '@/api'

Vue.use(Router)
/* eslint-disable handle-callback-err */
let requiresAuth = (to, from, next) => {
  UserService.me().then((res) => {
    console.log(`[debug] authentication successfull`)
  }).catch((err) => {
    console.log(`[debug] authentication successfull`)
  })
  next()
}

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
    },
    {
      path: '/web',
      name: 'web-container',
      component: () => import('@/pages/container/web-container'),
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('@/pages/web/dashboard'),
          beforeEnter: requiresAuth
        }
      ]
    }
  ]
})
