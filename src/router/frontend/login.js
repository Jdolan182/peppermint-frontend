
export const LoginRoutes = [
  {
    path: '/login',
    meta: {
      module: 'frontend',
      frontendLayout: true,
      excludeFromNav: true
    },
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('@/views/frontend/user/Login.vue'),
      },
    ],
  },
];
