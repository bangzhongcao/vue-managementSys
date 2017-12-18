import Vue from 'vue';
import iview from 'iview';
import 'iView/dist/styles/iview.css';
import App from './App';
import router from './router';

import 'common/less/index.less';

Vue.use(iview);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
