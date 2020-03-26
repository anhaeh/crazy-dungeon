<template>
  <div class="npc" :class="[$options.name, {'in-range': playerInRange}, {'selected': selected}]">
    <img :src="image" @click="click">
  </div>
</template>

<script>
import AbstractNpc from './AbstractNpc'

export default {
  name: "merchant",
  mixins: [
    AbstractNpc
  ],
  methods: {
    click: function() {
      if (this.playerInRange) {
        this.$store.commit('setMonsterSelected', null)
        this.$store.commit('setDialogMerchant', true)
      }
    }
  }
}
</script>

<style scoped lang="sass">
  @import "AbstractNpc"
</style>
