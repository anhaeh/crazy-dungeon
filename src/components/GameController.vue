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
          // eslint-disable-next-line no-useless-escape
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
          for (let i = -3; i < 6; i++) {
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
  methods: {
    random: function (items) {
      return items[Math.floor(Math.random() * items.length)]
    },
    createMaze: function (width, height) {
      let dungeon = new Dungeon({
        size: [width, height],
        seed: 'abcd', //omit for generated seed
        "rooms": {
          "initial": {
            "min_size": [5, 5],
            "max_size": [8, 8],
            "max_exits": 2
          },
          "any": {
            "min_size": [2, 2],
            "max_size": [5, 5],
            "max_exits": 2
          }
        },
        "max_corridor_length": 4,
        "min_corridor_length": 2,
        "corridor_density": 0.5,
        "symmetric_rooms": false,
        "interconnects": 1,
        "max_interconnect_length": 10,
        "room_count": 15
      })

      dungeon.generate();
      let matrix = {}
      dungeon.walls.rows.forEach((x, index) => {
        matrix[index] = x.map(x => { return x ? 1 : 0 } )
      })
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
    nextRoom: function () {
      let json = require(`@/gamedata/Rooms/${this.$store.getters.getRoom + 1}.json`)
      this.$store.dispatch('setRoom', json)
    },
    buildMap: function () {
      /* TODO pasar a un js encargado de generar mapas */
      let free = []
      let json = {
        entities: {
          monsters: [],
          items: {},
          merchant: {}
        },
        map: {}
      }
      let width = 100
      let height = 100
      /** hay tema con valores pares*/
      /* generate map */
      let maze = this.createMaze(width, height)
      json.map = maze
      Object.keys(maze).forEach(row => {
        maze[row].forEach((cell, indexCell) => {
          if (maze[row][indexCell] === 0) {
            free.push(`${row}_${indexCell}`)
          }
        })
      })
      /* Set player */
      let playerPosition = this.random(free)
      /* remove the free */
      let index = free.indexOf(playerPosition)
      free.splice(index, 1)
      json.player_init = playerPosition

      /* Set monsters */
      let monstersList = ['goblin', 'golem', 'gorgon', 'imp']
      let possibleLevels = []
      for (let i = this.getPlayer.level; i <= this.getPlayer.level+2; i++) {
        possibleLevels.push(i)
      }
      for (let i = 0; i < height / 4 ; i++) {
        let position = this.random(free)
        /* remove the free */
        let index = free.indexOf(position)
        free.splice(index, 1)
        json.entities.monsters.push({
          cellId: position,
          name: this.random(monstersList),
          isLive: true,
          level: this.random(possibleLevels),
          damage: 0
        })
      }

      /* Get cells far from player */
      // eslint-disable-next-line no-useless-escape
      let playerCell = playerPosition.split('_')
      let farFromPlayer = free.filter(x => {
        // eslint-disable-next-line no-useless-escape
        let cell = x.split('_')
        if (Math.abs(parseInt(cell[0]) - parseInt(playerCell[0])) > 7) {
          return x
        }
      })
      /* Set portal */
      let portalPosition = this.random(farFromPlayer)
      /* remove the free */
      index = farFromPlayer.indexOf(portalPosition)
      farFromPlayer.splice(index, 1)
      json.portal = portalPosition
      // eslint-disable-next-line no-useless-escape
      let cell = portalPosition.split('_')
      json.map[cell[0]][cell[1]] = 'P'

      /* Set merchant */
      if (this.$store.getters.getRoom % 2) {
        let positionMerchant = this.random(farFromPlayer)
        /* remove the free */
        index = farFromPlayer.indexOf(portalPosition)
        farFromPlayer.splice(index, 1)
        json.entities.merchant.cellId = positionMerchant
        json.entities.merchant.items = ['potion', 'bigPotion']
        json.entities.merchant.show = false
        let items = Object.keys(itemsData).filter(x => itemsData[x].type !== 'potion')
        for (let i = 0; i < 3; i++) {
          let itemToAdd = items[Math.floor(Math.random() * items.length)]
          index = items.indexOf(itemToAdd)
          items.splice(index, 1)
          json.entities.merchant.items.push(itemToAdd)
        }
      }

      /* Set random potions */
      let position = this.random(farFromPlayer)
      /* remove the free */
      index = farFromPlayer.indexOf(portalPosition)
      farFromPlayer.splice(index, 1)
      json.entities.items[position] = this.$store.getters.getPlayer.level < 4 ? 'potion' : 'bigPotion'

      /* Set theme */
      let themes = ['default', 'forest', 'industrial', 'library', 'snakepit']
      json['theme'] = this.random(themes)
      this.$store.dispatch('setRoom', json)
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
