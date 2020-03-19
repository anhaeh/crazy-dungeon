<template>
  <bottom-dialog
      class="item-dialog"
      @close="$emit('close')"
  >
    <img slot="image" :src="image" class="bottomDialog__itemImg">
    <div slot="title">{{ obj.item.name }}</div>
    <div slot="legend">{{ obj.item.legend }}</div>
    <div slot="text">{{ obj.item.description }}</div>
    <template slot="actions">
      <div class="bottomDialog__actionsBtn"
           v-if="obj.item.type === 'potion'"
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
  props: {
    obj: {
      required: true
    }
  },
  components: {
    BottomDialog
  },
  computed: {
    image: function () {
      return require('@/assets/items/' + this.obj.item.image)
    }
  },
  methods: {
    discard: function () {
      this.$store.commit('deleteItemInventory', this.obj.index)
      this.$emit('discard')
      this.$store.commit('pushLog', `Player discarded ${this.obj.item.name}`)
    },
    consume: function () {
      this.$store.commit('restoreLife', { counter: this.obj.item.counter, itemId: this.obj.index })
      this.$emit('close')
    }
  }
}
</script>

<style lang="sass">
.item-dialog
  position: relative !important
@media screen and (min-width: 900px)
  .item-dialog
    position: fixed !important
</style>
