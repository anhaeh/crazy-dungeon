<template>
  <div class="item">
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
    isPlayerInCell: {
      immediate: true,
      handler (value) {
        if (value) {
          let items = Object.assign({}, this.$store.getters.getItems)
          delete items[this.cellId]
          this.$store.commit('setItems', items)
          this.$store.commit('addItemToInventory', this.item)
        }
      }
    }
  },
  data () {
    return {
      item: ItemsData[this.name]
    }
  },
  methods: {
  },
  computed: {
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
