import { ChatBubbleBottomCenterTextIcon } from '@heroicons/vue/24/outline'

export const BlogRoutes = [
  {
    path: '/' + import.meta.env.VITE_MODULE_ADMIN_NAME + '/blogs/',
    meta: { 
      requiresAuth: true,
      adminLayout: true,
      module: 'admin',
      icon: ChatBubbleBottomCenterTextIcon,
      nav: 'Blogs',
      breadcrumb: true
    },
    children: [
      {
        path: '',
        name: 'Blogs',
        component: () => import('@/views/admin/blog/Blog.vue'),
        meta: {
          breadcrumbs: (route) => ([
              {title: 'Dashboard', to: {name: 'Dashboard'}},
              {title: 'Consumers', current: true},
          ])
        }
      },
      {
        path: ':id',
        name: 'Blog Details',
        component: () => import('@/views/admin/blog/BlogDetails.vue'),
        meta: {
          breadcrumbs: (route) => ([
              {title: 'Dashboard', to: {name: 'Dashboard'}},
              {title: 'Blogs', to: {name: 'Blogs'}},
              {title: 'Blog Details', current: true}
          ])
        }
      }
    ],
  },
];
