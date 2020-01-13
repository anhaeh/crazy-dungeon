<template>
  <div></div>
</template>

<script>
import { mapGetters } from 'vuex'
import { movePlayer } from "@/modules/player"
import itemsData from '@/gamedata/Items.json'

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
            this.$store.commit('setMapDiscover', cellId)
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
    createMaze: function (width, height, iterations) {
      var maze = [];
      var mazeWidth = width;
      var mazeHeight = height;
      if (!iterations) iterations = width * height;

      var moves = [];
      for (var i = 0; i < mazeHeight; i++) {
        maze[i] = [];
        for (var j = 0; j < mazeWidth; j++) {
          maze[i][j] = 1;
        }
      }
      var posX = 1;
      var posY = 1;
      maze[posX][posY] = 0;
      moves.push(posY + posY * mazeWidth);
      for (var itr = 0; itr < iterations; ++itr) {
        if (moves.length) {
          var possibleDirections = "";
          if (posX + 2 > 0 && posX + 2 < mazeHeight - 1 && maze[posX + 2][posY] == 1) {
            possibleDirections += "S";
          }
          if (posX - 2 > 0 && posX - 2 < mazeHeight - 1 && maze[posX - 2][posY] == 1) {
            possibleDirections += "N";
          }
          if (posY - 2 > 0 && posY - 2 < mazeWidth - 1 && maze[posX][posY - 2] == 1) {
            possibleDirections += "W";
          }
          if (posY + 2 > 0 && posY + 2 < mazeWidth - 1 && maze[posX][posY + 2] == 1) {
            possibleDirections += "E";
          }
          if (possibleDirections) {
            var move = Math.floor(Math.random() * (possibleDirections.length + 1));
            switch (possibleDirections[move]) {
              case "N":
                maze[posX - 2][posY] = 0;
                maze[posX - 1][posY] = 0;
                posX -= 2;
                break;
              case "S":
                maze[posX + 2][posY] = 0;
                maze[posX + 1][posY] = 0;
                posX += 2;
                break;
              case "W":
                maze[posX][posY - 2] = 0;
                maze[posX][posY - 1] = 0;
                posY -= 2;
                break;
              case "E":
                maze[posX][posY + 2] = 0;
                maze[posX][posY + 1] = 0;
                posY += 2;
                break;
            }
            moves.push(posY + posX * mazeWidth);
          } else {
            var back = moves.pop();
            posX = Math.floor(back / mazeWidth);
            posY = back % mazeWidth;
          }
        }
      }
      return maze
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
      let width = 15
      let height = 21
      /** hay tema con valores pares*/
      /* generate map */
      let maze = this.createMaze(width, height)
      for (let i = 0; i < height; i++) {
        json.map[i] = {}
        for (let j = 0; j < width; j++) {
            let terrain = maze[i][j]
            let isBorder = j === 0 || j === width - 1 || i === 0 || i === height - 1
            if (terrain === 1 && Math.random() < 0.4 && !isBorder) { /* remove random walls */
              terrain = 0
            }
            json.map[i][j] = terrain
            if (terrain === 0) {
              free.push(`${i}_${j}`)
            }
        }
      }

      /* Set player */
      let playerPosition = free[Math.floor(Math.random() * free.length)]
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
      for (let i = 0; i < height; i++) {
        let position = free[Math.floor(Math.random() * free.length)]
        /* remove the free */
        let index = free.indexOf(position)
        free.splice(index, 1)
        json.entities.monsters.push({
          cellId: position,
          name: monstersList[Math.floor(Math.random() * monstersList.length)],
          isLive: true,
          level: possibleLevels[Math.floor(Math.random() * possibleLevels.length)],
          damage: 0
        })
      }

      /* Get cells far from player */
      // eslint-disable-next-line no-useless-escape
      let playerCell = playerPosition.split('_')
      let farFromPlayer = free.filter(x => {
        // eslint-disable-next-line no-useless-escape
        let cellPortal = x.split('_')
        if (Math.abs(cellPortal[0] - playerCell[0]) > 7) {
          return x
        }
      })
      /* Set portal */
      let portalPosition = farFromPlayer[Math.floor(Math.random() * farFromPlayer.length)]
      /* remove the free */
      index = farFromPlayer.indexOf(portalPosition)
      farFromPlayer.splice(index, 1)
      json.portal = portalPosition
      // eslint-disable-next-line no-useless-escape
      let cell = portalPosition.split('_')
      json.map[cell[0]][cell[1]] = 'P'

      /* Set merchant */
      if (this.$store.getters.getRoom % 2) {
        let positionMerchant = farFromPlayer[Math.floor(Math.random() * farFromPlayer.length)]
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
      let position = farFromPlayer[Math.floor(Math.random() * farFromPlayer.length)]
      /* remove the free */
      index = farFromPlayer.indexOf(portalPosition)
      farFromPlayer.splice(index, 1)
      json.entities.items[position] = this.$store.getters.getPlayer.level < 4 ? 'potion' : 'bigPotion'

      /* Set theme */
      let themes = ['default', 'forest', 'industrial', 'library', 'snakepit']
      json['theme'] = themes[Math.floor(Math.random() * themes.length)]
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
