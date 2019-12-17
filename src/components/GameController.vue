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
          this.nextRoom()
        } else {
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
      }
    }
  },
  computed: {
    ...mapGetters(['getPlayerPosition', "getPortalPosition"])
  },
  methods: {
    nextRoom: function () {

      let json = require(`@/gamedata/Rooms/${this.$store.getters.getRoom + 1}.json`)
      this.$store.dispatch('setRoom', json)
    }
  },
  created() {
    this.nextRoom()
  }
}
</script>

<style scoped>

</style>
