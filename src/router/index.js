import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Details from '@/components/Details'

Vue.use(Router)

export default new Router({
  route: [
    {
      path: '/home',
      component: Home
    },
    {
      path: '/details',
      component: Details
    }
  ]
})