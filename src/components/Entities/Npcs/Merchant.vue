<template>
  <div class="npc" :class="$options.name">
    <img :src="image" alt="" @click="click">
  </div>
</template>

<script>
import AbstractNpc from './AbstractNpc'

export default AbstractNpc.extend({
  name: "merchant",
  methods: {
    click: function() {
      if (this.playerInRange) {
        this.$store.commit('setMonsterSelected', null)
        this.$store.commit('setDialogMerchant', true)
      }
    }
  }
})
</script>

<style scoped lang="sass">
  @import "abstractNpc"
</style>
