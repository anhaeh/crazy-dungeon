<template>
  <div class="dungeonUI">
    <div class="dungeonUI__content">    
      <div class="feed">
        Sandro attacks. <br>
        10 damage, +5 electric<br>
        Chief Gobblin counter. <br>
        5 damage, burning<br>
        Sandro cast death touch<br>
        50 damage, +5 dark, +10 poison
      </div>
      <div class="skills">
        <div class="skill__slot --1"></div>
        <div class="skill__slot --2"></div>
        <div class="skill__slot --3"></div>
        <div class="skill__slot --4"></div>
        <div class="skill__slot --5"></div>  
        <div class="skill__slot --6"></div>  
      </div>
      <div class="control">
        <div class="top" @click="move('top')"></div>
        <div class="bottom" @click="move('bottom')"></div>
        <div class="right" @click="move('right')"></div>
        <div class="left" @click="move('left')"></div>
      </div>
    </div>  
  </div>
</template>

<script>
export default {
  name: "DungeonUI",
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
.feed
  color: white
  font-size: 14px
  width: calc(65 * var(--pixel-unit))
  height: calc(19 * var(--pixel-unit))
  position: absolute
  line-height: 11.5px
  padding-left: 25px
  box-sizing: border-box
  left: calc(28 * var(--pixel-unit))
  top: calc(6 * var(--pixel-unit))
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