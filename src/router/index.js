import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
// import shareImg from '../components/shareImg'
export default new Router({
  mode: 'history',
  routes: [
    {
      name: '404',
      path: '*',
      meta: {

      },
      component: resolve => require(['../components/page404.vue'], resolve)
    },
    {
      name: 'shareImg',
      path: '/h6/shareImg',
      meta: {
        weapon: 'shareImg'
      },
      params: {
        localUrl: ''
      },
      component: resolve => require(['../components/shareImg.vue'], resolve),
    },
    {
      name: 'struggleMother',
      path: '/h6/struggleMother',
      meta: {
        weapon: 'struggleMother'
      },
      params: {
        localUrl: ''
      },
      component: resolve => require(['../pages/struggleMother/index.vue'], resolve),
    },
    {
      name: 'getAttention',
      path: '/h6/getAttention',
      component: resolve => require(['../pages/struggleMother/getAttention.vue'], resolve),
    },

  ],
});
