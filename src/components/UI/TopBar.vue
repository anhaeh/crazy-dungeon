<template>
  <div class="topBar">
    <player-stats></player-stats>
    <div class="preview">
      <component v-if="getPreview"
                 :is="componentToPreview"
                 :entity="getPreview"
      ></component>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import monsterPreview from './MonsterPreview'
import itemPreview from './ItemPreview'
import playerStats from './PlayerStats'


export default {
  name: "TopBar",
  components: {
    monsterPreview,
    itemPreview,
    playerStats
  },
  computed: {
    ...mapGetters(["getPreview"]),
    componentToPreview: function () {
      return this.getPreview ? this.getPreview.entity : null
    }
  }
};
</script>

<style scoped lang="sass">
.topBar
  image-rendering: pixelated
  background-image: url("../../assets/ui/dungeonUI__background.png")
  background-size: cover
  background-position: top left
  width: 100%
  height: calc(1.5 * var(--tile-cell))
  position: fixed
  top: 0
  color: white
  display: flex
  align-items: flex-start
  justify-content: flex-start
  z-index: 9
</style>
