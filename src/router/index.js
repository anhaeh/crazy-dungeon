import Vue from 'vue'
import VueRouter from 'vue-router'
import MainMenu from '../views/MainMenu'
import Dungeon from '../views/Dungeon'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main-menu',
    component: MainMenu
  },
  {
    path: '/dungeon/:class',
    name: 'dungeon',
    component: Dungeon
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
