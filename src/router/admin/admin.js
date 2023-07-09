import { Cog6ToothIcon } from '@heroicons/vue/24/outline'

export const AdminRoutes = [
  {
    path: '/' + import.meta.env.VITE_MODULE_ADMIN_NAME + '/admin',
    meta: { 
      requiresAuth: true,
      adminLayout: true,
      module: 'admin',
      icon: Cog6ToothIcon,
      nav: 'Admin'
    },
    children: [
      {
        path: '',
        name: 'Admin',
        component: () => import('../../views/admin/Admin.vue'),
      },
      {
        path: '/peppermint/test/child',
        name: 'Child',
        component: () => import('../../views/admin/TestChild.vue'),
      },
    ],
  },
];
