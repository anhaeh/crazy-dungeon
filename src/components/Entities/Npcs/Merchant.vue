<template>
  <div class="npc" :class="$options.name">
    <img :src="image" alt="" @click="click">
  </div>
</template>

<script>
export default {
  name: "merchant",
  props: {
    cellId: { required: true }
  },
  methods: {
    click: function() {
      if (this.playerInRange) {
        this.$store.commit('setMonsterSelected', null)
        this.$store.commit('setDialogMerchant', true)
      }
    }
  },
  computed: {
    image: function () {
      return require(`@/assets/npcs/${this.$options.name}.png`)
    },
    playerInRange: function () {
      return this.$store.getters.getPlayerRange.indexOf(this.cellId) !== -1
    }
  }
}
</script>

<style scoped lang="sass">
  @import "./npc"
</style>
