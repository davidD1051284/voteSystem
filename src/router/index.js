import { createRouter, createWebHistory } from 'vue-router';

import VoteList from '../views/VoteList.vue';
import VotePage from '../views/VotePage.vue';
import AdminVote from '../views/AdminVote.vue';

import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

const routes = [
   {
    path: '/',
    redirect: '/login'
  },
  { path: '/login', component: Login },
  { path: '/register', component: Register },

  { path: '/vote', component: VoteList },
  { path: '/vote/:id', component: VotePage },

  { path: '/admin', component: AdminVote }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'));

  const publicPages = ['/login', '/register'];

  if (!publicPages.includes(to.path) && !user) {
    return next('/login');
  }

  next();
});

export default router;