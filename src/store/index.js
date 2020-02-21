import Vue from "vue"
import Vuex from "vuex"
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    classSelected: '',
    player: { position: null },
    dungeon: 0,
    portalPosition: null,
    map: null,
    mapDiscover: [],
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
    questLog: [],
    enableFog: true
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
    getPlayerSkills: state => {
      return state.player.skills
    },
    getPlayerAttack: state => {
      let itemsBuffAttack = state.inventory.items.filter(x => x.type === 'attack')
      let total = state.player.attack
      itemsBuffAttack.forEach(item => {
        total += item.counter
      })
      return total
    },
    getPlayerBaseLife: state => {
      return state.player.initialHealth + (state.player.level * 15)
    },
    getPlayerBuffLife: state => {
      let itemsBuffHealth = state.inventory.items.filter(x => x.type === 'life')
      let total = 0
      itemsBuffHealth.forEach(item => {
        total += item.counter
      })
      return total
    },
    getPlayerGoldMultiplier: state => {
      let itemsBuffGold = state.inventory.items.filter(x => x.type === 'gold')
      let multiplier = 1
      itemsBuffGold.forEach(item => {
        multiplier += item.counter
      })
      return multiplier
    },
    getPlayerDamage: state => {
      return state.player.damage
    },
    getPlayerPosition: state => {
      return state.player.position
    },
    getEnableFog: state => {
      return state.enableFog
    },
    getNpcs: state => {
      return state.entities.npcs
    },
    getMerchant: state => {
      return state.entities.npcs.find(x => x.type === 'merchant')
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
    getMapDiscover: state => {
      return state.mapDiscover
    },
    getPortalPosition: state => {
      return state.portalPosition
    },
    getTheme: state => {
      return state.theme
    },
    getDungeon: state => {
      return state.dungeon
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
    getScore: state => {
      return state.player.score
    }
  },
  mutations: {
    setClassSelected(state, classSelected) {
      state.classSelected = classSelected
      state.dungeon = 0
    },
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
    setPlayerSkills(state, skills) {
      state.player.skills = skills
    },
    setMapDiscover(state, cellId) {
      state.mapDiscover.push(cellId)
    },
    setPlayerViewport(state, playerViewport) {
      state.player.viewport = playerViewport
    },
    setPlayerExperience(state, score) {
      state.player.defeatMonsters += score
    },
    setPlayerVision(state, cells) {
      state.player.vision = cells
      let c = state.mapDiscover.concat(cells).sort()
      state.mapDiscover = c.filter((value, pos) => { return c.indexOf(value) === pos } )
    },
    setPlayerDamage(state, damage) {
      state.player.damage += damage
    },
    setPreview(state, preview) {
      state.preview = preview
    },
    setDefeatMonster(state) {
      let itemsBuffGold = state.inventory.items.filter(x => x.type === 'gold')
      let multiplier = 1
      itemsBuffGold.forEach(item => {
        multiplier += item.counter
      })
      let amountGold = state.monsterSelected.monster.gold
      state.player.defeatMonsters += 1
      let gold = Math.ceil(amountGold * multiplier)
      state.player.gold += gold
      state.questLog.push(`Monster drop ${gold} gold`)
      state.player.score += state.monsterSelected.monster.gold + (state.monsterSelected.level * 10)
    },
    setPlayerDead(state) {
      state.player.isDead = true
    },
    addItemToInventory(state, item) {
      state.inventory.items.push(item)
    },
    deleteItemInventory(state, index) {
      if (state.inventory.items[index].type === 'life') {
        state.player.damage -= state.inventory.items[index].counter
        if (state.player.damage < 0) {
          state.player.damage = 0
        }
      }
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
    setScore(state, score) {
      state.player.score += score
    },
    setEnableFog(state, fog) {
      state.enableFog = fog
    },
    setGold(state, gold) {
      state.player.gold += gold
    },
    clickDialog(state) {
      state.dialog.show = !state.dialog.show
    },
    setDialogMerchant(state, show) {
      let merchant = state.entities.npcs.find(x => x.type === 'merchant')
      merchant.show = show
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
    initializePlayer(state) {
      state.player = {
        class: state.classSelected,
        position: null,
        gold: 0,
        damage: 0,
        attack: 0,
        range: [],
        viewport: [],
        vision: [],
        defeatMonsters: 0,
        nextLevelMonsters: 5,
        level: 1,
        isDead: false,
        skills: [],
        score: 0
      }
      state.inventory.items = []
      // deep copy
      let heroes = JSON.parse(JSON.stringify(require('@/gamedata/Heroes.json')))
      let heroeData = heroes[state.classSelected]
      Object.assign(state.player, Object.assign({}, heroeData))
    },
    levelUp(state) {
      let newPlayer = Object.assign({}, state.player)
      newPlayer.level += 1
      newPlayer.defeatMonsters = 0
      newPlayer.damage = 0
      newPlayer.attack += 2
      newPlayer.nextLevelMonsters = 5 * newPlayer.level
      state.player = newPlayer
      state.questLog.push(`Player level up`)
    },
    destroyNpc(state, cellId) {
      let index = state.entities.npcs.findIndex(x => x.cellId === cellId)
      state.entities.npcs.splice(index, 1)
    }
  },
  actions: {
    setDungeon({ state }, data) {
      state.enableFog = true
      state.player.position = data.player_init
      state.map = Object.assign({}, data.map)
      state.entities = data.entities
      state.portalPosition = data.portal
      state.theme = data.theme
      state.dungeon += 1
      state.mapDiscover = []
      state.questLog = ['Begin dungeon ' + state.dungeon]
    },
    initGame({ commit }) {
      commit('initializePlayer')
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
    buyItem({state, commit}, item) {
      if (state.inventory.maxSize === state.inventory.items.length) {
        commit('pushLog', 'Your inventory is full')
        return false
      }
      if (state.player.gold < item.obj.price) {
        commit('pushLog', 'Insufficient gold')
        return false
      }
      let merchant = state.entities.npcs.find(x => x.type === 'merchant')

      let index = merchant.items.indexOf(item.name)
      merchant.items.splice(index, 1)
      state.player.gold -= item.obj.price
      commit('addItemToInventory', item.obj)
      commit('pushLog', 'Player bought ' + item.obj.name)
    },
    buySkill({state, commit}, skill) {
      if (state.player.skills.length === 6) {
        commit('pushLog', "You can't learn more skills")
        return false
      }
      if (state.player.gold < skill.obj.price) {
        commit('pushLog', 'Insufficient gold')
        return false
      }
      state.player.gold -= skill.obj.price
      state.player.skills.push(skill.name)
      commit('pushLog', 'Player bought ' + skill.obj.name)

    },
    attack({state, commit, getters}, payload = { damageSkill: 1 }) {
      let playerDamage = Math.ceil(getters.getPlayerAttack * payload.damageSkill)
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
        }
      } else {
        if (payload.range !== true) {
          let monsterAttack = state.monsterSelected.monster.attack + monsterDefender.level
          state.questLog.push(`${state.monsterSelected.monster.name} deals ${monsterAttack} damage`)
          commit('setPlayerDamage', monsterAttack)
        }
      }
    }
  }
})

export default store
