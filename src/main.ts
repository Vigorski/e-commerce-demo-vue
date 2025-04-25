import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import { MotionPlugin } from '@vueuse/motion';
import router from './router';
import './assets/main.css';

import Toast, { type PluginOptions } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const options: PluginOptions = {
  timeout: 3000,
  closeOnClick: false,
  pauseOnHover: true,
};

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(Toast, options);
app.use(MotionPlugin);
app.mount('#app');
