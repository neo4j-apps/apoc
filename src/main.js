import Vue from 'vue'
import VueNeo4j from 'vue-neo4j'
import router from './router'

import App from './App.vue'
import Loading from './components/Loading.vue'

Vue.use(VueNeo4j)

Vue.component('loading', Loading)

import './assets/app.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
