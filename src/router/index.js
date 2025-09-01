import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignupView.vue'),
    },
    {
      path: '/todolist',
      name: 'todolist',
      component: () => import('../views/TodolistView.vue'),
    },
    {
      path: '/:pathMatch(.*)*', 
      name: 'NotFound', 
      component: () => import('../views/NotfoundView.vue'),
    },
  ],
})

export default router
