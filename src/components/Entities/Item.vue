<template>
  <div class="item">
    <img :src="image" alt="">
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ItemsData from '@/gamedata/Items.json'

export default {
  name: "Item",
  props: {
    cellId: { required: true },
    name: { required: true }
  },
  watch: {
    isPlayerInCell: {
      immediate: true,
      handler (value) {
        if (value) {
          if(this.inventoryIsFull) {
            this.$store.commit('pushLog', 'Inventory is full')
          } else {
            let items = Object.assign({}, this.$store.getters.getItems)
            delete items[this.cellId]
            this.$store.commit('setItems', items)
            this.$store.commit('addItemToInventory', this.item)
            this.$store.commit('pushLog', 'Player picked ' + this.item.name)
          }
        }
      }
    }
  },
  data () {
    return {
      item: ItemsData[this.name]
    }
  },
  computed: {
    ...mapGetters([
      'getInventory'
    ]),
    inventoryIsFull: function() {
      return this.getInventory.maxSize === this.getInventory.items.length
    },
    image: function () {
      return require('@/assets/items/' + this.item.image)
    },
    isPlayerInCell: function () {
      return this.$store.getters.getPlayerPosition === this.cellId
    }
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
</style>
