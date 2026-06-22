import { createRouter, createWebHistory } from 'vue-router';

import VoteList from '../views/VoteList.vue';
import VotePage from '../views/VotePage.vue';
import AdminVote from '../views/AdminVote.vue';

const routes = [
  {
    path: '/',
    component: VoteList
  },
  {
    path: '/vote/:id',
    component: VotePage
  },
  {
    path: '/admin',
    component: AdminVote
  }
];

export default createRouter({
  history: createWebHistory(),
  routes
});