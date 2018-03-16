import Vue from 'vue'
import Router from 'vue-router'
import signIn from '@/components/sign-in'
import signUp from '@/components/sign-up'
import retrieve from '@/components/retrieve'
import home from '@/components/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/signIn',
      name: 'signIn',
      component: signIn
    },
    {
      path: '/',
      name: 'signIn',
      component: signIn
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: signUp
    },
    {
      path: '/retrieve',
      name: 'retrieve',
      component: retrieve
    },
    {
      path: '/home',
      name: 'home',
      component: home
    }
  ]
})
