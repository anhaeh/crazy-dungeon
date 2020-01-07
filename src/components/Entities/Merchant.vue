<template>
  <div class="merchant"
  >
    <img :src="image" alt="" @click="click">
    <merchant-dialog></merchant-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import merchantDialog from '@/components/UI/Dialogs/MerchantDialog'

export default {
  name: "Merchant",
  components: {
    merchantDialog
  },
  props: {
    cellId: { required: true }
  },
  methods: {
    click: function() {
      if (this.playerInRange) {
        this.$store.commit('setDialog', {
          type: 'merchant',
        })
      }
    }
  },
  computed: {
    ...mapGetters([
      'getPlayerRange',
      'getPlayer',
    ]),
    image: function () {
      return require('@/assets/npcs/merchant_01.png')
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
.merchant img
  width: 100%
  height: 100%
  object-fit: contain
</style>
