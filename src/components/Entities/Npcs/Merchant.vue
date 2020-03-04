<template>
  <div class="merchant">
    <img :src="image" alt="" @click="click">
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "Merchant",
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
    ...mapGetters([
      'getPlayerRange'
    ]),
    image: function () {
      return require('@/assets/npcs/merchant.png')
    },
    playerInRange: function () {
      return this.getPlayerRange.indexOf(this.cellId) !== -1
    }
  }
}
</script>

<style scoped lang="sass">
  @import "./npc"
</style>
