// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from '../node_modules/axios';
import VueAxios from '../node_modules/vue-axios';
import './views/js/rem';
import './views/style/common.scss';
import wx from 'weixin-js-sdk';
import singer from './views/js/code';
import api from './views/js/api';
import common from './views/js/common';
import wxShare from './views/js/wx-share';

//引入log插件
import singerLog from './views/js/log'
Vue.use(singerLog);

Vue.prototype.$http = axios;
Vue.prototype.config = api;
Vue.prototype.common = common;
Vue.prototype.singer = singer;
Vue.prototype.wxShare = wxShare;
Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
//记录counselor
window.counselor = common.getUrlParams('counselor') || '';

/* 改变title */
Vue.directive('title', {
  function(el) {
    document.title = el.dataset.title;
  },
});

/* 截获路由错误信息 */
router.onError((err) => {
  console.log('错误',err);
  singerLog.sendLog('_error', 'routeError', err);
});

/* 前置守卫 */
router.beforeEach((to, from, next) => {
  console.log(from.query.counselor);
  to.query.counselor = window.counselor;
  next();
});

/* 监听路由变化 发送日志 */
router.afterEach((to, from) => {
  var weapons = (sessionStorage.weapons || '').split(',');
  if(to.meta.weapon && weapons[weapons.length-1] != to.meta.weapon){
    weapons.push(to.meta.weapon);
    sessionStorage.weapons = weapons.join(',');
  }
  singerLog.sendLog('_enter','routeChange','');
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  methods: {},
  created:function () {
    //获取授权
    var promise = common.checkAuth();
    promise.then(function (val) {
      console.log("ok--");
    }).catch(function (e) {
      console.log(e);
    });
  },
  mounted:function () {
  }
});
