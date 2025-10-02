import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home-map',
      component: () => import('@/pages/home-map.vue'),
      meta: {
        layout: 'default',
      },
    },
  ],
})

export default router
