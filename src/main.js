import Vue from 'vue';
import VueLocalStorage from 'vue-localstorage';

import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;
Vue.use(VueLocalStorage);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
