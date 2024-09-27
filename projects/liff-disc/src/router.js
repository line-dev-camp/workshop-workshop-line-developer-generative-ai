import { createRouter, createWebHistory } from 'vue-router';
import DISC from './components/DISC.vue';

const routes = [
  {
    path: '/Disc',
    name: 'DISC',
    component: DISC,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
