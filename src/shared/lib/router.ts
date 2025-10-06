import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home-map',
    component: () => import('@/pages/home-map.vue'),
    meta: {
      layout: 'default',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/not-found.vue'),
    meta: {
      layout: 'empty',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
