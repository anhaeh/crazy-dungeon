import Vue from 'vue'
import VueRouter from 'vue-router'
import MainMenu from '../views/MainMenu'
import ClassSelection from '../views/ClassSelection'
import Dungeon from '../views/Dungeon'
import HighScores from '../views/HighScores'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main-menu',
    component: MainMenu
  },
  {
    path: '/class-selection',
    name: 'class-selection',
    component: ClassSelection,
    beforeEnter(to, from, next) {
      if (from.name !== 'dungeon') {
        next()
      }
      next(false)
    }
  },
  {
    path: '/dungeon/:class',
    name: 'dungeon',
    component: Dungeon
  },
  {
    path: '/high-scores',
    name: 'high-scores',
    component: HighScores
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
