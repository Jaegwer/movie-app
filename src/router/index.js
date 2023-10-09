import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Details from '../views/Details.vue'
import Favorites from '../views/Favorites.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/Favorites',
      name: 'Favorites',
      component: Favorites,
	  props: true
    },
    {
      path: '/movie/:id',
      name: 'movie-detail',
      component: Details,
      props: true
    }
  ]
})

export default router
