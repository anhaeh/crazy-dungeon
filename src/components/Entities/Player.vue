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
      let heroClass = this.$store.getters.getPlayer.class
      return require(`@/assets/heroes/${heroClass}.gif`)
    }
  },
  created () {
    this.$store.commit('setMonsterSelected', null)
    this.$store.commit('setPreview', null)
  }
}
</script>

<style scoped lang="sass">
.player
  position: relative
  padding: 2px
  img
    width: 100%
    height: auto
    object-fit: contain
    filter: drop-shadow(0px 0px 3px black)
</style>
