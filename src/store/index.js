import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    playerPosition: '1A',
    portalPosition: null,
    playerHealth: 50,
    playerAttack: 5,
    map: null,
    theme: 'default',
    monsters: null,
    playerRange: []
  },
  getters: {
    getMonsters: state => {
      return state.monsters
    },
    getPlayerHealth: state => {
      return state.playerHealth
    },
    getPlayerPosition: state => {
      return state.playerPosition
    },
    getPlayerRange: state => {
      return state.playerRange
    },
    getPlayerAttack: state => {
      return state.playerAttack
    },
    getMap: state => {
      return state.map
    },
    getPortalPosition: state => {
      return state.portalPosition
    },
    getTheme: state => {
      return state.theme
    },
  },
  mutations: {
    setPlayerPosition(state, playerPosition) {
      state.playerPosition = playerPosition
    },
    setMonsters(state, monsters) {
      state.monsters = monsters
    },
    setPlayerRange(state, playerRange) {
      state.playerRange = playerRange
    },
    setPlayerDamage(state, damage) {
      state.playerHealth -= damage
    },
  },
  actions: {
    setRoom(context, data) {
      context.state.map = Object.assign({}, data.map)
      context.state.playerPosition = data.player_init
      context.state.monsters = data.monsters
      context.state.portalPosition = data.portal
      context.state.theme = data.theme
    }
  }
})

export default store
