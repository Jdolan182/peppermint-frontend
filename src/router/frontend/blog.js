
export const BlogFrontendRoutes = [
  {
    path: '/blogs',
    meta: { 
      module: 'frontend',
      frontendLayout: true,
      nav: 'Blogs'
    },
    children: [
      {
        path: '',
        name: 'Blogs',
        component: () => import('@/views/frontend/blog/Blogs.vue'),
      },
      {
        path: ':slug',
        name: 'Blog View',
        component: () => import('@/views/frontend/blog/BlogView.vue'),
      }
    ],
  },
];
