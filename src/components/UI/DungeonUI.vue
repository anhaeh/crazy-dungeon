<template>
  <div class="dungeonUI">
    <div class="dungeonUI__contentTop">
      <div class="dungeonUI__current">
        <div class="dungeonUI__currentBars">
          <div class="dungeonUI__currentGold">
            <div class="text">
              {{ $store.getters.getPlayer.gold }}
            </div>
          </div>
          <div class="dungeonUI__currentUnnused">
            <div class="text">
              {{ $store.getters.getPlayer.gold }}
            </div>
          </div>
        </div>
        <div class="dungeonCurrentLog">
          <div class="dungeonUI__logQuestScroll">
            <div class="dungeonUI__logQuestScrollUp" @click="scrollLog(1)"></div>
            <div class="dungeonUI__logQuestScrollDown" @click="scrollLog(-1)"></div>
          </div>
          <log-quest :counter="cursorCounter"></log-quest>
        </div>
      </div>

      <div class="dungeonUI__more">
        <div class="dungeonUI__moreBack"></div>
        <div class="dungeonUI__moreMenu"></div>
      </div>
    </div>
    <div class="dungeonUI__contentBottom">
      <div class="dungeonUI__skills">
        <div class="dungeonUI__skillSlot --active">
          <img src="../../assets/skills/blackFire.png" alt="">
        </div>
        <div class="dungeonUI__skillSlot">
          <img src="../../assets/skills/mindBlast.png" alt="">
        </div>
        <div class="dungeonUI__skillSlot"></div>
        <div class="dungeonUI__skillSlot"></div>
        <div class="dungeonUI__skillSlot"></div>
        <div class="dungeonUI__skillSlot"></div>
      </div>
      <div class="dungeonUI__controls">
        <div class="dungeonUI__controlsActiveSkill" @click="move('top')"></div>
        <div class="dungeonUI__controlsTop" @click="move('top')"></div>
        <div class="dungeonUI__controlsBottom" @click="move('bottom')"></div>
        <div class="dungeonUI__controlsRight" @click="move('right')"></div>
        <div class="dungeonUI__controlsLeft" @click="move('left')"></div>
      </div>
      <bottomDialog></bottomDialog>
    </div>
    <inventory></inventory>
  </div>
</template>

<script>
import Inventory from './Inventory'
import LogQuest from './LogQuest'
import bottomDialog from './bottomDialog'

export default {
  name: "DungeonUI",
  components: {
    Inventory,
    LogQuest,
    bottomDialog
  },
  data () {
    return {
      cursorCounter: 0
    }
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
    },
    scrollLog: function (counter) {
      this.cursorCounter += counter
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
  background-image: url("../../assets/ui/dungeonUI__background.png")
  background-size: 100% 100%
  background-position: bottom left
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
  div
    width: calc(1.5 * var(--tile-cell))
    height: calc(.75 * var(--tile-cell))
    background-image: url("../../assets/ui/dungeonUI__more.png")
    background-size: contain
    image-rendering: pixelated
    &:active, &:focus
      opacity: 0.5
      transform: translateY(2px)
    &.dungeonUI__moreMenu
      background-image: url("../../assets/ui/dungeonUI__moreDown.png")
.dungeonUI__current
  width: calc(5.5 * var(--tile-cell))
  height: calc(1.5 * var(--tile-cell))
.dungeonUI__currentBars
  display: flex
  width: 100%
.dungeonUI__currentGold, .dungeonUI__currentUnnused
  display: flex
  align-items: center
  z-index: 0
  height: calc(.5 * var(--tile-cell))
  min-width: calc(3 * var(--tile-cell))
  background-image: url("../../assets/ui/dungeonUI__currentGold.png")
  background-size: 100% 100%
  image-rendering: pixelated
  background-repeat: no-repeat
  .text
    color: #c0a23b
    padding-left: calc(1.15 * var(--tile-cell))
    font-size: 1.25rem
    line-height: 1rem
.dungeonUI__currentUnnused
  min-width: calc(2.5 * var(--tile-cell))
  background-image: url("../../assets/ui/dungeonUI__currentUn.png")
.dungeonCurrentLog
  display: flex
  width: calc(5.5 * var(--tile-cell))
.dungeonUI__logQuestScroll
  height: var(--tile-cell)
  width: var(--tile-cell)
  *:active, *:focus
    opacity: 0.5
    transform: translateY(2px)
.dungeonUI__logQuestScrollUp, .dungeonUI__logQuestScrollDown
  height: calc(.5 * var(--tile-cell))
  width: var(--tile-cell)
  background-image: url("../../assets/ui/dungeonUI__logQuestScrollUp.png")
  background-size: 100% 100%
  image-rendering: pixelated
.dungeonUI__logQuestScrollDown
  background-image: url("../../assets/ui/dungeonUI__logQuestScrollDown.png")

.dungeonUI__skills
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
  background-image: url("../../assets/ui/dungeonUI__skillSlot.png")
  background-size: contain
  image-rendering: pixelated
  padding: var(--pixel-unit)
  box-sizing: border-box
  &.--active
    box-shadow: inset 0 0 0 var(--pixel-unit) #c89c01
  img 
    width: 100%
    height: 100%
.dungeonUI__controls
  opacity: 1
  position: absolute
  bottom: 0
  right: 0
  height: calc(var(--tile-cell) * 2.5)
  width: calc(var(--tile-cell) * 3)
  background-image: url("../../assets/ui/dungeonUI__controls.png")
  background-size: contain
  image-rendering: pixelated
.dungeonUI__controlsBottom
  position: fixed
  height: 28px
  bottom: calc(var(--tile-cell) * 0.1)
  width: calc(var(--tile-cell) * 1.5)
  right: calc(var(--tile-cell) / 1.4)
.dungeonUI__controlsTop
  position: fixed
  height: 28px
  bottom: calc(var(--tile-cell) * 1.9)
  width: calc(var(--tile-cell) * 1.5)
  right: calc(var(--tile-cell) / 1.4)
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
  right: calc(var(--tile-cell) * 2.1)
.dungeonUI__controlsActiveSkill
  position: fixed
  background-image: url("../../assets/ui/dungeonUI__controlsAttack.png")
  background-size: 100% 100%
  height: var(--tile-cell)
  width: var(--tile-cell)
  bottom: calc(var(--tile-cell) * .75)
  right: var(--tile-cell)
</style>
