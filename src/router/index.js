import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../store/auth';

//admin
import { DashboardRoutes } from "./admin/dashboard.js";
import { PeppermintRoutes } from "./admin/peppermint.js";
import { TestRoutes } from "./admin/test.js";

//frontend
import { HomeRoutes } from "./frontend/home.js";
import { RegisterRoutes } from "./frontend/register.js";


let routes = [
  //admin
  ...DashboardRoutes,
  ...PeppermintRoutes,
  ...TestRoutes,

  //frontend
  ...HomeRoutes,
  ...RegisterRoutes
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
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
