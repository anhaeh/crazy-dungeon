<template>
  <div class="sidebar">
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
  name: "Sidebar",
  components: {
    monsterPreview,
    itemPreview,
    playerStats
  },
  computed: {
    ...mapGetters(['getPlayerHealth', "getPreview"]),
    componentToPreview: function () {
      return this.getPreview ? this.getPreview.entity : null
    }
  }
};
</script>

<style scoped lang="sass">
.sidebar
  background: transparent
  width: 100%
  height: calc(1.5 * var(--tile-cell))
  position: fixed
  top: 0
  color: white
  display: flex
  align-items: flex-start
  justify-content: flex-start
  z-index: 100
.playerStats

</style>
