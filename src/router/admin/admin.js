import { Cog6ToothIcon } from '@heroicons/vue/24/outline'

export const AdminRoutes = [
  {
    path: '/' + import.meta.env.VITE_MODULE_ADMIN_NAME + '/admin',
    meta: { 
      requiresAuth: true,
      adminLayout: true,
      module: 'admin',
      icon: Cog6ToothIcon,
      nav: 'Admin',
      breadcrumb: false
    },
    children: [
      {
        path: '',
        name: 'Admin',
        component: () => import('@/views/admin/Admin/Admin.vue'),
        meta: {
          breadcrumbs: (route) => ([
              {title: 'Dashboard', to: {name: 'Dashboard'}},
              {title: 'Admin Settings', current: true},
          ])
        }
      },
      {
        path: 'child',
        name: 'Child',
        component: () => import('@/views/admin/TestChild.vue'),
      },
    ],
  },
];
