import { createApp } from 'vue';
// npm i vue-toastification@next
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import './assets/style.css';
import App from './App.vue';

const app = createApp(App);
app.use(Toast);
app.mount('#app');
