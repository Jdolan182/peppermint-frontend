
export const ProfileRoutes = [
    {
      path: '/profile',
      meta: {
        module: 'frontend',
        frontendLayout: true,
        excludeFromNav: true
      },
      children: [
        {
        path: ':id',
        name: 'Profile',
        component: () => import('@/views/frontend/user/Profile.vue'),
        }
      ],
    },
  ];
  