<template>
  <bottom-dialog
      class="item-dialog"
      v-if="show"
      @close="$emit('close')"
  >
    <img slot="image" :src="image" class="bottomDialog__itemImg">
    <div slot="title">{{ current.item.name }}</div>
    <div slot="legend">{{ current.item.legend }}</div>
    <div slot="text">{{ current.item.description }}</div>
    <template slot="actions">
      <div class="bottomDialog__actionsBtn"
           v-if="current.item.type === 'potion'"
           @click="consume"
      >
        Consume
      </div>
      <div class="bottomDialog__actionsBtn"
           @click="discard"
      >
        Discard
      </div>
    </template>
  </bottom-dialog>
</template>

<script>
import BottomDialog from './BottomDialog'

export default {
  name: 'ItemDialog',
  components: {
    BottomDialog
  },
  computed: {
    current: function () {
      return this.$store.getters.getDialog.entity
    },
    image: function () {
      return require('@/assets/items/' + this.current.item.image)
    },
    show: function () {
      return this.$store.getters.getDialog.show &&
          this.$store.getters.getDialog.entity &&
          this.$store.getters.getDialog.entity.type === 'item'
    },
  },
  methods: {
    discard: function () {
      this.$store.commit('deleteItemInventory', this.current.index)
      this.$emit('discard')
      this.$store.commit('clickDialog')
      this.$store.commit('pushLog', `Player discarded ${this.current.item.name}`)
    },
    consume: function () {
      this.$store.commit('restoreLife', { counter: this.current.item.counter, itemId: this.current.index })
      this.$emit('close')
      this.$store.commit('clickDialog')
    }
  },
  beforeDestroy() {
    this.$store.commit('setDialogShow', false)
  }
}
</script>

<style lang="sass">
.item-dialog
  position: relative !important
</style>
