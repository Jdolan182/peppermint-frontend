import { FolderIcon } from '@heroicons/vue/24/outline'

export const TestRoutes = [
  {
    path: '/' + import.meta.env.VITE_MODULE_ADMIN_NAME + '/test',
    name: 'Test',
    meta: { 
      requiresAuth: true,
      adminSidebar: true,
      module: 'admin',
      icon: FolderIcon,
      nav: 'Test'
    },
    children: [
      {
        path: '',
        name: 'Test',
        component: () => import('../../views/admin/Test.vue'),
      },
      {
        path: '/peppermint/test/child',
        name: 'Child',
        component: () => import('../../views/admin/TestChild.vue'),
      },
    ],
  },
];
