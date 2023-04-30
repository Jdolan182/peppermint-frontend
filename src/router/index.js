import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/frontend/HomeView.vue';
import { useAuthStore } from '../store/auth';

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
      name: 'Dashboard',
      component: () => import('../views/admin/Test.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/peppermint',
      name: 'Peppermint',
      component: () => import('../views/admin/Peppermint.vue'),
      meta: { skipIfAuth: true }
    }
  ]
})

router.beforeEach((to, from) => {

  const authState = useAuthStore();
  // redirect if not logged in
  if (to.meta.requiresAuth && !authState.getIsLoggedIn) {
    return {
      name: 'Peppermint',
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    }
  }

  if (to.meta.skipIfAuth && authState.getIsLoggedIn) {
    return {
      name: 'Dashboard',
    }
  }
})

export default router
