import { FolderIcon } from '@heroicons/vue/24/outline'

export const TestRoutes = [
  {
    path: '/peppermint/test',
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Test',
        component: () => import('../../views/admin/Test.vue'),
        meta: { 
            requiresAuth: true,
            adminSidebar: true,
            module: 'admin',
            icon: FolderIcon,
        }
      },
      {
        path: '/peppermint/testChild',
        name: 'TestChild',
        component: () => import('../../views/admin/TestChild.vue'),
        meta: { 
            requiresAuth: true,
            adminSidebar: true,
            module: 'admin',
            icon: FolderIcon,
        }
      },
    ],
  },
];
