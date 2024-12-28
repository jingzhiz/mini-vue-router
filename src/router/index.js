import Vue from 'vue';
import VueRouter from '../vue-router';

import homeVue from '../views/home/index.vue';
import aboutVue from '../views/about/index.vue';
import missionVue from '../views/about/mission/index.vue';
import visionVue from '../views/about/vision/index.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: homeVue
  },
  {
    path: '/about',
    name: 'about',
    component: aboutVue,
    redirect: '/about/mission',
    children: [
      {
        path: 'mission',
        name: 'mission',
        component: missionVue
      },
      {
        path: 'vision',
        name: 'vision',
        component: visionVue
      }
    ]
  }
];

export const router = new VueRouter({
  mode: 'hash',
  routes
});

router.beforeEach((to, from, next) => {
  console.log('beforeEach', to, from);
  setTimeout(() => {
    next();
  }, 1000);
});