<template>
  <div class="player">
    <div class="player__equip">
      <img class="player__equipHead" src="../../assets/items/armor/armor_h_01.png" alt="">
      <img class="player__equipBody" src="../../assets/items/armor/armor_b_01.png" alt="">
      <div class="player__equipLegs"></div>
      <div class="player__equipLeft"></div>
      <div class="player__equipRight"></div>
    </div>
    <div class="player__charset">
      <img class="player__hair" src="../../assets/heroes/human__hair.png" alt="">
      <img class="player__body" :src="image" alt="">
    </div>
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
};
</script>

<style scoped lang="sass">
.player
  position: relative
  height: 100%
  width: 100%
.player__charset
  width: 100%
  height: 100%
  position: relative
  z-index: 1
.player__equip
  position: absolute
  left: 0
  bottom: 0
  width: 100%
  height: 100%
  z-index: 2  
.player__equipHead, .player__equipBody, .player__hair, .player__body
  position: absolute
  height: 100%
  width: 100%
  left: 0
  bottom: 0
.player__hair
  z-index: 3
</style>
