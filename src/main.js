import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import vuetify from './plugins/vuetify'

// Import Routes
import Home from './components/Home.vue'
import Puzzles from './components/Puzzles.vue'
import Visualize from './components/Visualize.vue'
import User from './components/User.vue'

const routes = [
  { path:'/', component: Home },
  { path:'/Puzzles', component: Puzzles },
  { path:'/Visualize', component: Visualize },
  { path:'/User', component: User }
]

const router = new VueRouter({
  routes
})

Vue.config.productionTip = false

Vue.use(VueRouter)

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
