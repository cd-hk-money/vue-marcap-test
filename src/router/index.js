import Vue from 'vue'
import Router from 'vue-router'
import Randing from '@/components/Randing'
import Details from '@/components/Details'

Vue.use(Router)

export default new Router({
  route: [
    {
      path: '/',
      component: Randing
    },
    {
      path: '/details',
      component: Details
    }
  ]
})

