import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    player: { position: null },
    room: 0,
    portalPosition: null,
    map: null,
    theme: 'default',
    entities: null,
    preview: null
  },
  getters: {
    getMonsters: state => {
      return state.entities.monsters
    },
    getItems: state => {
      return state.entities.items
    },
    getPlayer: state => {
      return state.player
    },
    getPlayerDamage: state => {
      return state.player.damage
    },
    getPlayerPosition: state => {
      return state.player.position
    },
    getPlayerRange: state => {
      return state.player.range
    },
    getPlayerViewport: state => {
      return state.player.viewport
    },
    getPlayerAttack: state => {
      return state.player.attack
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
    getPreview: state => {
      return state.preview
    },
  },
  mutations: {
    setPlayerPosition(state, playerPosition) {
      state.player.position = playerPosition
    },
    setMonsters(state, monsters) {
      state.entities.monsters = monsters
    },
    setItems(state, items) {
      state.entities.items = items
    },
    setPlayerRange(state, playerRange) {
      state.player.range = playerRange
    },
    setPlayerViewport(state, playerViewport) {
      state.player.viewport = playerViewport
    },
    setPlayerAttack(state, playerAttack) {
      state.player.attack = playerAttack
    },
    setPlayerDamage(state, damage) {
      state.player.damage += damage
    },
    setPreview(state, preview) {
      state.preview = preview
    },
    setDefeatMonster(state, gold) {
      state.player.defeatMonsters += 1
      state.player.gold += gold
    },
    setPlayerDead(state) {
      state.player.isDead = true
    },
    initializePlayer(state, heroClass) {
      state.player = {
        class: heroClass,
        position: null,
        gold: 0,
        damage: 0,
        attack: 0,
        range: [],
        viewport: [],
        defeatMonsters: 0,
        nextLevelMonsters: 5,
        level: 1,
        isDead: false
      }
    }
  },
  actions: {
    setRoom({ state }, data) {
      state.player.position = data.player_init
      state.map = Object.assign({}, data.map)
      state.entities = data.entities
      state.portalPosition = data.portal
      state.theme = data.theme
      state.room += 1
    },
    initGame({ commit }) {
      commit('initializePlayer', 'necromancer')
    },
    levelUp({ state }) {
      let newPlayer = Object.assign({}, state.player)
      newPlayer.level += 1
      newPlayer.defeatMonsters = 0
      newPlayer.damage = 0
      newPlayer.attack += newPlayer.level
      newPlayer.nextLevelMonsters = 5 * newPlayer.level
      state.player = newPlayer
    }
  }
})

export default store
