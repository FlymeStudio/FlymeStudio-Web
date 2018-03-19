import Vue from 'vue'
import Router from 'vue-router'
import signIn from '@/components/sign-in'
import signUp from '@/components/sign-up'
import retrieve from '@/components/retrieve'
import home from '@/components/home'
import informationOverview from '@/components/information-overview'
import informationTeamwork from '@/components/information-teamwork'
import informationModify from '@/components/information-modify'
import projectOverview from '@/components/project-overview'
import projectCreate from '@/components/project-create'
import projectSearch from '@/components/project-search'
import summaryOverview from '@/components/summary-overview'
import summaryCreate from '@/components/summary-create'
import summarySearch from '@/components/summary-search'

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
      name: 'signin',
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
    },
    {
      path: '/information/overview',
      name: 'informationOverview',
      component: informationOverview
    },
    {
      path: '/information/teamwork',
      name: 'informationTeamwork',
      component: informationTeamwork
    },
    {
      path: '/information/modify',
      name: 'informationModify',
      component: informationModify
    },
    {
      path: '/project/overview',
      name: 'projectOverview',
      component: projectOverview
    },
    {
      path: '/project/create',
      name: 'projectCreate',
      component: projectCreate
    },
    {
      path: '/project/search',
      name: 'projectSearch',
      component: projectSearch
    },
    {
      path: '/summary/overview',
      name: 'summaryOverview',
      component: summaryOverview
    },
    {
      path: '/summary/create',
      name: 'summaryCreate',
      component: summaryCreate
    },
    {
      path: '/summary/search',
      name: 'summarySearch',
      component: summarySearch
    }
  ]
})
