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
      breadcrumb: true
    },
    children: [
      {
        path: '',
        name: 'Admin',
        component: () => import('@/views/admin/admin/Admin.vue'),
        meta: {
          breadcrumbs: (route) => ([
              {title: 'Dashboard', to: {name: 'Dashboard'}},
              {title: 'Admin', current: true},
          ])
        },
        children: [
          {
            path: 'users',
            name: 'Admin Users',
            component: () => import('@/views/admin/admin/Users.vue'),
            meta: {
              headerTitle: 'Admin'
            },
          },
          {
            path: '',
            name: 'Admin Settings',
            component: () => import('@/views/admin/admin/Settings.vue'),
            meta: {
              headerTitle: 'Admin'
            }
          },
        ],
      },
      {
        path: 'child',
        name: 'Child',
        component: () => import('@/views/admin/TestChild.vue'),
      },
    ],
  },
];
