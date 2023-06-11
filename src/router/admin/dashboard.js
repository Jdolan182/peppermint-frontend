import { HomeIcon } from '@heroicons/vue/24/outline'

export const DashboardRoutes = [
  {
    path: '/peppermint/dashboard',
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Dashbord',
        component: () => import('../../views/admin/Dashboard.vue'),
        meta: { 
            requiresAuth: true,
            adminSidebar: true,
            module: 'admin',
            icon: HomeIcon
        }
      },
    ],
  },
];
