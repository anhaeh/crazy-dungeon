<template>
  <div class="classselection">
    <div class="classselection__container">
      <img :src="require('../assets/ui/classselection/back.png')" @click="$router.push({ name: 'main-menu'})" class="classselection__backbutton" alt="backButton">
      <div class="classselection__classname">
        <span>{{ selected.name ? selected.name : 'Select your class' }}</span>
      </div>
      <div class="classselection__sprites --border2">
        <div v-for="(item, index) in availableClasses"
                class="classselection__spriteHero"
                :class="{'--selected': selected.name === item.name }"
                :key="index"
                @click="selected = item"
        >
          <img :src="getImage(item.name.toLowerCase())" alt="">
        </div>
      </div>
      <div class="classselection__bottomcontainer">
        <div class="classselection__statContainer">
          <div class="classselection__stat --border1">
            <img :src="require('../assets/ui/attack.png')" alt="">
            <span v-if="selected.name">{{ selected.initialStats.attack }}</span>
          </div>
          <div class="classselection__stat --border1">
            <img :src="require('../assets/ui/health.png')" alt="">
            <span v-if="selected.name">{{ selected.initialStats.health }}</span>
          </div>
          <div class="classselection__stat --border1">
            <img :src="require('../assets/ui/attack.png')" alt="">
            <span v-if="selected.name">{{ Math.round(selected.initialStats.critical * 100) }}%</span>
          </div>
        </div>
        <div class="classselection__herodetails">
          <div class="classselection__heroportrait --border3"></div>
          <div class="classselection__slotscontiner">
            <div class="classselection__slot"></div>
            <div class="classselection__slot"></div>
            <div class="classselection__slot"></div>
            <div class="classselection__slot"></div>
            <div class="classselection__slot"></div>
            <div class="classselection__slot"></div>
          </div>
          <button @click="begin" class="btn" :disabled="!selected.name">Start Game</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import classes from '@/gamedata/Heroes.json'

export default {
  name: "ClassSelection",
  data() {
    return {
      selected: {}
    }
  },
  computed: {
    availableClasses: function () {
      return Object.keys(classes).map(x => classes[x])
    }
  },
  methods: {
    begin: function () {
      this.$router.push({ name: 'dungeon', params: { className: this.selected.name.toLowerCase() }})
    },
    getImage: function (image) {
      return require(`@/assets/heroes/${image}.gif`)
    }
  }
}
</script>

<style scoped lang="sass">
.classselection
  color: white
  display: flex
  height: 100vh
  width: 100%
.classselection__container
  color: white
  display: flex
  height: 100vh
  flex-wrap: wrap
  align-items: flex-start
  justify-content: flex-start
.classselection__backbutton
  width: var(--tile-cell)
  height: var(--tile-cell)
.classselection__classname
  width: calc(var(--tile-cell) * 6)
  height: var(--tile-cell)
  background-image: url("../assets/ui/classselection/classname.png")
  background-size: contain
  display: flex
  align-items: center
  justify-content: center
  font-size: 1.85rem
.classselection__statContainer
  display: flex
  flex-direction: column
.classselection__stat
  display: flex
  align-items: center
  justify-content: space-around
  width: calc(var(--tile-cell) * 2)
  height: var(--tile-cell)
  img
    height: 100%
    width: auto
  span
    font-size: var(--font-size-sm)
.classselection__sprites
  width: 100%
  height: calc(100% - (var(--tile-cell) * 4))
  display: flex
  flex-wrap: wrap
  align-items: flex-start
  align-content: flex-start
  box-sizing: border-box
  overflow-y: scroll
  img
    width: calc(var(--tile-cell) * 2)
    height: calc(var(--tile-cell) * 2)
    padding: calc(var(--tile-cell) / 6)
    box-sizing: border-box
.classselection__spriteHero
  flex-basis: calc(var(--tile-cell) * 2.5)
  height: calc(var(--tile-cell) * 2.5)
  align-items: center
  justify-content: center
  display: flex
  &:first-child
    box-shadow: 3px 3px #271b0b75
  &:nth-child(even)
    box-shadow: -3px 3px #271b0b75
  &:nth-child(odd)
    box-shadow: 0px 3px #271b0b75
.classselection__herodetails
  display: flex
  flex-wrap: wrap
  width: calc(var(--tile-cell) * 5)
  .btn
    width: 100%
    height: var(--tile-cell)
.classselection__heroportrait
  width: calc(var(--tile-cell) * 2)
  height: calc(var(--tile-cell) * 2)
  background-image: url("../assets/heroes/portraits/archer.png")
  background-size: cover
  background-repeat: no-repeat
  box-sizing:   border-box
.classselection__slotscontiner
  display: flex
  flex-wrap: wrap
  width: calc(var(--tile-cell) * 3)
.classselection__slot
  width: var(--tile-cell)
  height: var(--tile-cell)
  background-image: url("../assets/ui/slot.png")
  background-size: cover
.classselection__bottomcontainer
  display: flex
@media screen and (min-width: 960px)
  .classselection
    max-width: 1000px
    width: 100%
  .classselection__sprites
    max-width: 75%
  .classselection__bottomcontainer
    flex-direction: column-reverse
    width: 25%
    .btn
      position: absolute
      bottom: var(--tile-cell)
      width: var(--tile-500)
  .classselection__stat
    width: var(--tile-250)
    height: var(--tile)
    span
      font-size: var(--font-size-xl)
  .classselection__heroportrait
    width: var(--tile-200)
    height: var(--tile-200)
  .classselection__classname
    width: calc(100% - var(--tile-200))
    height: var(--tile-200)
  .classselection__backbutton
    width: var(--tile-200)
    height: var(--tile-200)
  .classselection__statContainer
    flex-wrap: wrap
    flex-direction: row
</style>
