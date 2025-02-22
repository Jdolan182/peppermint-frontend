import { ChatBubbleBottomCenterTextIcon } from '@heroicons/vue/24/outline'

export const BlogRoutes = [
  {
    path: '/' + import.meta.env.VITE_MODULE_ADMIN_NAME + '/blog-list/',
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
        name: 'Blogs List',
        component: () => import('@/views/admin/blog/BlogList.vue'),
        meta: {
          breadcrumbs: () => ([
              {title: 'Dashboard', to: {name: 'Dashboard'}},
              {title: 'Blogs', to: {name: 'Blogs List'}, current: true}
          ])
        }
      },
      {
        path: ':slug',
        name: 'Blog Details',
        component: () => import('@/views/admin/blog/BlogDetails.vue'),
        meta: {
          breadcrumbs: () => ([
              {title: 'Dashboard', to: {name: 'Dashboard'}},
              {title: 'Blogs', to: {name: 'Blogs List'}},
              {title: 'Blog Details', current: true}
          ])
        }
      }
    ],
  },
];
