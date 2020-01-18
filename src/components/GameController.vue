<template>
  <div></div>
</template>

<script>
import { mapGetters } from 'vuex'
import { movePlayer } from "@/modules/player"
import itemsData from '@/gamedata/Items.json'
import Dungeon from 'dungeon-generator'

export default {
  name: "GameController",
  watch: {
    getPlayerPosition: {
      handler: function () {
        if (this.getPlayerPosition === this.getPortalPosition) {
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
          for (let i = -3; i < 5; i++) {
            for (let j = -3; j < 4; j++) {
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
    ...mapGetters([
        'getPlayerPosition',
        'getPortalPosition',
        'getPlayer'
    ])
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
      let theme = 'cave'

      /* TODO pasar a un js encargado de generar mapas */
      let free = []
      let json = {
        theme: theme,
        entities: {
          monsters: [],
          items: {},
          merchant: {}
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
      if (this.$store.getters.getDungeon % 2) {
        let positionMerchant = this.random(freeMiddleCells)
        /* remove the free */
        index = freeMiddleCells.indexOf(positionMerchant)
        freeMiddleCells.splice(index, 1)
        index = farFromPlayer.indexOf(positionMerchant)
        farFromPlayer.splice(index, 1)
        index = free.indexOf(positionMerchant)
        free.splice(index, 1)
        json.entities.merchant.cellId = positionMerchant
        json.entities.merchant.items = ['potion', 'bigPotion']
        json.entities.merchant.show = false
        let items = Object.keys(itemsData).filter(x => itemsData[x].type !== 'potion')
        for (let i = 0; i < 3; i++) {
          let itemToAdd = this.random(items)
          index = items.indexOf(itemToAdd)
          items.splice(index, 1)
          json.entities.merchant.items.push(itemToAdd)
        }
      }

      /* Set monsters */
      let monstersList = ['goblin', 'golem', 'gorgon', 'imp']

      for (let i = 0; i < roomCount * 3; i++) {
        let num = Math.random();
        let level = this.getPlayer.level + 2
        if(num < 0.5){
          level = this.getPlayer.level
        } else if (num < 0.85) {
          level = this.getPlayer.level + 1
        }
        let position = this.random(free)
        /* remove the free */
        let index = free.indexOf(position)
        free.splice(index, 1)
        json.entities.monsters.push({
          cellId: position,
          name: this.random(monstersList),
          isLive: true,
          level: level,
          damage: 0
        })
        /* set drop potions random */
        if(Math.random() > 0.85) {
          json.entities.items[position] = this.$store.getters.getPlayer.level < 4 ? 'potion' : 'bigPotion'
        }
      }
      this.$store.dispatch('setDungeon', json)
    }
  },
  created() {
    document.addEventListener('keydown', this.keysListener)
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
