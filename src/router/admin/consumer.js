import { UserCircleIcon } from '@heroicons/vue/24/outline'

export const ConsumerRoutes = [
  {
    path: '/' + import.meta.env.VITE_MODULE_ADMIN_NAME + '/consumers',
    meta: { 
      requiresAuth: true,
      adminLayout: true,
      module: 'admin',
      icon: UserCircleIcon,
      nav: 'Consumers'
    },
    children: [
      {
        path: '',
        name: 'Consumers',
        component: () => import('../../views/admin/Consumer.vue'),
      },
      {
        path: '/peppermint/test/child',
        name: 'Child',
        component: () => import('../../views/admin/TestChild.vue'),
      },
    ],
  },
];
