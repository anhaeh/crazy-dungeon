<template>
  <div>
    <!-- TODO ARMAR BIEN EL MODAL DE PERDER-->
    <div v-if="isGameOver" class="game-over">GAME OVER</div>
    <GameController></GameController>
    <Map></Map>
    <TopBar></TopBar>
    <DungeonUI></DungeonUI>
  </div>
</template>

<script>
import GameController from "@/components/GameController"
import Map from "@/components/Map/Map"
import DungeonUI from "@/components/UI/DungeonUI"
import TopBar from "@/components/UI/TopBar"

export default {
  name: "Room",
  components: {
    TopBar,
    GameController,
    Map,
    DungeonUI
  },
  computed: {
    isGameOver: function () {
      return this.$store.getters.getPlayer.isDead
    }
  }
};
</script>

<style scoped lang="sass">
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
