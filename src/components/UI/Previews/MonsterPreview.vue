<template>
  <div class="monsterPreview">
    <div class="monsterPreview__attack --border3">
      <span>{{ entity.refMonster.attack + entity.monster.level }}</span>
      <img :src="attackIcon" alt="">
    </div>
    <div class="monsterPreview__lvl --border3">{{ entity.monster.level }}</div>
    <div class="monsterPreview__portrait --border3">
      <img :src="image" :title="`${entity.refMonster.name} Lv ${entity.monster.level}`">
    </div>
    <status-bar :actual="entity.totalLife - entity.monster.damage"
                :total="entity.totalLife"
                modifier="--monster --vertical"
                title="Health"
    >
    </status-bar>
<!--     <div class="stats">
      <img :src="goldIcon" title="Drop gold">
      <span class="counter --gold">{{ entity.refMonster.gold }}</span>
    </div> -->
    <div class="name">{{ entity.refMonster.name }}</div>
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
  display: flex
  justify-content: flex-end
  position: fixed
  right: 0
  top: 0
.monsterPreview__portrait
  height: var(--tile-125)
  width: var(--tile-125)
  img
    width: 100%
    height: 100%
.monsterPreview__lvl
  height: var(--tile-75)
  width: var(--tile-75)
  background: #1f1913
  display: flex
  justify-content: center
  font-size: var(--font-size-sm)
  color: #805a29
.name
  position: fixed
  top: var(--tile)
  right: 0
  left: 0
  text-align: center
  margin: auto
  font-size: var(--font-size-xs)
  text-shadow: 1px 2px 0 black
.damage
  padding-top: 5px
.monsterPreview__attack
  height: var( --tile-75)
  display: flex
  align-items: center
  justify-content: space-between
  max-width: var(--tile-125)
  width: var(--tile-125)
  img
    width: var(--tile-50)
    min-width: var(--tile-50)
  span
    width: 100%
    text-align: center
.stats
  height: 18px
  display: flex
  position: absolute
  right: 22%
  font-size: 0.85rem
  padding-top: calc(0.58 * var(--tile))
  img
    height: calc(0.35 * var(--tile))
    margin-right: 2px
  .counter
    display: flex
    align-items: center
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
  .name
    right: 5px
</style>
