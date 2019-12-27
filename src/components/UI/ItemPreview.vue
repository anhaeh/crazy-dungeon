<template>
  <div class="itemPreview">
    <div class="legend">
      {{ entity.item.name }}
      {{ entity.item.description }}
    </div>
    <div class="itemImage">
      <img :src="image">
    </div>
  </div>
</template>

<script>
export default {
  props: ['entity'],
  name: "ItemPreview",
  computed: {
    image: function () {
      return require('@/assets/items/' + this.entity.item.image)
    }
  }
}
</script>

<style scoped lang="sass">
  .itemImage
    width: calc(1.5 * var(--tile-cell))
    height: calc(1.5 * var(--tile-cell))
    background: url("../../assets/ui/portraitFrame.png")
    padding: calc(2.5 * var(--pixel-unit))
    image-rendering: pixelated
    background-size: contain
    box-sizing: border-box
    position: absolute
    right: 0
    img
      width: 100%
      height: 100%
  .legend
    right: calc(1.5 * var(--tile-cell))
    text-align: end
    padding: 5px
    position: absolute
</style>
