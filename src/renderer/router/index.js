import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/views/Main';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('@/views/Login'),
    },
    {
      path: '/main',
      name: 'main',
      meta: {
        icon: 'md-menu',
        title: '多级菜单',
      },
      component: Main,
      children: [
        {
          path: '/switch',
          name: 'home',
          component: () => import('@/views/user/switch'),
        },
        {
          path: '/create',
          name: 'create',
          component: () => import('@/views/user/create'),
        },
        {
          path: '/get',
          name: 'get',
          component: () => import('@/views/user/get'),
        },
      ],
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
