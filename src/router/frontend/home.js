
export const HomeRoutes = [
  {
    path: '/',
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../../views/frontend/HomeView.vue'),
      },
    ],
  },
];
