
export const RegisterRoutes = [
  {
    path: '/register',
    children: [
      {
        path: '',
        name: 'Register',
        component: () => import('../../views/frontend/user/Register.vue'),
      },
    ],
  },
];
