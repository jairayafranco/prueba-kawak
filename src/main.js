import Vue, { createApp } from '@vue/compat';
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue';
import router from './router/routes.js';
import store from './store/config.js';
import './styles.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
