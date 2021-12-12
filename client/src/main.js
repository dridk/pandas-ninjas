import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import LoadScript from 'vue-plugin-load-script';


Vue.config.productionTip = false
Vue.use(LoadScript);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
