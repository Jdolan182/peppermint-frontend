import { UserCircleIcon } from '@heroicons/vue/24/outline'

export const ConsumerRoutes = [
  {
    path: '/' + import.meta.env.VITE_MODULE_ADMIN_NAME + '/consumers/',
    meta: { 
      requiresAuth: true,
      adminLayout: true,
      module: 'admin',
      icon: UserCircleIcon,
      nav: 'Consumers',
      breadcrumb: true
    },
    children: [
      {
        path: '',
        name: 'Consumers',
        component: () => import('@/views/admin/consumer/Consumer.vue'),
        meta: {
          breadcrumbs: (route) => ([
              {title: 'Dashboard', to: {name: 'Dashboard'}},
              {title: 'Consumers', current: true},
          ])
        }
      },
      {
        path: ':id',
        name: 'Consumer Details',
        component: () => import('@/views/admin/consumer/ConsumerDetails.vue'),
        meta: {
          breadcrumbs: (route) => ([
              {title: 'Dashboard', to: {name: 'Dashboard'}},
              {title: 'Consumers', to: {name: 'Consumers'}},
              {title: 'Consumer Details', current: true}
          ])
        }
      }
    ],
  },
];
