
export const UserRoutes = [
  {
    path: '/' + import.meta.env.VITE_MODULE_ADMIN_NAME + '/admin/users/',
    meta: { 
      requiresAuth: true,
      adminLayout: true,
      module: 'admin',
      breadcrumb: true,
      excludeFromNav: true
    },
    children: [
        {
            path: ':id',
            name: 'User Details',
            component: () => import('@/views/admin/admin/UserDetails.vue'),
            meta: {
            breadcrumbs: (route) => ([
                {title: 'Dashboard', to: {name: 'Dashboard'}},
                {title: 'Admin', to: {name: 'Admin Users'}},
                {title: 'User Details', current: true}
            ])
            }
        },
    ]
  },
];
