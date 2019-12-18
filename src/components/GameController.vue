<template>
  <div></div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
  name: "GameController",
  data () {
    return {
    }
  },
  watch: {
    getPlayerPosition: {
      immediate: true,
      handler() {
        if (this.getPlayerPosition === this.getPortalPosition) {
          this.buildMap()
          //this.nextRoom()
        } else {
          // eslint-disable-next-line no-useless-escape
          let player = this.getPlayerPosition.match(/[\d\.]+|\D+/g)
          let cells = []
          let cellCanMove = [[0, -1], [-1, 0], [1, 0], [0, 1]] /* LEFT - UP - DOWN - RIGHT */
          cellCanMove.forEach(x => {
            let row = parseInt(player[0]) + x[0]
            let letter = String.fromCharCode(player[1].charCodeAt() + x[1])
            cells.push(`${row}${letter}`)
          })
          let cellNewPort = cells.slice()
          this.$store.commit('setPlayerRange', cells)
          let cellDiagonals = [[-1, -1], [-1, 1], [0, 0], [1, 0], [1, -1], [1, 1]]
          cellDiagonals.forEach(x => {
            let row = parseInt(player[0]) + x[0]
            let letter = String.fromCharCode(player[1].charCodeAt() + x[1])
            cellNewPort.push(`${row}${letter}`)
          })
          this.$store.commit('setPlayerViewport', cellNewPort)
        }
      }
    }
  },
  computed: {
    ...mapGetters(['getPlayerPosition', "getPortalPosition"])
  },
  methods: {
    createMaze: function(width, height, iterations) {
      var maze = [];
      var mazeWidth = width;
      var mazeHeight = height;
      if (!iterations) iterations = width * height;

      var moves = [];
      for(var i = 0; i < mazeHeight; i ++){
        maze[i] = [];
        for(var j = 0; j < mazeWidth; j ++){
          maze[i][j] = 1;
        }
      }
      var posX = 1;
      var posY = 1;
      maze[posX][posY] = 0;
      moves.push(posY + posY * mazeWidth);
      for (var itr = 0; itr < iterations; ++itr) {
        if(moves.length){
          var possibleDirections = "";
          if(posX+2 > 0 && posX + 2 < mazeHeight - 1 && maze[posX + 2][posY] == 1){
            possibleDirections += "S";
          }
          if(posX-2 > 0 && posX - 2 < mazeHeight - 1 && maze[posX - 2][posY] == 1){
            possibleDirections += "N";
          }
          if(posY-2 > 0 && posY - 2 < mazeWidth - 1 && maze[posX][posY - 2] == 1){
            possibleDirections += "W";
          }
          if(posY+2 > 0 && posY + 2 < mazeWidth - 1 && maze[posX][posY + 2] == 1){
            possibleDirections += "E";
          }
          if(possibleDirections){
            var move = Math.floor(Math.random() * (possibleDirections.length+1));
            switch (possibleDirections[move]){
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
                maze[posX][posY + 2]=0;
                maze[posX][posY + 1]=0;
                posY += 2;
                break;
            }
            moves.push(posY + posX * mazeWidth);
          }
          else{
            var back = moves.pop();
            posX = Math.floor(back / mazeWidth);
            posY = back % mazeWidth;
          }
        }
      }
      return maze
    },
    setKeyListener: function () {
      document.addEventListener('DOMContentLoaded', () => {
        'use strict';

        document.addEventListener('keyup', event => {
          let directions = {
            'w': 1,
            'a': 0,
            'd': 3,
            's': 2
          }
          const key = event.key.toLowerCase()
          // we are only interested in alphanumeric keys
          if (Object.keys(directions).indexOf(key) === -1) return
          let cellToMove = this.$store.getters.getPlayerRange[directions[key]]
          try {
            document.querySelector('#cell-' + cellToMove).click()
            // eslint-disable-next-line no-empty
          } catch (e){
          }
        })
      })
    },
    nextRoom: function () {
      let json = require(`@/gamedata/Rooms/${this.$store.getters.getRoom + 1}.json`)
      this.$store.dispatch('setRoom', json)
    },
    buildMap: function () {
      /* TODO pasar a un js encargado de generar mapas */
      let free = []
      let json = {
        "monsters": {},
        "map": {}
      }
      let width = 17
      let height = 15
      /** hay tema con valores pares*/
      /* generate map */
      let maze = this.createMaze(width, height)
      let letters = new Array(width).fill( 1 ).map( ( _, i ) => String.fromCharCode( 65 + i ) )
      for (let i = 0; i < height; i++) {
        json.map[i + 1] = {}
        letters.forEach((letter, index) => {
          let terrain = maze[i][index].toString()
          let isBorder = index === 0 || index === width - 1 || i === 0 || i === height - 1
          if (terrain === '1' && Math.random() < 0.4 && !isBorder) { /* remove random walls */
            terrain = '0'
          }
          json.map[i + 1][letter] = terrain
          if (terrain === '0') { free.push(`${i + 1}${letter}`) }
        })
      }

      /* Set monsters */
      let monstersList = ['goblin', 'golem', 'gorgon', 'imp']
      for (let i = 0; i < height + width; i++) {
        let position = free[Math.floor(Math.random() * free.length)]
        /* remove the free */
        let index = free.indexOf(position)
        free.splice(index, 1)
        json.monsters[position] = monstersList[Math.floor(Math.random() * monstersList.length)]
      }

      /* Set player */
      let position = free[Math.floor(Math.random() * free.length)]
      /* remove the free */
      let index = free.indexOf(position)
      free.splice(index, 1)
      json.player_init = position

      /* Set portal */
      position = free[Math.floor(Math.random() * free.length)]
      /* remove the free */
      json.portal = position
      // eslint-disable-next-line no-useless-escape
      let cell = position.match(/[\d\.]+|\D+/g)
      json.map[cell[0]][cell[1]] = 'P'

      /* Set theme */
      let themes = ['crypt', 'default', 'forest', 'industrial', 'library', 'snakepit']
      json['theme'] = themes[Math.floor(Math.random() * themes.length)]
      this.$store.dispatch('setRoom', json)
    }
  },
  created() {
    this.setKeyListener()
    this.buildMap()
  }
}
</script>

<style scoped>

</style>
