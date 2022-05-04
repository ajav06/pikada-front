import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import axios from 'axios';

Vue.use(axios);

axios.defaults.baseURL = 'https://pikada-server.herokuapp.com/api/v1/';
// axios.defaults.baseURL = 'http://127.0.0.1:5000/api/v1/';

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
