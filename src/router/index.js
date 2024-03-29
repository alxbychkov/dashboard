import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router';
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
      meta: {requiresAuth: true, canSee: "admin"},
      component: () => import('../views/github/GithubView.vue')
    },
    {
      path: '/habr',
      name: 'habr',
      meta: {requiresAuth: true, canSee: "admin"},
      component: () => import('../views/habr/HabrView.vue')
    },
    {
      path: '/habr/manager',
      name: 'habrManages',
      meta: {requiresAuth: true, parent: 'habr', canSee: "admin"},
      component: () => import('../views/habr/HabrManagerView.vue')
    },
    {
      path: '/habr/query',
      name: 'habrQueries',
      meta: {requiresAuth: true, parent: 'habr', canSee: "admin"},
      component: () => import('../views/habr/HabrQueriesView.vue')
    },
    {
      path: '/habr/candidates',
      name: 'habrCandidates',
      meta: {requiresAuth: true, parent: 'habr', canSee: "admin"},
      component: () => import('../views/habr/HabrCandidateView.vue')
    },
    {
      path: '/curve',
      name: 'curve',
      meta: {requiresAuth: true},
      component: () => import('../views/curve/CurveView.vue')
    },
    {
      path: '/jobs',
      name: 'jobs',
      meta: {requiresAuth: true},
      component: () => import('../views/jobs/JobsView.vue')
    },
    {
      path: '/jobs/vacancies',
      name: 'jobsVacancies',
      meta: {requiresAuth: true, parent: 'jobs'},
      component: () => import('../views/jobs/JobsVacanciesView.vue')
    },
    {
      path: '/jobs/companies',
      name: 'jobsCompanies',
      meta: {requiresAuth: true, parent: 'jobs'},
      component: () => import('../views/jobs/JobsCompaniesView.vue')
    },
    {
      path: '/jobs/questions',
      name: 'jobsQuestions',
      meta: {requiresAuth: true, parent: 'jobs'},
      component: () => import('../views/jobs/JobsQuestionsView.vue')
    },
    {
      path: '/jobs/recepients',
      name: 'jobsRecepients',
      meta: {requiresAuth: true, parent: 'jobs'},
      component: () => import('../views/jobs/JobsRecepientsView.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: {requiresAuth: false},
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/404View.vue')
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  const user = useUserStore();
  
  if (localStorage.getItem('auth') && !user.isAuth) {
    await user.auth();
  } else {
    user.isLoading = false;
  }

  if (to.meta.requiresAuth && !user.isAuth) {
    next('/login');
  } else if (to.name === 'login' && user.isAuth) {
    next('/');
  } else if (to.meta.canSee && to.meta.canSee !== user.user.name) {
    next('/');
  } else {
    next();
  }
})

export default router;
