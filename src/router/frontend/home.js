
export const HomeRoutes = [
  {
    path: '/',
    name: 'Home',
    meta: {},
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../../views/frontend/HomeView.vue'),
      },
    ],
  },
];
