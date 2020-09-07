<template>
  <div class="statusBar" :class="modifier">
    <div class="statusBar__legend --border3">
      <!-- <img :src="'@../assets/ui/' + icon + '.png'" alt=""> -->
      <img :src="require('../../assets/ui/health.png')" alt="">
      <span>{{ actual }}</span>
    </div>
    <div class="statusBar__frame --border3">
      <div class="statusBar__current" :style="style"></div>
    </div>
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
    // icon: {
    //   required: false,
    //   default: 'health',
    //   type: String
    // }
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
  width: var(--tile-400)
  height: var(--tile-75)
  position: relative
  display: flex
  align-items: center
  &.--vertical
    top: var(--tile-525)
    flex-direction: row-reverse
    position: fixed
    .statusBar__legend
      img, span
       transform: rotate(270deg)
      span
        width: 100%
        text-align: center
      img
        min-width: var(--tile-50)
    &.--player
      transform-origin: bottom left
      top: var(--tile-50)
      transform: rotate(90deg)
      left: 0
      .statusBar__frame
        transform: scaleX(-1)
    &.--monster
      transform: rotate(90deg)
      transform-origin: right top
      right: 0
  &.--monster
    right: 0
    .statusBar__current
      margin: auto 0 auto auto
      background-position: right center
.statusBar__current
  height: 100%
  background-size: var(--tile-325) var(--tile-50)
  background-position: left center
  z-index: 2
  width: 100%
.statusBar__legend
  display: flex
  align-items: center
  min-width: var(--tile-125)
  height: 100%
  justify-content: space-between
  img
    height: 100%
.statusBar__frame
  height: 100%
  width: 100%
@media (min-width: 900px)
  .statusBar.--monster .legend
    text-align: right
    right: 10px
</style>
