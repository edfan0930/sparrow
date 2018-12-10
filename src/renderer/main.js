import Vue from 'vue';

import App from './App';
import router from './router';
import store from './store';
import api from "./api";
import "./plugins/iview";

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.config.productionTip = false;

Vue.use(api);

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app');
