import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import httpRrequest from "./tools/httpRrequest";
import './registerServiceWorker'
import ViewUI from 'view-design';
import axios from "axios";
import Qs from 'qs'
import '../theme/my-theme/dist/iview.css';
Vue.config.productionTip = false;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.use(ViewUI);
Vue.prototype.$qs = Qs
Vue.prototype.$http = httpRrequest
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
