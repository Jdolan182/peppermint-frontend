
export const RegisterRoutes = [
  {
    path: '/register',
    name: 'Register',
    meta: {},
    children: [
      {
        path: '',
        name: 'Register',
        component: () => import('../../views/frontend/user/Register.vue'),
      },
    ],
  },
];
