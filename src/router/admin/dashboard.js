import { HomeIcon } from '@heroicons/vue/24/outline'

export const DashboardRoutes = [
  {
    path: '/' + import.meta.env.VITE_MODULE_ADMIN_NAME + '/dashboard',
    meta: { 
      requiresAuth: true,
      module: 'admin',
      adminSidebar: true,
      icon: HomeIcon,
      nav: 'Dashboard'
    },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('../../views/admin/Dashboard.vue'),
      },
    ],
  },
];
