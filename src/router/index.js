import { createRouter, createWebHistory } from 'vue-router';

import VoteList from '../views/VoteList.vue';
import VotePage from '../views/VotePage.vue';
import AdminVote from '../views/AdminVote.vue';

import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

const routes = [
   {
    path: '/',
    redirect: '/vote'
  },
  { path: '/login', component: Login },
  { path: '/register', component: Register },

  {
    path: '/vote',
    component: VoteList,
    meta: { requiresAuth: true }
  },
  {
    path: '/vote/:id',
    component: VotePage,
    meta: { requiresAuth: true }
  },

  {
    path: '/admin',
    component: AdminVote,
    meta: { requiresAuth: true, requiresAdmin: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'));

  const isLoggedIn = !!user;

  const isPublic = to.path === '/login' || to.path === '/register';

  if (!isLoggedIn && !isPublic) {
    return next('/login');
  }

  if (to.meta.requiresAdmin) {
    if (user?.role !== 'admin') {
      return next('/vote');
    }
  }

  next();
});

export default router;