
export const PeppermintRoutes = [
    {
        path: '/peppermint',
        name: 'Peppermint',
        component: () => import('../../views/admin/Peppermint.vue'),
        meta: { skipIfAuth: true }
    }   
];