import {createApp} from 'vue';
import {createPinia} from 'pinia';

import App from './App.vue'
import router from './router'
import "./assets/css/reset.css";
import "./assets/css/defaults.css";
import "./assets/css/columns.css";
import "./assets/css/flexbox.css";
import "./assets/css/app.css";
import "./assets/css/player.css";
import "./assets/css/transitions.css";

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.mount('#app')
