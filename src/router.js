import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from './views/HomeView.vue'
import CarritoView from './views/CarritoView.vue'

// Le avisamos a Vue que use el plugin del enrutador
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/carrito',
    name: 'carrito',
    component: CarritoView
  }
]

const router = new VueRouter({
  mode: 'history', // Hace que las URLs sean limpias sin el signo '#'
  routes
})

export default router