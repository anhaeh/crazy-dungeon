<template>
  <div id="app" class="unselectable">
    <!-- TODO ARMAR BIEN EL MODAL DE PERDER-->
    <div v-if="isGameOver" class="game-over">GAME OVER</div>
    <GameController></GameController>
    <Map></Map>
    <Sidebar></Sidebar>
  </div>
</template>

<script>
import GameController from "./components/GameController"
import Map from "./components/Map/Map"
import Sidebar from "./components/Sidebar/Sidebar"


export default {
  name: "App",
  components: {
    GameController,
    Map,
    Sidebar
  },
  computed: {
    isGameOver: function () {
      return this.$store.getters.getPlayer.isDead
    }
  }
}
</script>

<style lang="sass">
  body
    margin: 0
    width: 100%
    justify-content: center
    height: 100%
    background: black
  #app
    display: flex
    align-items: center
    justify-content: center
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
  .game-over
    position: fixed
    background: white
    width: 100vh
    height: 100vh
    z-index: 10
    display: flex
    align-items: center
    justify-content: center
    font-size: 30px
</style>
