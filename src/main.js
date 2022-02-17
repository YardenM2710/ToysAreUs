import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/style/styles.scss';
import loading from 'vuejs-loading-screen';
import Element from 'element-ui';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Notifications from 'vue-notification';
Vue.use(Notifications);

library.add(faUserSecret);
import * as VueGoogleMaps from 'vue2-google-maps';
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBA7NOmJ_7t6Q-h5Q-LVyCmQ3-CeqtAr_Q',
    libraries: 'places',
    installComponents: true,
  },
});
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(loading, {
  bg: '#81ecec',
  icon: 'refresh',
  size: 3,
  icon_color: 'white',
  slot: `
  <div class="px-5 py-3 bg-gray-800 rounded">
  <img src="/img/logo.fee8ee0b.png" />
    <h1 class="text-3xl text-white"><i class="fas fa-spinner fa-spin"></i> 
     Loading....
    </h1>
  </div>
`,
});
Vue.use(Element);
Vue.use(require('vue-moment'));
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
