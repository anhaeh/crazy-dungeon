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
      return require(`@/assets/heroes/${heroClass}.png`)
    }
  },
  methods: {
    scrollToPlayer: function () {
      const element = document.querySelector('.player')
      const elementRect = element.getBoundingClientRect()
      const absoluteElementTop = elementRect.top + window.pageYOffset
      const middle = absoluteElementTop - (window.innerHeight / 2)
      window.scrollTo(0, middle)
    }
  },
  mounted() {
    this.$nextTick(() => {
      // The whole view is rendered, so I can safely access or query
      this.scrollToPlayer()
    })
  }
}
</script>

<style scoped lang="sass">
.player
  position: relative
  padding: 2px
.player img
  width: 100%
  height: auto
  object-fit: contain
</style>
