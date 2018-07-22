import Vue from 'vue'
import App from './App'
import store from './store'

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  store,
  components: {App},
  template: '<App/>'
});
