
export const HomeRoutes = [
  {
    path: '/',
    meta: {
      module: 'frontend',
      frontendLayout: true,
      nav: 'Home'
    },
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../../views/frontend/HomeView.vue'),
      },
    ],
  },
];
