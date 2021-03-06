import Vue from 'vue';
import iview from 'iview';
import 'iView/dist/styles/iview.css';
import App from './App';
import resource from 'vue-resource';
import router from './router';

import 'common/less/index.less';

Vue.use(iview);
Vue.use(resource);
Vue.config.productionTip = false;
// Vue.http.options.emulateJSON = true;
/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
