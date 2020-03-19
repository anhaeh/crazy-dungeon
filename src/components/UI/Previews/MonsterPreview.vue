<template>
  <div class="monsterPreview">
    <div class="monsterPreview__portrait">
      <img :src="image">
      <div class="monsterPreview__lvl">{{ entity.monster.level }}</div>
    </div>
    <status-bar :actual="entity.totalLife - entity.monster.damage"
                :total="entity.totalLife"
                modifier="--monster"
    >
    </status-bar>
    <div class="stats">
      <img :src="attackIcon" alt="">
      <span class="counter --attack">{{ entity.refMonster.attack + entity.monster.level }}</span>
      <img :src="goldIcon" alt="">
      <span class="counter --gold">{{ entity.refMonster.gold }}</span>
    </div>
    <div class="name">{{ entity.monster.name }}</div>
  </div>
</template>

<script>
import statusBar from '../StatusBar'
export default {
  props: ['entity'],
  components: {
    statusBar
  },
  name: "MonsterPreview",
  computed: {
    image: function () {
      return require('@/assets/monsters/portraits/' + this.entity.refMonster.image + '.png')
    },
    attackIcon: function () {
      return require('@/assets/ui/attack__icon.png')
    },
    goldIcon: function () {
      return require('@/assets/ui/gold__icon.png')
    }
  }
}
</script>

<style scoped lang="sass">
.monsterPreview
  text-align: right
.monsterPreview__portrait
  width: calc(1.5 * var(--tile-cell))
  height: calc(1.5 * var(--tile-cell))
  background: url("../../../assets/ui/portraitFrame.png")
  padding: calc(2.5 * var(--pixel-unit))
  image-rendering: pixelated
  background-size: contain
  box-sizing: border-box
  position: absolute
  right: 0
  .monsterPreview__lvl
    position: absolute
    bottom: 0
    right: 0
    height: calc(0.5 * var(--tile-cell))
    width: calc(0.5 * var(--tile-cell))
    box-shadow: inset 0 0 0 calc(1 * var(--pixel-unit)) #0e0c05
    background: #1f1913
    display: flex
    align-items: center
    justify-content: center
    font-size: 18px
    color: #805a29
  img
    width: 100%
    height: 100%
.statusBar
  position: absolute
  right: calc(1.5 * var(--tile-cell))
  top: 0
.name
  position: absolute
  top: calc(1.5 * var(--tile-cell))
  right: calc(2 * var(--pixel-unit))
  font-size: 20px
  font-weight: bold
  text-shadow: 1px 2px 0 black
.damage
  padding-top: 5px
.stats
  height: 18px
  display: flex
  position: absolute
  right: 22%
  font-size: 0.85rem
  padding-top: calc(0.6 * var(--tile-cell))
  img
    margin-right: 2px
  .counter
    display: flex
    align-items: center
    &.--attack
      margin-right: 5px
@media (min-width: 900px)
  .monsterPreview
    transform: scale(1.3)
    right: 0
    top: 0
    position: fixed
  .monsterPreview__portrait
    padding: 10px
  .stats
    right: 80px
</style>
