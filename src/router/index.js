import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../pages/Home.vue';
import toysApp from '@/pages/toys-app.vue';
import toyDetails from '@/pages/toy-details.vue';
import toyEdit from '@/pages/toy-edit.vue';
import toyChart from '@/pages/toy-chart.vue';
import login from '@/pages/login.vue';
import store from '../store/index';
import userDetails from '@/pages/user-details.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/chart',
    name: 'chart',
    component: toyChart,
  },
  {
    path: '/login',
    name: 'login',
    component: login,
  },
  {
    path: '/user-details',
    name: 'user-details',
    component: userDetails,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../pages/About.vue'),
  },
  {
    path: '/toys',
    name: 'toys',
    component: toysApp,
  },
  {
    path: '/toy/edit/:toyId?',
    component: toyEdit,
  },
  {
    path: '/toy/details/:toyId',
    component: toyDetails,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  let loggedInUser = store.state.loggedInUser;
  if (!loggedInUser) {
    loggedInUser = await store.dispatch({ type: 'login' }, {});
  }
  if (to.fullPath === '/toys') {
    if (!loggedInUser) {
      next('/login');
    }
  }
  if (to.fullPath === '/login') {
    if (loggedInUser) {
      next('/toys');
    }
  }
  next();
});

export default router;
