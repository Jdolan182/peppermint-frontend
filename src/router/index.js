import { createRouter, createWebHistory } from 'vue-router';
import  HomeView  from '../views/frontend/HomeView.vue'
import { useAuthStore } from '../store/auth';
import {
  ChartPieIcon,
  FolderIcon,
  HomeIcon,
} from '@heroicons/vue/24/outline'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/frontend/user/Register.vue'),
    },
    {
      path: '/peppermint',
      name: 'Peppermint',
      component: () => import('../views/admin/Peppermint.vue'),
      meta: { skipIfAuth: true }
    },
    {
      path: '/peppermint/dashboard',
      name: 'Dashboard',
      component: () => import('../views/admin/Dashboard.vue'),
      meta: { 
        requiresAuth: true,
        adminSidebar: true,
        module: 'admin',
        icon: HomeIcon
       }
    },
    {
      path: '/peppermint/test',
      name: 'Test',
      component: () => import('../views/admin/Test.vue'),
      meta: { 
        requiresAuth: true,
        adminSidebar: true,
        module: 'admin',
        icon: FolderIcon,
        parentNav: 'testNav'
      }
    },
    {
      path: '/peppermint/testchild',
      name: 'TestChild',
      component: () => import('../views/admin/TestChild.vue'),
      meta: { 
        requiresAuth: true,
        adminSidebar: true,
        module: 'admin',
        icon: ChartPieIcon,
        parentNav: 'testNav'
      },
    },
   
   
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
