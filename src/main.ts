import { createApp } from 'vue'
import App from './App.vue'
import Maska from 'maska'
import { VueReCaptcha } from 'vue-recaptcha-v3'

const app = createApp(App);
app.use(Maska);
app.use(VueReCaptcha, { siteKey: '6LfrEXUdAAAAAMpB1YwkgnDkMB1rq2syZmSeDPKR'})
app.mount('#app');
