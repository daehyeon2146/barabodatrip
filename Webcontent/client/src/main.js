import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import mixins from './mixins'
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

//createApp(App).use(i18n).use(router).use(mixins).mount('#app')


const app = createApp(App);
app.use(router);
app.mixin(mixins);
app.use(i18n);
app.use(store);
app.use(VueSweetalert2);
app.mount('#app');

window.Kakao.init("4e8af758d67dc31aec67a0f46e8b1f34");