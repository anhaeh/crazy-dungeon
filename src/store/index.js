import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    playerPosition: '1.A',
    playerHealth: 50,
    playerAttack: 5,
    map: null,
    monsters: {
    },
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
    }
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
    }
  }
})

export default store
