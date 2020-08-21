<template>
  <div class="topBar" :class="{ '--mobile': isMobile }">
    <player-stats></player-stats>
    <div class="preview">
      <component v-if="getPreview"
                 :is="getPreview.entity"
                 :entity="getPreview"
      ></component>
    </div>
  </div>
</template>

<script>
import monsterPreview from './Previews/MonsterPreview'
import itemPreview from './Previews/ItemPreview'
import npcPreview from './Previews/NpcPreview'
import playerStats from './PlayerStats'


export default {
  name: "TopBar",
  inject: ['isMobile'],
  components: {
    monsterPreview,
    itemPreview,
    playerStats,
    npcPreview
  },
  computed: {
    getPreview: function () {
      return this.$store.getters.getPreview
    }
  }
};
</script>

<style scoped lang="sass">
.topBar
  image-rendering: pixelated
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
.--mobile
  background-image: url("../../assets/ui/dungeonUI__background.png")
@media screen and (min-width: 900px)
  .topBar
    width: 336px
    left: initial
    right: 0
</style>
