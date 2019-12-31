<template>
  <div class="dungeonUI">
    <div class="dungeonUI__contentTop">
      <div class="dungeonUI__more">
        <div class="dungeonUI__moreBack"></div>
        <div class="dungeonUI__moreMenu"></div>        
      </div>
      <div class="dungeonUI__current">      
        <div class="dungeonUI__currentGold">
          <img :src="imgGold" title="Gold">
          <div class="text">
            {{ $store.getters.getPlayer.gold }}
          </div>
        </div>
        <log-quest></log-quest>
      </div>
      <div class="dungeonUI__logQuestScroll">
        <div class="dungeonUI__logQuestScrollUp"></div>
        <div class="dungeonUI__logQuestScrollDown"></div>
      </div>
    </div>
    <div class="dungeonUI__contentBottom">
      <div class="dungeonUI__skills">
        <div class="dungeonUI__skillSlot"></div>
        <div class="dungeonUI__skillSlot"></div>
        <div class="dungeonUI__skillSlot"></div>
        <div class="dungeonUI__skillSlot"></div>
        <div class="dungeonUI__skillSlot"></div>
        <div class="dungeonUI__skillSlot"></div>
      </div>
      <div class="dungeonUI__controls">
        <div class="dungeonUI__controlsTop" @click="move('top')"></div>
        <div class="dungeonUI__controlsBottom" @click="move('bottom')"></div>
        <div class="dungeonUI__controlsRight" @click="move('right')"></div>
        <div class="dungeonUI__controlsLeft" @click="move('left')"></div>
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
  // background-image: url("../../assets/ui/DungeonUI.png")
  height: calc(4 * var(--tile-cell))
  min-height: calc(4 * var(--tile-cell))
  z-index: 5
  display: flex
  flex-direction: column
.dungeonUI__contentTop
  display: flex
  flex-direction: row
  width: 100%
  height: 100%
.dungeonUI__more
  background-color: red
  width: calc(1.5 * var(--tile-cell))
  height: calc(1.5 * var(--tile-cell))
.dungeonUI__current
  width: calc(4.5 * var(--tile-cell))
  height: calc(1.5 * var(--tile-cell))
  background-color: yellow
.dungeonUI__currentGold
  display: flex
  align-items: center
  z-index: 0
  height: calc(.5 * var(--tile-cell))
  img
    margin: 0 2rem 0 1rem
  .text
    color: gold
    font-size: 1.25rem
    line-height: 1rem
.dungeonUI__logQuestScroll
  height: calc(1.5 * var(--tile-cell))
  width: var(--tile-cell)
  background-color: green
.dungeonUI__logQuestScrollUp
  height: calc(.75 * var(--tile-cell))
  width: 100%
  background-color: rgba(0,0,0,0.5)
.dungeonUI__logQuestScrollDown
  height: calc(.75 * var(--tile-cell))
  width: 100%
  background-color: rgba(0,0,0,0.75)
.dungeonUI__skills
  opacity: 0.4
  background-color: green
  height: calc(2.5 * var(--tile-cell))
  width: calc(4 * var(--tile-cell))
  display: flex
  flex-wrap: wrap
  padding: calc(3 * var(--pixel-unit)) calc(5 * var(--pixel-unit))
  box-sizing: border-box
  align-items: space-between
  justify-content: space-between
.dungeonUI__skillSlot
  height: var(--tile-cell)
  width: var(--tile-cell)
  opacity: 1
  background-color: blue
.dungeonUI__controls
  background-color: red
  opacity: 0.5
  position: absolute
  bottom: 0
  right: 0
  height: calc(var(--tile-cell) * 2.5)
  width: calc(var(--tile-cell) * 3)
.dungeonUI__controlsBottom
  position: fixed
  height: 28px
  bottom: calc(var(--tile-cell) * 0.1)
  width: calc(var(--tile-cell) * 1.5)
  right: calc(var(--tile-cell) / 1.1)
.dungeonUI__controlsTop
  position: fixed
  height: 28px
  bottom: calc(var(--tile-cell) * 1.6)
  width: calc(var(--tile-cell) * 1.5)
  right: calc(var(--tile-cell) / 1.1)
.dungeonUI__controlsRight
  position: fixed
  height: calc(var(--tile-cell) * 1.5)
  bottom: calc(var(--tile-cell) / 2.5)
  width: 28px
  right: calc(var(--tile-cell) * 0.3)
.dungeonUI__controlsLeft
  position: fixed
  height: calc(var(--tile-cell) * 1.5)
  bottom: calc(var(--tile-cell) / 2.5)
  width: 28px
  right: calc(var(--tile-cell) * 2.4)
</style>
