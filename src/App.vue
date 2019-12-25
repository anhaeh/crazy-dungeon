<template>
  <div id="app" class="unselectable">
    <!-- TODO ARMAR BIEN EL MODAL DE PERDER-->
    <div v-if="isGameOver" class="game-over">GAME OVER</div>
    <GameController></GameController>
    <DungeonUI></DungeonUI>
    <Map></Map>
    <Sidebar></Sidebar>
    <mobileHero></mobileHero>
  </div>
</template>

<script>
import GameController from "./components/GameController"
import Map from "./components/Map/Map"
import Sidebar from "./components/Sidebar/Sidebar"
import DungeonUI from "./components/UI/DungeonUI"
import mobileHero from "./components/UI/mobileHero"


export default {
  name: "App",
  components: {
    GameController,
    Map,
    Sidebar,
    DungeonUI,
    mobileHero
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
  --pixel-unit: 0.892vw // based on 16 pixels inside 1 tile-cell 
  // src: url('assets/font/depixelhalbfett.otf')
  // src: url('assets/font/OpenSansPXBold.ttf')
@font-face
  font-family: 'OpenSansPXBold';
  src: url('assets/font/OpenSansPXBold.ttf') format('truetype')
  font-weight: normal
  font-style: normal

#app
  font-family: 'OpenSansPXBold', sans-serif
  // -webkit-font-smoothing: antialiased
  // -moz-osx-font-smoothing: grayscale
  // text-align: center
  // color: #d3d3d3
  // margin: 0

body
  margin: 0
  width: 100%
  justify-content: center
  height: 100%
  display: grid
  background: black
  // font-family: 'OpenSansPXBold'
  line-height: 14px
  font-size: 14px
#app
  display: flex
  overflow: hidden
  // font-family: 'DePixel'
  img
    image-rendering: pixelated
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
  body
    width: calc(100% - 300px)
</style>
