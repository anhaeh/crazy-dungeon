<template>
  <div id="app" class="unselectable">
    <!-- TODO ARMAR BIEN EL MODAL DE PERDER-->
    <div v-if="isGameOver" class="game-over">GAME OVER</div>
    <GameController></GameController>
    <Map></Map>
    <Sidebar></Sidebar>
    <DungeonUI></DungeonUI>
  </div>
</template>

<script>
import GameController from "./components/GameController"
import Map from "./components/Map/Map"
import Sidebar from "./components/Sidebar/Sidebar"
import DungeonUI from "./components/UI/DungeonUI"

export default {
  name: "App",
  components: {
    GameController,
    Map,
    DungeonUI,
    Sidebar
  },
  computed: {
    isGameOver: function () {
      return this.$store.getters.getPlayer.isDead
    }
  }
};
</script>

<style lang="sass">
\:root
  --tile-cell: 14.2857vw // based on 7 tiles in viewport width
  --pixel-unit: 0.8928vw // based on 16 pixels inside 1 tile-cell

@font-face
  font-family: 'OpenSansPXBold'
  src: url('assets/font/OpenSansPXBold.ttf') format('truetype')
  font-weight: normal
  font-style: normal
body
  margin: 0
  width: 100%
  justify-content: center
  height: 100%
  background: black
#app
  font-family: 'OpenSansPXBold', sans-serif
  display: flex
  align-items: center
  justify-content: center
  img
    image-rendering: pixelated !important
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
@media (min-width: 900px)
  \:root
    --tile-cell: 5vw
</style>
