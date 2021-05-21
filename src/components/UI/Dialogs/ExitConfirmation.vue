<template>
  <bottom-dialog
    @close="close"
  >
    <div slot="title">Warning</div>
    <div slot="legend"></div>
    <div slot="text">Are you sure you want to quit?</div>
    <div slot="actions">
      <div class="btn --green"
           @click="quit"
      >
        Confirm
      </div>
    </div>
  </bottom-dialog>
</template>

<script>
import BottomDialog from './BottomDialog'

export default {
  name: 'ExitConfirmation',
  components: {
    BottomDialog
  },
  methods: {
    quit: function () {
      this.$router.push({name: 'main-menu'})
    },
    close: function () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="sass">
</style>
