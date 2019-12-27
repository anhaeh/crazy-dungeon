<template>
  <div v-if="getShowInventory" class="inventory">
    <div  class="item-preview"
          v-for="(item, index) in getInventory"
         :key="'item' + index">
      <img :src="image(item)">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "Inventory",
  computed: {
    ...mapGetters([
        'getInventory',
        'getShowInventory'
    ]),
  },
  methods: {
    image: function (item) {
      return require('@/assets/items/' + item.image)
    }
  }
}
</script>

<style scoped lang="sass">
.inventory
  position: fixed
  height: 100vh
  width: 100vh
  color: white
  background-color: black
  display: flex
  top: 0
  padding-top: calc(2 * var(--tile-cell))
  .item-preview
    width: calc(1.5 * var(--tile-cell))
    height: calc(1.5 * var(--tile-cell))
    background: url("../../assets/ui/portraitFrame.png")
    padding: calc(2.5 * var(--pixel-unit))
    image-rendering: pixelated
    background-size: contain
    box-sizing: border-box
    img
      width: 100%
      height: 100%
</style>