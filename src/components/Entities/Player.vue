<template>
  <div class="player">
    <img :src="image" alt="">
  </div>
</template>

<script>
export default {
  name: "Player",
  computed: {
    image: function () {
      return require('@/assets/warrior.png')
    }
  }
}
</script>

<style scoped lang="sass">
  .player
    position: relative
    padding: 2px
  .player img
    width: 100%
    height: 100%
    object-fit: contain
</style>
