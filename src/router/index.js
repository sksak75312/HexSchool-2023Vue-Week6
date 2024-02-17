import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/ClientView.vue'),
      children: [
        {
          path: '',
          component: () => import('@/views/client/HomeView.vue'),
        },
        {
          path: 'products',
          component: () => import('@/views/client/ProductsView.vue'),
        },
        {
          path: 'product/:id',
          component: () => import('@/views/client/SingleProductView.vue'),
        },
        {
          path: 'cart',
          component: () => import('@/views/client/CartView.vue'),
        },
      ],
    },
    {
      path: '/login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/admin',
      component: () => import('@/views/AdminView.vue'),
      children: [
        {
          path: 'products',
          component: () => import('@/views/admin/ProductsView.vue'),
        },
      ],
    },
  ],
});

export default router;
