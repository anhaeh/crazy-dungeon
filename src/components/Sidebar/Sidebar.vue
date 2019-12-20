<template>
  <div class="sidebar">
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

export default {
  name: "Sidebar",
  components: {
    monsterPreview,
    itemPreview
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
    background: blue
    height: 100vh
    width: 300px
    position: fixed
    right: 0
    border-left: black
    border-left-style: solid
  .preview
    height: 300px
    bottom: 0
    width: 100%
    background: white
    position: absolute
</style>
