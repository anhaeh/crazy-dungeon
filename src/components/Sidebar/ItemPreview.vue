<template>
  <div>
    <img :src="image">
    Item: {{ entity.item.name }}
    Description: {{ entity.item.description }}
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
  img
    width: 50px
    height: auto
</style>
