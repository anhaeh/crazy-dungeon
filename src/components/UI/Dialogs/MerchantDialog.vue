<template>
  <bottom-dialog
      v-if="show"
  >
    <div slot="title">Merchant</div>
    <div slot="legend"></div>
    <div slot="text">Hello friend. Do you need something?</div>
    <div slot="actions">
      <div class="bottomDialog__actionsBtn">Buy</div>
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
  computed: {
    show: function () {
      return this.$store.getters.getDialog.show &&
          this.$store.getters.getDialog.entity &&
          this.$store.getters.getDialog.entity.type === 'merchant'
    },
  },
  methods: {
  }
}
</script>

<style lang="sass">
</style>
