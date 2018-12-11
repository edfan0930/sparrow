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
      name: 'Main',
      meta: {
        icon: 'md-menu',
        title: '多级菜单',
      },
      component: Main,
      children: [
        {
          path: '/switch',
          name: 'Switch',
          meta: {
            icon: 'md-funnel',
            title: '二级-1',
          },
          component: () => import('@/views/user/switch'),
        },
      ],
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
