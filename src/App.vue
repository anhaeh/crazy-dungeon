<template>
  <div id="app" class="unselectable">
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
  }
}
</script>

<style lang="sass">
  body
    margin: 0
  #app
    display: flex
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
</style>
