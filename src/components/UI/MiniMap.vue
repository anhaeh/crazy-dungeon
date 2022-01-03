<template>
  <div class="minimap">
    <div class="row" v-for="(row, idx) in map" :key="'row' + idx">
      <div v-for="(cell, cellId) in row"
           :class="[
               'cell',
               cell === 1 ? 'wall' : 'free',
               {
                 '--player': playerPosition === `${idx}_${cellId}`,
                 '--fog': !discoverCells.includes(`${idx}_${cellId}`)
               }
           ]"
           :key="'cell' + idx + cellId"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MiniMap",
  computed: {
    map: function () {
      return this.$store.getters.getMap
    },
    playerPosition: function () {
      return this.$store.getters.getPlayerPosition
    },
    discoverCells: function () {
      return this.$store.getters.getMapDiscover
    }
  }
}
</script>

<style scoped lang="sass">
.minimap
  position: fixed
  z-index: 99999999
  height: calc(100% - (4 * var(--tile-cell)))
  top: 0
  width: 100%
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  .row
    display: flex
    flex-direction: row
    .cell
      width: 7px
      height: 7px
      opacity: 0.6
    .wall
      background: red
    .free
      background: white
    .--player
      background: green !important
    .--fog
      background: dimgray
</style>
