<template>
  <div class="dungeonUI">
    <div class="dungeonUI__content">
      <log-quest></log-quest>
      <div class="skills">
        <div class="skill__slot --slot1"></div>
        <div class="skill__slot --slot2"></div>
        <div class="skill__slot --slot3"></div>
        <div class="skill__slot --slot4"></div>
        <div class="skill__slot --slot5"></div>
        <div class="skill__slot --slot6"></div>
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
  position: fixed
  opacity: 0.4
  // background-color: red
  height: calc(2 * var(--tile-cell))
  width: calc(3.5 * var(--tile-cell))
  bottom: calc(1 * var(--pixel-unit))
  left: calc(3 * var(--pixel-unit))
  .skill__slot
    position: fixed
    opacity: 0.4
    background-color: blue
    height: calc(0.875 * var(--tile-cell))
    width: calc(0.875 * var(--tile-cell))
    bottom: calc(3 * var(--pixel-unit))
    left: calc(5 * var(--pixel-unit))
    &.--slot2, &.--slot5
      left: calc(24 * var(--pixel-unit))
    &.--slot3, &.--slot6
      left: calc(43 * var(--pixel-unit))
    &.--slot4, &.--slot5, &.--slot6
      bottom: calc(19 * var(--pixel-unit))
.control
  .bottom
    position: fixed
    height: 28px
    bottom: calc(var(--tile-cell) * 0.1)
    width: calc(var(--tile-cell) * 1.5)
    right: calc(var(--tile-cell) / 1.5)
  .top
    position: fixed
    height: 28px
    bottom: calc(var(--tile-cell) * 1.6)
    width: calc(var(--tile-cell) * 1.5)
    right: calc(var(--tile-cell) / 1.5)
  .right
    position: fixed
    height: calc(var(--tile-cell) * 1.5)
    bottom: calc(var(--tile-cell) / 2.5)
    width: 28px
    right: calc(var(--tile-cell) * 0.2)
  .left
    position: fixed
    height: calc(var(--tile-cell) * 1.5)
    bottom: calc(var(--tile-cell) / 2.5)
    width: 28px
    right: calc(var(--tile-cell) * 2.2)
</style>
