
export const RegisterRoutes = [
  {
    path: '/register',
    meta: {
      module: 'frontend',
      frontendLayout: true,
      excludeFromNav: true
    },
    children: [
      {
        path: '',
        name: 'Register',
        component: () => import('@/views/frontend/user/Register.vue'),
      },
    ],
  },
];
