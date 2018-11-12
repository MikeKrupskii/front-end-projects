import Vue from 'vue'

import VueRouter from 'vue-router';
import App from './App.vue';
import Header from './components/Header.vue';
import {routes} from './routes';

Vue.component('app-header', Header);
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  el: '#app',
  router,

  render: h => h(App)




})
