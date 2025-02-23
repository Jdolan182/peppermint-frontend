import { BookOpenIcon } from '@heroicons/vue/24/outline'

export const ContentManagementRoutes = [
  {
    path: '/' + import.meta.env.VITE_MODULE_ADMIN_NAME + '/content-management/',
    meta: { 
      requiresAuth: true,
      adminLayout: true,
      module: 'admin',
      icon: BookOpenIcon,
      nav: 'Content',
      breadcrumb: true
    },
    children: [
      {
        path: '',
        name: 'Content',
        component: () => import('@/views/admin/contentManagement/Content.vue'),
        meta: {
          breadcrumbs: () => ([
              {title: 'Dashboard', to: {name: 'Dashboard'}},
              {title: 'Content Management', to: {name: 'Content Management'}, current: true}
          ])
        }
      },
      {
        path: ':id',
        name: 'Page Details',
        component: () => import('@/views/admin/contentManagement/PageDetails.vue'),
        meta: {
          breadcrumbs: () => ([
              {title: 'Dashboard', to: {name: 'Dashboard'}},
              {title: 'Content Management', to: {name: 'Content'}},
              {title: 'Page Details', current: true}
          ])
        }
      }
    ],
  },
];
