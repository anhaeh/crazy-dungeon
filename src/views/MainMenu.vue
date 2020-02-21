<template>
  <div class="view__intro">
    <div class="intro__skullHead"></div>
    <img src="../assets/ui/intro__title.png" class="intro__title">
    <img src="../assets/ui/intro__fire.gif" class="intro__fire">
    <img src="../assets/ui/intro__hands.gif" class="intro__hands">
    <div class="intro__menu">
      <div class="intro__btn" @click="$router.push({name: 'class-selection'})">Single Player</div>
      <div class="intro__btn" @click="$router.push({name: 'high-scores'})">High Scores</div>
      <div class="intro__btn --disabled">Library</div>
      <div class="intro__btn --disabled">Settings</div>
      <span class="version">Version {{ version }}</span>
    </div>
  </div>
</template>

<script>
import { version } from '../../package.json'

export default {
  name: "MainMenu",
  data() {
    return {
      selected: '',
      version: version
    }
  },
  methods: {
    begin: function () {
      this.$router.push({ name: 'dungeon', params: { class: this.selected.toLowerCase() }})
    }
  },
  mounted () {
    this.$store.commit('setPlayerPosition', null)
  }
};
</script>

<style scoped lang="sass">
.view__intro
  position: relative
  width: 100%
  background-image: url("../assets/ui/intro__bg.png")
  background-size: contain
  height: 100vh
  display: flex
.intro__skullHead
  background-image: url("../assets/ui/intro__skullHead.gif")
  width: 100%
  height: calc(6 * var(--tile-cell))
  background-size: 100% 100%
  background-position: center bottom
  position: absolute
  top: 0
  left: 0
.intro__title
  position: absolute
  top: calc(4 * var(--tile-cell))
  left: 0
  width: calc(100% - 40px)
  right: 0
  margin: auto
.intro__fire
  position: absolute
  bottom: 0
  left: 0
  width: 100%
  height: calc(4 * var(--tile-cell))
  z-index: 1
.intro__hands
  position: absolute
  bottom: 0
  left: 0
  width: 100%
  height: calc(4 * var(--tile-cell))
  z-index: 2
.intro__menu
  background-image: url("../assets/ui/intro__frame.png")
  background-size: 100% 100%
  width: calc(6 * var(--tile-cell))
  height: calc(5 * var(--tile-cell))
  padding: calc(.75 * var(--tile-cell))
  box-sizing: border-box
  color: white
  display: flex
  align-items: center
  justify-content: space-between
  flex-direction: column
  position: absolute
  left: calc(.5 * var(--tile-cell))
  top: calc(5 * var(--tile-cell))
.version
  position: absolute
  bottom: -2%
  color: green
.intro__btn
  width: calc(4.5 * var(--tile-cell))
  height: calc(0.75 * var(--tile-cell))
  background-image: url("../assets/ui/intro__btn.png")
  background-size: 100% 100%
  display: flex
  align-items: center
  justify-content: center
  font-size: 1.25rem
  &:focus, &:active
    transform: translateY(3px)
    opacity: 0.8
  &.--disabled
    opacity: 0.3
    pointer-events: none
  // button, select
  //   margin: 15px
  //   font-family: 'OpenSansPXBold'
  //   color: white
  //   text-transform: capitalize
  //   font-size: 1.5rem
  //   background-color: #672806
  //   border-color: #533a18
  // button:disabled
  //   background-color: black
  //   color: #888888
</style>
