import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SearchView from '../views/SearchView.vue'
import InfoView from '../views/InfoView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/info',
      name: 'info',
      component: InfoView
    },
    {
//      path: '/items?search=:search',
      path: '/search',
      name: 'search',
      component: SearchView
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    }
  ]
})

export default router
