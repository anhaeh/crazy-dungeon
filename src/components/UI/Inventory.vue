<template>
  <div v-if="show" class="inventory">
    <div v-for="(item, index) in getItems"
         :key="'item' + index"
         :id="'item' + index"
         class="inventory__slot"
         :class="{'--selected': index === selected}"
    >
      <img v-if="item !== undefined" :src="image(item)" @click="click(item, index)">
    </div>
    <item-dialog
        @discard="selected = null"
        @close="close"
    ></item-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ItemDialog from './Dialogs/ItemDialog'

export default {
  name: "Inventory",
  components: {
    ItemDialog
  },
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
    ...mapGetters([
        'getInventory'
    ]),
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
        this.$store.commit('setDialogShow', false)
      } else {
        this.selected = index
        this.$store.commit('setDialog', {
          type: 'item',
          item: item,
          index: index
        })
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
  background-image: url("../../assets/ui/dungeonUI__background.png")
  background-size: 100% 100%
  background-position: bottom left
  top: 0
  padding: calc(2 * var(--tile-cell)) calc(.5 * var(--tile-cell)) calc(.5 * var(--tile-cell))
  box-sizing: border-box
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
  // .item-preview
  //   width: calc(1.5 * var(--tile-cell))
  //   height: calc(1.5 * var(--tile-cell))
  //   background: url("../../assets/ui/portraitFrame.png")
  //   padding: calc(2.5 * var(--pixel-unit))
  //   image-rendering: pixelated
  //   background-size: contain
  //   box-sizing: border-box

</style>
