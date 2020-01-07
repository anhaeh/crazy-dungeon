import Vue from "vue"
import Vuex from "vuex"
import heroes from '@/gamedata/Heroes.json'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    player: { position: null },
    room: 0,
    portalPosition: null,
    map: null,
    theme: 'default',
    entities: null,
    preview: null,
    monsterSelected: null,
    inventory: {
      show: false,
      items: [],
      maxSize: 6
    },
    dialog: {
      entity: null,
      show: false
    },
    questLog: []
  },
  getters: {
    getMonsters: state => {
      return state.entities.monsters
    },
    getMonsterSelected: state => {
      return state.monsterSelected
    },
    getItems: state => {
      return state.entities.items
    },
    getPlayer: state => {
      return state.player
    },
    getPlayerAttack: state => {
      let itemsBuffAttack = state.inventory.items.filter(x => x.type === 'attack')
      let total = state.player.attack
      itemsBuffAttack.forEach(item => {
        total += item.counter
      })
      return total
    },
    getPlayerLife: state => {
      let itemsBuffHealth = state.inventory.items.filter(x => x.type === 'life')
      let total = state.player.initialHealth + (state.player.level * 15)
      itemsBuffHealth.forEach(item => {
        total += item.counter
      })
      return total
    },
    getPlayerDamage: state => {
      return state.player.damage
    },
    getPlayerPosition: state => {
      return state.player.position
    },
    getMerchant: state => {
      return state.entities.merchant
    },
    getPlayerRange: state => {
      return state.player.range
    },
    getPlayerViewport: state => {
      return state.player.viewport.sort()
    },
    getPlayerBaseAttack: state => {
      return state.player.attack
    },
    getInventory: state => {
      return state.inventory
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
    getQuestLog: state => {
      return state.questLog
    },
    getDialog: state => {
      return state.dialog
    },
  },
  mutations: {
    setMonsterSelected(state, monsterSelected) {
      state.monsterSelected = monsterSelected
    },
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
    setPlayerDamage(state, damage) {
      state.player.damage += damage
    },
    setPreview(state, preview) {
      state.preview = preview
    },
    setDefeatMonster(state) {
      let amountGold = state.monsterSelected.monster.gold + state.monsterSelected.level
      state.player.defeatMonsters += 1
      state.player.gold += amountGold
      state.questLog.push(`Monster drop ${amountGold} gold`)
    },
    setPlayerDead(state) {
      state.player.isDead = true
    },
    addItemToInventory(state, item) {
      state.inventory.items.push(item)
    },
    deleteItemInventory(state, index) {
      state.inventory.items.splice(index, 1)
    },
    clickInventory(state) {
      state.inventory.show = !state.inventory.show
    },
    setShowInventory(state, show) {
      state.inventory.show = show
    },
    pushLog(state, msg) {
      state.questLog.push(msg)
    },
    setDialog(state, entity) {
      state.dialog.entity = entity
      state.dialog.show = true
    },
    setDialogShow(state, show) {
      state.dialog.show = show
    },
    clickDialog(state) {
      state.dialog.show = !state.dialog.show
    },
    restoreLife(state, data) {
      if (state.player.damage > 0) {
        if (data.itemId !== undefined) {
          state.inventory.items.splice(data.itemId, 1)
        }
        state.player.damage -= data.counter
        if (state.player.damage < 0) {
          state.player.damage = 0
        }
        state.questLog.push(`Player restored ${data.counter} HP`)
      } else {
        state.questLog.push(`Player has full health`)
      }
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
      let heroeData = heroes[heroClass]
      Object.assign(state.player, heroeData)
    },
    levelUp(state) {
      let newPlayer = Object.assign({}, state.player)
      newPlayer.level += 1
      newPlayer.defeatMonsters = 0
      newPlayer.damage = 0
      newPlayer.attack += newPlayer.level
      newPlayer.nextLevelMonsters = 5 * newPlayer.level
      state.player = newPlayer
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
      state.questLog = ['Begin room']
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
    },
    attack({state, commit, getters}, damageSkill=1) {
      let playerDamage = getters.getPlayerAttack * damageSkill
      let monsterDefender = state.entities.monsters.find(x => x.cellId === state.monsterSelected.cellId)
      monsterDefender.damage += playerDamage
      state.questLog.push(`Player deals ${playerDamage} to ${state.monsterSelected.monster.name}`)
      if (monsterDefender.damage >= state.monsterSelected.totalLife) {
        /* if kill monster*/
        event.stopPropagation()
        commit('setPreview', null)
        commit('setDefeatMonster')
        state.questLog.push(`${state.monsterSelected.monster.name} destroyed`)
        state.monsterSelected = null
        if (state.player.defeatMonsters === state.player.nextLevelMonsters) {
          commit('levelUp')
          state.questLog.push(`Player level up`)
        }
      } else {
        let monsterAttack = state.monsterSelected.monster.attack + monsterDefender.level
        state.questLog.push(`${state.monsterSelected.monster.name} deals ${monsterAttack} damage`)
        commit('setPlayerDamage', monsterAttack)
      }

    }
  }
})

export default store
