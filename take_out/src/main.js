import Vue from 'vue'
import App from './App.vue'
// 引入router
import router from './router/index.js'
// 引入vuex
import store from './store'

// 引入vant

import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
