import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/frontend/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/test',
      name: 'for test api calls',
      component: () => import('../views/admin/Test.vue')
    },
    {
      path: '/peppermint',
      name: 'peppermint',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/admin/Peppermint.vue')
    }
  ]
})

export default router
