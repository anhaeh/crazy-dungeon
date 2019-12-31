<template>
  <div class="dungeonUI">
    <div class="dungeonUI__content">
      <div class="player__gold">
        <img :src="imgGold" title="Gold">
        <div class="text">
          {{ $store.getters.getPlayer.gold }}
        </div>
      </div>
      <log-quest></log-quest>
      <div class="skills">
        <div class="skill__slot"></div>
        <div class="skill__slot"></div>
        <div class="skill__slot"></div>
        <div class="skill__slot"></div>
        <div class="skill__slot"></div>
        <div class="skill__slot"></div>
      </div>
      <div class="control">
        <div class="top" @click="move('top')"></div>
        <div class="bottom" @click="move('bottom')"></div>
        <div class="right" @click="move('right')"></div>
        <div class="left" @click="move('left')"></div>
      </div>
    </div>
    <inventory></inventory>
  </div>
</template>

<script>
import Inventory from './Inventory'
import LogQuest from './LogQuest'


export default {
  name: "DungeonUI",
  components: {
    Inventory,
    LogQuest
  },
  computed: {
    imgGold: function () {
      return require(`@/assets/ui/Gold.png`)
    }
  },
  methods: {
    move: function (key) {
      let directions = {
        'top': 1,
        'left': 0,
        'right': 3,
        'bottom': 2
      }
      let cellToMove = this.$store.getters.getPlayerRange[directions[key]]
      try {
        document.querySelector('#cell-' + cellToMove).click()
        document.querySelector('#cell-' + cellToMove + ' .monster').click()
        // eslint-disable-next-line no-empty
      } catch (e) {
      }
    }
  }
};
</script>

<style scoped lang="sass">
.dungeonUI
  position: fixed
  bottom: 0
  left: 0
  width: 100%
  image-rendering: pixelated
  background-image: url("../../assets/ui/DungeonUI.png")
  height: calc(4 * var(--tile-cell))
  min-height: calc(4 * var(--tile-cell))
  z-index: 5
  background-size: contain
  background-repeat: no-repeat
.dungeonUIContent
  position: relative
.skills
  position: absolute
  opacity: 0.4
  background-color: green
  height: calc(2.5 * var(--tile-cell))
  width: calc(4 * var(--tile-cell))
  bottom: 0
  left: 0
  display: flex
  flex-wrap: wrap
  padding: calc(3 * var(--pixel-unit)) calc(5 * var(--pixel-unit))
  box-sizing: border-box
  align-items: space-between
  justify-content: space-between
  .skill__slot
    height: var(--tile-cell)
    width: var(--tile-cell)
    opacity: 1
    background-color: blue
.player__gold
  position: absolute
  bottom: calc(3.48 * var(--tile-cell))
  left: calc(1.5 * var(--tile-cell))
  display: flex
  align-items: center
  z-index: 0
  img
    margin: 0 2rem 0 1rem
  .text
    color: gold
    font-size: 1.25rem
    line-height: 1rem
.control
  background-color: red
  opacity: 0.5
  position: absolute
  bottom: 0
  right: 0
  height: calc(var(--tile-cell) * 2.5)
  width: calc(var(--tile-cell) * 3)
  .bottom
    position: fixed
    height: 28px
    bottom: calc(var(--tile-cell) * 0.1)
    width: calc(var(--tile-cell) * 1.5)
    right: calc(var(--tile-cell) / 1.1)
  .top
    position: fixed
    height: 28px
    bottom: calc(var(--tile-cell) * 1.6)
    width: calc(var(--tile-cell) * 1.5)
    right: calc(var(--tile-cell) / 1.1)
  .right
    position: fixed
    height: calc(var(--tile-cell) * 1.5)
    bottom: calc(var(--tile-cell) / 2.5)
    width: 28px
    right: calc(var(--tile-cell) * 0.3)
  .left
    position: fixed
    height: calc(var(--tile-cell) * 1.5)
    bottom: calc(var(--tile-cell) / 2.5)
    width: 28px
    right: calc(var(--tile-cell) * 2.4)
</style>
