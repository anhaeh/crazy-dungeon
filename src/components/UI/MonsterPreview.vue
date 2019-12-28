<template>
  <div class="monsterPreview">
    <div class="monsterPreview__portrait">
      <img :src="image">
    </div>
    <status-bar :actual="entity.monster.health - entity.damage"
                :total="entity.monster.health"
                modifier="--monster"
    >
    </status-bar>
    <div class="name">{{ entity.monster.name }}</div>
<!--     <img class="attack-image" :src="imageAttack">
    <div class="damage">
      {{ entity.monster.damage }}
    </div> -->
  </div>
</template>

<script>
import statusBar from './StatusBar'
export default {
  props: ['entity'],
  components: {
    statusBar
  },
  name: "MonsterPreview",
  computed: {
    image: function () {
      return require('@/assets/monsters/portraits/' + this.entity.monster.image + '.png')
    },
    imageAttack: function () {
      return require('@/assets/ui/Attack.png')
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
  background: url("../../assets/ui/portraitFrame.png")
  padding: calc(2.5 * var(--pixel-unit))
  image-rendering: pixelated
  background-size: contain
  box-sizing: border-box
  position: absolute
  right: 0
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
.attack-image
  height: 30px
  width: 30px
  padding-right: 5px
.damage
  padding-top: 5px
</style>
