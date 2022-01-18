<template>
  <div class="minimap">
    <div class="row" v-for="(row, idx) in map" :key="'row' + idx">
      <div v-for="(cell, cellId) in row"
           :class="[
               'cell',
               cell === 1 ? 'wall' : 'free',
               {
                 'portal': cell === 'P',
                 '--player': playerPosition === `${idx}_${cellId}`,
                 '--fog': enableFog && !discoverCells.includes(`${idx}_${cellId}`),
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
    },
    enableFog: function () {
      return this.$store.getters.getEnableFog
    }
  }
}
</script>

<style scoped lang="sass">
.minimap
  position: fixed
  right: 0
  top: calc(1.5 * var(--tile-cell))
  display: flex
  flex-direction: column
  align-items: flex-end
  .row
    display: flex
    flex-direction: row
    .cell
      width: 5px
      height: 5px
      opacity: 0.6
    .wall
      background: red
    .free
      background: white
    .portal
      background: blue
    .--player
      background: green !important
    .--fog
      background: dimgray
</style>
