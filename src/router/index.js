import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/store/admin/auth';
import { useConsumerAuthStore } from '@/store/frontend/consumerAuth';

//admin
import { DashboardRoutes } from "./admin/dashboard.js";
import { PeppermintRoutes } from "./admin/peppermint.js";
import { ConsumerRoutes } from "./admin/consumer.js";
import { AdminRoutes } from "./admin/admin.js";
import { UserRoutes } from "./admin/user.js";
import { BlogRoutes } from "./admin/blog.js";

//frontend
import { HomeRoutes } from "./frontend/home.js";
import { RegisterRoutes } from "./frontend/register.js";
import { LoginRoutes } from "./frontend/login.js";
import { ProfileRoutes } from "./frontend/profile.js";
import { BlogFrontendRoutes } from "./frontend/blog.js";

import { createNavigation } from "@/composables/navigation";
import { useBreadcrumbStore } from "@/store/breadcrumbs";
import { useNavigationStore } from "@/store/navigation";

  //admin
  let adminRoutesArr = []

  if(import.meta.env.VITE_MODULE_ADMIN  === 'true'){
    adminRoutesArr = [
      ...DashboardRoutes,
      ...PeppermintRoutes,
      ...UserRoutes,
    ]

    if(import.meta.env.VITE_MODULE_CONSUMER_ENABLED  === 'true'){
      adminRoutesArr.push(...ConsumerRoutes);
    }

    if(import.meta.env.VITE_MODULE_BLOG_ENABLED  === 'true'){
      adminRoutesArr.push(...BlogRoutes);
    }

    //To put admin at the bottom of the sidebar. Works for now.
    //TODO add way to order list or something?
    adminRoutesArr.push(...AdminRoutes);
  }

  //frontend
  let frontendRoutesArr = []

  if(import.meta.env.VITE_MODULE_FRONTEND === 'true'){
   
    frontendRoutesArr = [
      ...HomeRoutes,
    ]

    if(import.meta.env.VITE_MODULE_CONSUMER_ENABLED  === 'true'){
      frontendRoutesArr.push( 
        ...RegisterRoutes,
        ...LoginRoutes,
        ...ProfileRoutes,
      );
    }

    if(import.meta.env.VITE_MODULE_BLOG_ENABLED  === 'true'){
      frontendRoutesArr.push(...BlogFrontendRoutes);
    }
  }


  const routes = adminRoutesArr.concat(frontendRoutesArr);

  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
  })

  router.beforeEach((to, from) => {

    const authState = useAuthStore();
    const consumerAuthState = useConsumerAuthStore();
    
    // redirect if not logged in
    if(to.meta.module == 'admin') {
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
    }
    else if(to.meta.module == 'frontend'){
      if (to.meta.requiresAuth && !consumerAuthState.getIsLoggedIn) {
        return {
          name: 'Login',
          // save the location we were at to come back later
          query: { redirect: to.fullPath },
        }
      }
    }
  })

  router.afterEach((to, from) => {

    const breadcrumbStore = useBreadcrumbStore();
    const navigationStore = useNavigationStore();

    if(to.meta.breadcrumb){
      breadcrumbStore.setCrumbs(to.meta.breadcrumbs(to))
    }
    else {
      breadcrumbStore.setCrumbs({})
    }
    navigationStore.setNav(createNavigation(to, routes, to.meta.module))

  })

  export default router
