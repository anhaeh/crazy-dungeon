<template>
  <div class="item" :class="{ 'can-pick': canPick }">
    <img :src="image" alt="">
  </div>
</template>

<script>
import ItemsData from '@/gamedata/Items.json'

export default {
  name: "Item",
  props: {
    cellId: { required: true },
    name: { required: true }
  },
  watch: {
    actualRoom: {
      immediate: true,
      handler () {
        this.item = ItemsData[this.name]
      }
    }
  },
  data () {
    return {
      item: null
    }
  },
  methods: {
  },
  computed: {
    image: function () {
      return require('@/assets/items/' + this.item.image)
    },
    actualRoom: function () {
      return this.$store.getters.getRoom
    },
    canPick: function () {
      return this.$store.getters.getPlayerViewport.indexOf(this.cellId) !== -1
    },
  }
}
</script>

<style scoped lang="sass">
  .item
    position: relative
    padding: 4px
  .item img
    width: 100%
    height: 100%
    object-fit: contain
  .can-pick
    cursor: pointer
</style>
