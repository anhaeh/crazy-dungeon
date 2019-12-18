<template>
  <div></div>
</template>

<script>
  import {mapGetters} from 'vuex'

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
          let cells = []
          for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
              let row = parseInt(player[0]) + i
              let letter = String.fromCharCode(player[1].charCodeAt() + j)
              cells.push(`${row}${letter}`)
            }
          }
   
          this.$store.commit('setPlayerRange', cells)
        }
      }
    }
  },
  computed: {
    ...mapGetters(['getPlayerPosition', "getPortalPosition"])
  },
  methods: {
    nextRoom: function () {
      let json = require(`@/gamedata/Rooms/${this.$store.getters.getRoom + 1}.json`)
      this.$store.dispatch('setRoom', jso
    },
    buildMap: function () {
      /* TODO pasar a un js */
      let free = []
      let json = {
        "monsters": {},
        "map": {}
      }
      /* generate map */
      let letters = 'ABCDEFGHIJKLMNO'
      for (let i = 1; i < 15; i++) {
        json.map[i] = {}
        for (let j = 0; j < 15; j++){
          let terrain = Math.floor(Math.random() * 50) < 40 ? '0' : '1'
          json.map[i][letters[j]] = terrain
          if (terrain === '0') { free.push(`${i}${letters[j]}`) }
        }
      }
      /* Set monsters */
      let monstersList = ['goblin', 'golem', 'gorgon']
      for (let i = 1; i < 20; i++) {
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
    this.buildMap()
  }
}
</script>

<style scoped>

</style>
