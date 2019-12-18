<template>
  <div id="app" class="unselectable">
    <GameController></GameController>
    <div>Health: {{ playerHealth }}</div>
    <div class="map" v-if="map">
      <div class="row" v-for="row in Object.keys(map)" :key="'row' + row">
        <Cell
          v-for="cellKey in Object.keys(map[row])"
          :key="row + cellKey"
          :id="row + cellKey"
          :type="map[row][cellKey]"
        ></Cell>
      </div>
    </div>
  </div>
</template>

<script>
import Cell from "./components/Map/Cell"
import GameController from "./components/GameController"

export default {
  name: "App",
  components: {
    Cell,
    GameController
  },
  computed: {
    playerHealth: function () {
      return this.$store.getters.getPlayerHealth
    },
    map: function () {
      return this.$store.getters.getMap
    }
  }
}
</script>

<style lang="sass">
  .unselectable
    -webkit-user-select: none
    -ms-user-select: none
    user-select: none
  .fadeNav-enter-active, .fadeNav-leave-active
    transition: opacity .2s, transform .2s
  .fadeNav-enter, .fadeNav-leave-to
    opacity: 0
    transform: translateX(5vh)
  .fade-enter-active, .fade-leave-active
    transition: opacity .2s !important
  .fade-enter, .fade-leave-to
    opacity: 0 !important
  .row
    display: flex
</style>
