import Vue from 'vue'
import VueRouter from 'vue-router'
import ClassSelect from '../views/ClassSelect'
import Dungeon from '../views/Dungeon'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'menu',
    component: ClassSelect
  },
  {
    path: '/dungeon',
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
