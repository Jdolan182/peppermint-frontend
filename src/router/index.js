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
      component: () => import('../views/admin/Peppermint.vue')
    }
  ]
})

export default router
