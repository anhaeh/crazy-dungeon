<template>
  <div class="statusBar" :class="modifier">
    <div class="statusCurrent" :style="style"></div>
    <div class="legend">{{ actual }}/{{ total }}</div>
  </div>
</template>

<script>
export default {
  name: "StatusBar",
  props: {
    actual: {
      required: true,
      type: Number
    },
    total: {
      required: true,
      type: Number
    },
    modifier: {
      required: false,
      default: '',
      type: String
    },
    color: {
      required: false,
      default: 'red',
      type: String
    }
  },
  computed: {
    style: function() {
      let percent = (this.actual * 100) / this.total
      let image = require(`../../assets/ui/${this.color}_status_bar.png`)
      return {
        'width': `${percent}%`,
        'background-image': `url(${image})`
      }
    }
  }
}
</script>

<style scoped lang="sass">
.statusBar
  width: calc(3.5 * var(--tile-cell))
  height: calc(0.5 * var(--tile-cell))
  position: relative
  background-image: url('../../assets/ui/status_bar.png')
  background-size: contain
  image-rendering: pixelated
  &.--monster
    .statusCurrent
      margin: auto
      margin-right: 0
      background-position: right center
    .legend
      text-align: right
      right: calc(4 * var(--pixel-unit))
.statusCurrent
  left: 0
  top: 0
  height: 100%
  background-size: calc(3.5 * var(--tile-cell)) calc(0.5 * var(--tile-cell))
  background-position: left center
  image-rendering: pixelated
  z-index: 2
  width: 100%
.legend
  position: absolute
  left: calc(4 * var(--pixel-unit))
  top: calc(2 * var(--pixel-unit))
  text-shadow: 1px 2px 0 black
  text-align: center
  z-index: 3
</style>
