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
    color: white
    height: 100vh
    width: 300px
    right: 0
    position: fixed
    border-left: white
    border-left-style: solid
    border-width: 1px
  .preview
    background: #1b3b48
    height: 250px
    bottom: 0
    width: 100%
    position: absolute
</style>
