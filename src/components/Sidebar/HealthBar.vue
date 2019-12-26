<template>
  <div class="healthBar" :class="modifier">
    <div class="life" :style="life"></div>
    <div class="legend-health">{{ actualHealth }}/{{ health }}</div>
  </div>
</template>

<script>
export default {
  name: "HealthBar",
  props: ["actualHealth", "health", "modifier"],
  computed: {
    life: function() {
      let percent = (this.actualHealth * 100) / this.health
      return `width: ${percent}%`
    }
  }
};
</script>

<style scoped lang="sass">
.healthBar
  width: calc(3.5 * var(--tile-cell))
  height: calc(0.5 * var(--tile-cell))
  position: relative
  background-image: url('../../assets/ui/healthbar.png')
  background-size: contain
  image-rendering: pixelated
  &.--monster
    .life
      margin: auto
      margin-right: 0
      background-position: right center
    .legend-health
      text-align: right
      right: calc(4 * var(--pixel-unit))
.life
  left: 0
  top: 0
  height: 100%
  background-image: url('../../assets/ui/healthbar_current.png')
  background-size: calc(3.5 * var(--tile-cell)) calc(0.5 * var(--tile-cell))
  background-position: left center
  image-rendering: pixelated
  z-index: 2
  width: 100%
.legend-health
  position: absolute
  left: calc(4 * var(--pixel-unit))
  top: calc(2 * var(--pixel-unit))
  text-shadow: 1px 2px 0px black
  text-align: center
  z-index: 3
</style>