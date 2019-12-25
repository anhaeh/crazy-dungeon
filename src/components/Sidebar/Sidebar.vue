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
}
</script>

<style scoped lang="sass">
  .sidebar
    background: #5d340c
    width: 100%
    height: 50%
    position: fixed
    bottom: 0
    color: white
</style>
