<template>
  <div></div>
</template>

<script>
import { movePlayer } from "@/modules/player"
import itemsData from '@/gamedata/Items.json'
import Dungeon from 'dungeon-generator'

export default {
  name: "GameController",
  inject: ['isMobile'],
  watch: {
    getPlayerPosition: {
      handler: function () {
        if (this.getPlayerPosition === this.$store.getters.getPortalPosition) {
          this.buildMap()
          //this.nextRoom()
        } else {
          let player = this.getPlayerPosition.split('_')
          let cells = []
          let cellCanMove = [[0, -1], [-1, 0], [1, 0], [0, 1]] /* LEFT - UP - DOWN - RIGHT */
          cellCanMove.forEach(x => {
            let row = parseInt(player[0]) + x[0]
            let column = parseInt(player[1]) + x[1]
            let cellId = `${row}_${column}`
            cells.push(cellId)
          })
          this.$store.commit('setPlayerRange', cells)
          let cellsViewport = []
          let rowsStart = this.isMobile ? -3 : -5
          let rowsEnd = this.isMobile ? 5 : 7
          let columnsStart = this.isMobile ? -3 : -10
          let columnsEnd = this.isMobile ? 4 : 11
          for (let i = rowsStart; i < rowsEnd; i++) {
            for (let j = columnsStart; j < columnsEnd; j++) {
              let row = parseInt(player[0]) + i
              let column = parseInt(player[1]) + j
              cellsViewport.push(`${row}_${column}`)
            }
          }
          this.$store.commit('setPlayerViewport', cellsViewport)

          let fogViewport = []
          for (let i = -2; i < 3; i++) {
            for (let j = -2; j < 3; j++) {
              if((Math.abs(i) * Math.abs(j)) < 4) {
                let row = parseInt(player[0]) + i
                let column = parseInt(player[1]) + j
                fogViewport.push(`${row}_${column}`)
              }
            }
          }
          this.$store.commit('setPlayerVision', fogViewport)
        }
      }
    }
  },
  computed: {
    getPlayerPosition: function () {
      return this.$store.getters.getPlayerPosition
    }
  },
  data() {
    return {
      initialPosition: '1_1'
    }
  },
  methods: {
    random: function (items) {
      return items[Math.floor(Math.random() * items.length)]
    },
    createMaze: function (roomCount) {
      let dungeon = new Dungeon({
        "rooms": {
          "initial": {
            "min_size": [3, 3],
            "max_size": [8, 8],
            "max_exits": 3
          },
          "any": {
            "min_size": [3, 3],
            "max_size": [7, 7],
            "max_exits": 3
          },
        },
        "max_corridor_length": 4,
        "min_corridor_length": 1,
        "corridor_density": 0.5,
        "symmetric_rooms": false,
        "interconnects": 1,
        "room_count": roomCount
      })

      dungeon.generate()
      let matrix = {}
      dungeon.walls.rows.forEach((x, index) => {
        matrix[index] = x.map(x => {
          let result = x ? 1 : 0
          if (result === 0) {
            let num = Math.random()
            if(num < 0.05){
              result = 2
            } else if (num < 0.1) {
              result = 3
            }
          }
          return result
        })
      })
      this.initialPosition = `${dungeon.start_pos[1]}_${dungeon.start_pos[0]}`
      return matrix
    },
    keysListener: function () {
      let directions = {
        'w': 1,
        'a': 0,
        'd': 3,
        's': 2
      }
      if (event.code === 'Space' && this.$store.getters.getMonsterSelected) {
        this.$store.dispatch('attack')
      } else if (event.code.substring(0,5) === 'Digit') {
        // number for skills
        let skill = document.querySelector('#skill-' + event.code.charAt(5))
        if (skill) { skill.click() }
      } else {
        const key = event.key.toLowerCase()
        // we are only interested in alphanumeric keys
        if (Object.keys(directions).indexOf(key) === -1) return
        let cellToMove = this.$store.getters.getPlayerRange[directions[key]]
        movePlayer(cellToMove)
      }
    },
    buildMap: function () {
      /* Set theme */
      // let theme = this.random(['default', 'forest', 'industrial', 'snakepit'])
      let theme = this.random(['cave', 'crypt', 'plateau'])

      /* TODO pasar a un js encargado de generar mapas */
      let free = []
      let json = {
        theme: theme,
        entities: {
          monsters: [],
          items: {},
          npcs: []
        },
        map: {}
      }
      /** hay tema con valores pares*/
      /* generate map */
      let roomCount = this.random([5, 6, 7, 8])
      let maze = this.createMaze(roomCount)
      json.map = maze
      Object.keys(maze).forEach(row => {
        maze[row].forEach((cell, indexCell) => {
          if (maze[row][indexCell] === 0) {
            free.push(`${row}_${indexCell}`)
          }
        })
      })
      /* Set player */
      let playerPosition = this.initialPosition
      /* remove the free */
      let index = free.indexOf(playerPosition)
      free.splice(index, 1)
      json.player_init = playerPosition

      /* Get cells far from player */
      let playerCell = playerPosition.split('_')
      let farFromPlayer = free.filter(x => {
        let cell = x.split('_')
        if (Math.abs(parseInt(cell[0]) - parseInt(playerCell[0])) > 7 ||
            Math.abs(parseInt(cell[1]) - parseInt(playerCell[1])) > 7) {
          return x
        }
      })
      /* Get cells far from player && in middle => not in connectors */
      let freeMiddleCells = []
      farFromPlayer.forEach(j => {
        let cell = j.split('_')
        let x = parseInt(cell[0])
        let y = parseInt(cell[1])
        if (farFromPlayer.includes(`${x-1}_${y}`) && farFromPlayer.includes(`${x+1}_${y}`) &&
            farFromPlayer.includes(`${x}_${y-1}`) && farFromPlayer.includes(`${x}_${y+1}`) &&
            farFromPlayer.includes(`${x-1}_${y-1}`) && farFromPlayer.includes(`${x+1}_${y+1}`) &&
            farFromPlayer.includes(`${x-1}_${y+1}`) && farFromPlayer.includes(`${x+1}_${y-1}`)) {
          freeMiddleCells.push(j)
        }
      })
      if (freeMiddleCells.length < 2) {
        freeMiddleCells = farFromPlayer
      }
      /* Set portal */
      let portalPosition = this.random(freeMiddleCells)
      /* remove the free */
      index = freeMiddleCells.indexOf(portalPosition)
      freeMiddleCells.splice(index, 1)
      index = farFromPlayer.indexOf(portalPosition)
      farFromPlayer.splice(index, 1)
      index = free.indexOf(portalPosition)
      free.splice(index, 1)
      json.portal = portalPosition
      let cell
      cell = portalPosition.split('_')
      json.map[cell[0]][cell[1]] = 'P'

      /* Set merchant */
      let dungeonLevel = this.$store.getters.getDungeon + 1
      if (dungeonLevel % 2 === 0) {
        let positionMerchant = this.random(freeMiddleCells)
        /* remove the free */
        index = freeMiddleCells.indexOf(positionMerchant)
        freeMiddleCells.splice(index, 1)
        index = farFromPlayer.indexOf(positionMerchant)
        farFromPlayer.splice(index, 1)
        index = free.indexOf(positionMerchant)
        free.splice(index, 1)
        let merchant = {
          type: 'merchant'
        }
        merchant.cellId = positionMerchant
        merchant.items = ['potion', 'bigPotion', 'key']
        merchant.show = false
        let items = Object.keys(itemsData).filter(x => itemsData[x].type !== 'potion' && itemsData[x].type !== 'key')
        for (let i = 0; i < 5; i++) {
          let itemToAdd = this.random(items)
          index = items.indexOf(itemToAdd)
          items.splice(index, 1)
          merchant.items.push(itemToAdd)
        }
        json.entities.npcs.push(merchant)
      }

      /* Set npcs */
      let npcs = ['zombie']
      if (dungeonLevel % 2 === 0) {
        npcs.push('chest')
      }
      if (dungeonLevel % 3 === 0) {
        npcs.push('monk')
      }
      if (dungeonLevel % 5 === 0) {
        npcs.push('viking')
      }
      npcs.forEach(npc => {
        let positionNpc = this.random(free)
        free.splice(free.indexOf(positionNpc), 1)
        json.entities.npcs.push({
          type: npc,
          show: false,
          cellId: positionNpc
        })
      })

      /* Set monsters */
      let monstersList = ['leech', 'goblin', 'golem', 'gorgon', 'imp', 'bat', 'bear', 'blackKnight', 'viper', 'darkPriest', 'fireElemental', 'iceGolem', 'phantom']
      let playerLevel = this.$store.getters.getPlayer.level

      for (let i = 0; i < roomCount * 3; i++) {
        let num = Math.random()
        let level = playerLevel + 2
        if(num < 0.5){
          level = playerLevel
        } else if (num < 0.85) {
          level = playerLevel + 1
        }
        let position = this.random(free)
        /* remove the free */
        free.splice(free.indexOf(position), 1)
        json.entities.monsters.push({
          cellId: position,
          name: this.random(monstersList),
          isLive: true,
          level: level,
          damage: 0
        })
        /* set drop potions random when player is less than level 5 */
        if(Math.random() > 0.85 && playerLevel < 5) {
          json.entities.items[position] = 'potion'
        }
      }

      if(Math.random() > 0.85) {
        let itemsToDrop = ['potion', 'armor1', 'dagger', 'key']
        let item = this.random(itemsToDrop)
        let position = this.random(free)
        json.entities.items[position] = item
        free.splice(free.indexOf(position), 1)
      }
      this.$store.dispatch('setDungeon', json)
    }
  },
  created() {
    if (!this.isMobile || process.env.NODE_ENV === 'development') {
      document.addEventListener('keydown', this.keysListener)
    }
    this.$store.dispatch('initGame')
    this.buildMap()
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.keysListener)
  }
}
</script>

<style scoped>

</style>
