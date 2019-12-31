<template>
  <div v-if="getInventory.show" class="inventory">
    <div class="inventory__slot --selected"></div> 
    <div class="inventory__slot"></div> 
    <div class="inventory__slot"></div> 
    <div class="inventory__slot"></div> 
    <div class="inventory__slot"></div> 
    <div class="inventory__slot"></div>
    <div class="inventory__slot"></div> 
    <div class="inventory__slot"></div> 
    <div class="inventory__slot"></div> 
    <div class="inventory__slot"></div> 
    <div class="inventory__slot"></div> 
    <div class="inventory__slot"></div> 
<!--     <div  class="item-preview"
          v-for="(item, index) in getInventory.items"
         :key="'item' + index">
      <img :src="image(item)">
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "Inventory",
  computed: {
    ...mapGetters([
        'getInventory'
    ]),
  },
  methods: {
    image: function (item) {
      return require('@/assets/items/' + item.image)
    }
  }
};
</script>

<style scoped lang="sass">
.inventory
  display: flex
  flex-wrap: wrap
  align-items: flex-start
  justify-content: flex-start
  z-index: 1
  position: fixed
  height: calc(4px * var(--tile-cell))
  width: 100%
  background-color: black
  top: 0
  padding: calc(2 * var(--tile-cell)) calc(.5 * var(--tile-cell)) calc(.5 * var(--tile-cell))
  box-sizing: border-box
.inventory__slot
  height: var(--tile-cell)
  width: var(--tile-cell)
  background-size: cover
  image-rendering: pixelated
  background-image: url("../../assets/ui/slot.jpg")
  &.--selected
    box-shadow: inset 0 0 0 var(--pixel-unit) yellow
  // .item-preview
  //   width: calc(1.5 * var(--tile-cell))
  //   height: calc(1.5 * var(--tile-cell))
  //   background: url("../../assets/ui/portraitFrame.png")
  //   padding: calc(2.5 * var(--pixel-unit))
  //   image-rendering: pixelated
  //   background-size: contain
  //   box-sizing: border-box
  //   img
  //     width: 100%
  //     height: 100%
</style>
