<template>
  <div v-if="show" class="inventory" :class="{ '--isMobile': isMobile }">
    <div v-for="(item, index) in getItems"
         :key="'item' + index"
         :id="'item' + index"
         class="inventory__slot"
         :class="{ '--selected': selected && index === selected.index }"
    >
      <img v-if="item !== undefined" :src="image(item)" @click="click(item, index)">
    </div>
    <item-dialog
        v-if="selected"
        :obj="selected"
        @discard="selected = null"
        @close="close"
    ></item-dialog>
  </div>
</template>

<script>
import ItemDialog from './Dialogs/ItemDialog'

export default {
  name: "Inventory",
  components: {
    ItemDialog
  },
  inject: ["isMobile"],
  watch: {
    show: {
      handler(newVal) {
        if (!newVal) {
          this.selected = null
        }
      }
    }
  },
  data () {
    return {
      selected: null,
      items: []
    }
  },
  computed: {
    getInventory: function () {
      return this.$store.getters.getInventory
    },
    show: function () {
      return this.getInventory.show
    },
    getItems: function () {
      let list = []
      for (let i = 0; i < this.getInventory.maxSize; i++) {
        list.push(this.getInventory.items[i])
      }
      return list
    }
  },
  methods: {
    click: function (item, index) {
      if (this.selected === index) {
        this.selected = null
      } else {
        this.selected = {
          item: item,
          index: index
        }
      }
    },
    image: function (item) {
      return require('@/assets/items/' + item.image)
    },
    close: function () {
      this.selected = null
    }
  }
}
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
  image-rendering: pixelated
  background-size: 100% 100%
  background-position: bottom left
  top: 0
  padding: calc(2 * var(--tile-cell)) calc(.5 * var(--tile-cell)) calc(.5 * var(--tile-cell))
  box-sizing: border-box
  &.--isMobile
    background-image: url("../../assets/ui/dungeonUI__background.png")
.inventory__slot
  height: var(--tile-cell)
  width: var(--tile-cell)
  background-size: cover
  image-rendering: pixelated
  background-image: url("../../assets/ui/dungeonUI__skillSlot.png")
  &.--selected
    box-shadow: inset 0 0 0 var(--pixel-unit) #c89c01
  img
    width: 100%
    height: 100%
    object-fit: contain
@media screen and (min-width: 900px)
  .inventory
    position: fixed
    left: calc(50% - 150px)
    bottom: 0
    top: auto
    padding: 0
    width: auto
    z-index: 10
    .inventory__slot
      box-sizing: border-box
      padding: 4px
      &.--selected
        box-shadow: inset 0 0 0 2px #c89c01
      img
        cursor: url('../../assets/ui/cursor__move.png'), auto

</style>
