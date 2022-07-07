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
      path: '/github',
      name: 'github',
      meta: {requiresAuth: true},
      component: () => import('../views/GithubView.vue')
    },
    {
      path: '/habr',
      name: 'habr',
      meta: {requiresAuth: true},
      component: () => import('../views/HabrView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  const user = useUserStore();

  if (localStorage.getItem('auth') && !user.isAuth) {
    await user.auth();
  }

  if (to.meta.requiresAuth && !user.isAuth) {
    next('/login');
  } else {
    next();
  }
})

export default router;
