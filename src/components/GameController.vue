<template>
  <div></div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "GameController",
  data () {
    return {
      actualRoom: 0
    }
  },
  watch: {
    getPlayerPosition: {
      immediate: true,
      handler() {
        // eslint-disable-next-line no-useless-escape
        let player = this.getPlayerPosition.match(/[\d\.]+|\D+/g)
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
    },
    getMonsters: {
      immediate: true,
      handler () {
        if (!Object.keys(this.getMonsters).length) {
          this.nextRoom()
        }
      }
    }
  },
  computed: {
    ...mapGetters(['getPlayerPosition', "getMonsters"])
  },
  methods: {
    nextRoom: function () {
      this.actualRoom += 1
      let json = require(`@/gamedata/Rooms/${this.actualRoom}.json`)
      this.$store.dispatch('setRoom', json)
    }
  }
}
</script>

<style scoped>

</style>
