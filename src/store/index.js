import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    playerPosition: null,
    playerHealth: 50,
    playerAttack: 5,
    playerRange: [],
    playerViewport: [],
    room: 0,
    portalPosition: null,
    map: null,
    theme: 'default',
    monsters: null
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
    getPlayerViewport: state => {
      return state.playerViewport
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
    getRoom: state => {
      return state.room
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
    setPlayerViewport(state, playerViewport) {
      state.playerViewport = playerViewport
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
      context.state.room += 1
    }
  }
})

export default store
