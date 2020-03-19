<template>
  <div class="dungeon">
    <GameOver></GameOver>
    <GameController></GameController>
    <Map></Map>
    <TopBar></TopBar>
    <MobileUI v-if="isMobile"></MobileUI>
    <DesktopUI v-else></DesktopUI>
  </div>
</template>

<script>
import GameController from "@/components/GameController"
import GameOver from "@/components/GameOver"
import Map from "@/components/Map/Map"
import MobileUI from "@/components/UI/MobileUI"
import TopBar from "@/components/UI/TopBar"
import DesktopUI from "@/components/UI/DesktopUI"

export default {
  name: "Dungeon",
  inject: ['isMobile'],
  props: {
    className: {
      required: true,
      type: String
    }
  },
  components: {
    TopBar,
    GameController,
    Map,
    MobileUI,
    GameOver,
    DesktopUI
  },
  created() {
    this.$store.commit('setClassSelected', this.className)
  }
}
</script>

<style scoped lang="sass">
</style>
