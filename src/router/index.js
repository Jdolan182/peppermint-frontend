import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../store/auth';

//admin
import { DashboardRoutes } from "./admin/dashboard.js";
import { PeppermintRoutes } from "./admin/peppermint.js";
import { TestRoutes } from "./admin/test.js";

//frontend
import { HomeRoutes } from "./frontend/home.js";
import { RegisterRoutes } from "./frontend/register.js";

import { createBreadcrumbs, createNavigation } from "@/composables/navigation";
import { useBreadcrumbStore } from "@/store/breadcrumbs";
import { useNavigationStore } from "@/store/navigation";

  //admin
  let adminRoutes = []

  if(import.meta.env.VITE_MODULE_ADMIN  === 'true'){
    adminRoutes = [
      ...DashboardRoutes,
      ...PeppermintRoutes,
      ...TestRoutes,
    ]
  }

  //frontend
  let frontendRoutes = []

  if(import.meta.env.VITE_MODULE_FRONTEND === 'true'){
    frontendRoutes = [
      ...HomeRoutes,
      ...RegisterRoutes
    ]
  }

  const routes = adminRoutes.concat(frontendRoutes);

  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
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

  router.afterEach((to, from) => {

    const breadcrumbStore = useBreadcrumbStore();
    const navigationStore = useNavigationStore();

    breadcrumbStore.setCrumbs(createBreadcrumbs(to))
    navigationStore.setNav(createNavigation(to, routes))
  })

  export default router
