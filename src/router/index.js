import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '../stores/userStore';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {requiresAuth: true},
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      meta: {requiresAuth: true},
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }
  ]
});

router.beforeEach((to) => {
  const user = useUserStore();

  if (to.meta.requiresAuth && !user.isAuth) return '/login';
})

export default router;
