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
.merchant
  position: relative
  padding: 4px
  img
    width: 100%
    height: 100%
    object-fit: contain
    filter: drop-shadow(0px 0px 3px black)
</style>
