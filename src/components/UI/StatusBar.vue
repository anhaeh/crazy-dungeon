<template>
  <div class="statusBar" :class="modifier">
    <div class="statusCurrent" :style="style"></div>
    <div class="legend"><span>{{ actual }}/{{ total }}</span></div>
    <!-- <div class="legend">{{ actual }}/{{ total }}</div> -->
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
  background-size: 100% 100%
  image-rendering: pixelated
  &[title="Health"].--monster
    right: calc(2 * var(--tile-cell))
    left: initial
    .statusCurrent
      margin: auto 0 auto auto
      background-position: right center
    .legend
      text-align: right
      right: initial
      left: calc(8 * var(--pixel-unit))
  &[title="Experience"]
    top: calc(var(--tile-cell) * 0.75)
    position: fixed
    left: calc(2 * var(--tile-cell))
    width: calc(6 * var(--tile-cell))
    height: calc(var(--tile-cell) / 4)
    background-image: url("../../assets/ui/dungeonUI__statsFrameExp.png") !important
    .statusCurrent
      background-image: url("../../assets/ui/dungeonUI__statsBarExp.png") !important
      position: absolute
      height: 100%
      background-size: calc(6 * var(--tile-cell)) 100%
  &[title="Health"]
    height: calc(var(--tile-cell) * 0.75)
    width: calc(6 * var(--tile-cell))
    left: calc(2 * var(--tile-cell))
    top: 0
    position: fixed
    box-sizing: border-box
    .legend
      font-size: 2rem
      text-shadow: 3px 3px 0 black
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
  right: calc(8 * var(--pixel-unit))
  top: 0
  bottom: 0
  margin: auto
  text-shadow: 1px 2px 0 black
  z-index: 3
  display: flex
  align-items: center
  justify-content: center
  span
    color: #443f3f

@media (min-width: 900px)
  .statusBar.--monster .legend
    text-align: right
    right: 10px
  .statusCurrent
    background-size: calc(6 * var(--tile-cell)) calc(0.75 * var(--tile-cell))
    background-position: left top
</style>
