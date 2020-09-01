<template>
  <div class="container">
    <h1>Choose your class</h1>
    <h2>{{ selected.name ? selected.name : 'Select your hero' }}</h2>
    <div class="hero__description" v-if="selected.name">
      <div class="stat">
        <img :src="require('../assets/ui/attack__icon.png')" alt="">
        {{ selected.initialStats.attack }}
      </div>
      <div class="stat">
        <img :src="require('../assets/ui/health__icon.png')" alt="">
        {{ selected.initialStats.health }}
      </div>
      <div class="stat">
        <img :src="require('../assets/ui/critical__icon.png')" alt="">
        {{ Math.round(selected.initialStats.critical * 100) }}%
      </div>
    </div>
    <div class="classes__container">
      <div v-for="(item, index) in availableClasses"
              class="available__class"
              :class="{'--selected': selected.name === item.name }"
              :key="index"
              @click="selected = item"
      >
        <img :src="getImage(item.name.toLowerCase())" alt="">
      </div>
    </div>
    <button @click="begin" :disabled="!selected.name">Start Game</button>
    <button class="button --back" @click="$router.push({ name: 'main-menu'})">Back</button>
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
.container
  color: white
  font-family: 'OpenSansPXBold'
  display: flex
  align-items: center
  justify-content: center
  height: 100vh
  flex-direction: column
button
  margin: 15px
  font-family: 'OpenSansPXBold'
  color: white
  text-transform: capitalize
  font-size: 1.75rem
  background-color: #672806
  border-color: #533a18
  &.--back
    font-size: 1.5rem
    margin-bottom: 15px
    background-color: #671233
button:disabled
  background-color: black
  color: #888888
.hero__description
  display: flex
  .stat
    display: flex
    align-items: center
    justify-content: center
    margin: 0 5px
    width: 33%
    img
      margin-right: 5px
.classes__container
  display: flex
  flex-wrap: wrap
  width: 100%
  height: auto
  .available__class
    background-image: url("../assets/ui/dungeonUI__skillSlot.png")
    background-size: contain
    image-rendering: pixelated
    box-sizing: border-box
    padding: 15px
    width: calc(50% - 10px)
    height: auto
    position: relative
    margin: 5px
    background-blend-mode: color-dodge
    &.--selected
      -webkit-box-shadow: inset 0 0 0 var(--pixel-unit) #c89c01
      box-shadow: inset 0 0 0 var(--pixel-unit) #c89c01
    img
      width: 100%
      height: auto
</style>
