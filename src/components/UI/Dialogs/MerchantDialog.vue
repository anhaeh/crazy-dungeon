<template>
  <bottom-dialog
    @close="close"
  >
    <div slot="title">Merchant</div>
    <div slot="legend"></div>
    <div slot="text">Hello friend. Do you need something?</div>
    <div slot="actions">
    </div>
  </bottom-dialog>
</template>}

<script>
import BottomDialog from './BottomDialog'

export default {
  name: 'MerchantDialog',
  components: {
    BottomDialog
  },
  methods: {
    close: function () {
      this.$store.commit('setDialogMerchant', false)
      this.$emit('close')
    }
  }
}
</script>

<style lang="sass">
</style>
