<template>
  <div>
    <GameOver></GameOver>
    <GameController></GameController>
    <Map></Map>
    <TopBar></TopBar>
    <DungeonUI></DungeonUI>
  </div>
</template>

<script>
import GameController from "@/components/GameController"
import GameOver from "@/components/GameOver"
import Map from "@/components/Map/Map"
import DungeonUI from "@/components/UI/DungeonUI"
import TopBar from "@/components/UI/TopBar"

export default {
  name: "Dungeon",
  components: {
    TopBar,
    GameController,
    Map,
    DungeonUI,
    GameOver
  }
}
</script>

<style scoped lang="sass">
</style>
