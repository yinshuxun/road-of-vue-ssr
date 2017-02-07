import Vue from 'vue'
import Router from 'vue-router'
import blog from '../views/blog/index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: [
    {
      path: '/',
      component: blog
    }
  ]
})
