<template>
  <div class="dungeonUI">
<!--     <div class="dungeonUI__contentTop">
      <div class="dungeonUI__current">
        <div class="dungeonUI__currentBars">
          <div class="dungeonUI__currentGold">
            <div class="text">
              {{ $store.getters.getPlayer.gold }}
            </div>
          </div>
          <div class="dungeonUI__currentExp">
            <div class="title">
              Exp
            </div>
            <div class="text">
              {{ $store.getters.getPlayer.defeatMonsters }} / {{ $store.getters.getPlayer.nextLevelMonsters }}
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <quest-log
    >
    </quest-log>
    <div class="dungeonUI__currentGold --border3">
      <img :src="require('../../assets/ui/attack.png')" alt="">
      <span>{{ $store.getters.getPlayer.gold }}</span>
    </div>
    <div class="dungeonUI__leftmenu">
      <button type="button" class="btn" @click="showModalQuit = true">
        <img :src="require('../../assets/ui/menu.png')" alt="">
      </button>
      <button type="button" class="btn" @click="setInventory">
        <img :src="require('../../assets/ui/equip.png')" alt="">
      </button>
      <button type="button" class="btn" @click="setShowStats"></button>
      <button type="button" class="btn" @click="setShowSkills"></button>
      <button type="button" class="btn" @click="setInventory">
        <img :src="require('../../assets/ui/items.png')" alt="">
      </button>
      <div class="--slot"></div>
    </div>
    <skills-list></skills-list>
    <div class="dungeonUI__contentBottom">
      <div class="dungeonUI__controls">
        <div class="dungeonUI__controlscontainer">      
          <div v-if="isMonsterTarget"
               class="dungeonUI__controlsActiveSkill"
               @click="attack">
               <img :src="require('../../assets/ui/attack.png')" alt=""> 
          </div>
          <div v-if="isNpcTarget"
               class="dungeonUI__controlsActiveSkill talk"
               @click="talk">
          </div>
          <div v-for="direction in arrows"
               :key="'arrow' + direction"
               :class="'dungeonUI__control --' + direction"
               @click="move(direction)"
          >
          </div>
        </div>
      </div>
    </div>
    <inventory></inventory>
    <merchant-items></merchant-items>
    <display-skills-menu v-show="showSkills"></display-skills-menu>
    <display-stats-menu v-show="showStats"></display-stats-menu>
    <exit-confirmation v-if="showModalQuit" @close="showModalQuit = false"></exit-confirmation>
  </div>
</template>

<script>
import Inventory from './Inventory'
import QuestLog from './QuestLog'
import SkillsList from './Skills/SkillList'
import DisplaySkillsMenu from './Skills/DisplaySkillsMenu'
import { movePlayer} from "@/modules/player"
import MerchantItems from './MerchantItems/MerchantList'
import DisplayStatsMenu from './Stats/DisplayStatsMenu'
import ExitConfirmation from './Dialogs/ExitConfirmation'

export default {
  name: "MobileUI",
  components: {
    Inventory,
    QuestLog,
    SkillsList,
    DisplaySkillsMenu,
    MerchantItems,
    DisplayStatsMenu,
    ExitConfirmation
  },
  data () {
    return {
      showMenu: false,
      showSkills: false,
      showStats: false,
      showModalQuit: false
    }
  },
  computed: {
    arrows: function () {
      return ['top', 'bottom', 'left', 'right']
    },
    isMonsterTarget: function() {
      return this.$store.getters.getMonsterSelected
    },
    isNpcTarget: function() {
      let result = false
      let npcSelected = this.$store.getters.getNpcSelected
      if (npcSelected) {
        let playerInRange = this.$store.getters.getPlayerRange
        if (playerInRange.includes(npcSelected.cellId)) {
          result = true
        }
      }
      return result
    }
  },
  methods: {
    closeAll: function() {
      this.showSkills = false
      this.showStats = false
      this.$store.commit('setShowInventory', false)
    },
    openMenu: function () {
      let result = !this.showMenu
      this.closeAll()
      this.showMenu = result
    },
    setShowSkills: function () {
      let result = !this.showSkills
      this.closeAll()
      this.showSkills = result
    },
    setShowStats: function () {
      let result = !this.showStats
      this.closeAll()
      this.showStats = result
    },
    setInventory: function () {
      let result = !this.$store.getters.getInventory.show
      this.closeAll()
      this.$store.commit('setShowInventory', result)
    },
    move: function (key) {
      let directions = {
        'top': 1,
        'left': 0,
        'right': 3,
        'bottom': 2
      }
      let cellToMove = this.$store.getters.getPlayerRange[directions[key]]
      movePlayer(cellToMove)
    },
    attack: function() {
      event.preventDefault()
      this.$store.dispatch('attack')
    },
    talk: function() {
      event.preventDefault()
      document.querySelector(`.${this.$store.getters.getNpcSelected.name} img`).click()
    }
  }
};
</script>

<style scoped lang="sass">
.dungeonUI
  // position: fixed
  // bottom: 0
  // left: 0
  // width: 100%
  // image-rendering: pixelated
  // background-position: bottom left
  // height: calc(4 * var(--tile-cell))
  // min-height: calc(4 * var(--tile-cell))
  // z-index: 5
  // display: flex
  // flex-direction: column
// .dungeonUI__contentTop
//   display: flex
//   flex-direction: row
//   width: 100%
//   height: 100%
// .dungeonUI__current
//   width: calc(5.5 * var(--tile-cell))
//   height: calc(1.5 * var(--tile-cell))
// .dungeonUI__currentBars
//   display: flex
//   width: 100%
// .dungeonUI__currentExp
//   display: flex
//   align-items: center
//   z-index: 0
//   height: calc(.5 * var(--tile-cell))
//   min-width: calc(3 * var(--tile-cell))
//   background-image: url("../../assets/ui/dungeonUI__currentGold.png")
//   background-size: 100% 100%
//   image-rendering: pixelated
//   background-repeat: no-repeat
//   .text
//     color: #c0a23b
//     padding-left: calc(1.15 * var(--tile-cell))
//     font-size: 1rem
//     line-height: 1rem
// .dungeonUI__currentExp
//   min-width: calc(2.5 * var(--tile-cell))
//   background-image: url("../../assets/ui/dungeonUI__currentUn.png")
//   .text
//     padding-left: calc(0.75 * var(--tile-cell) - 20px)
//   .title
//     margin-left: 15px
//     color: #c0a23b
//     text-shadow: 0 2px 0 black
// .dungeonCurrentLog
//   display: flex
.dungeonUI__logQuestScroll
  height: var(--tile-cell)
  width: var(--tile-cell)
  *:active, *:focus
    opacity: 0.5
    transform: translateY(2px)
@media screen and (min-width: 900px)
  .dungeonUI
    right: 0
    flex-direction: column
    width: 336px
    height: calc(100% - 72px)
    padding-top: 25px
    left: initial
    box-sizing: border-box
</style>
<style lang="sass">
  .dungeonUI
    .questLog
      width: var(--tile-500)
      top: initial
      left: var(--tile)
      right: initial
      position: fixed
      bottom: 0
      z-index: 10
  .dungeonUI__leftmenu
    display: flex
    width: var(--tile)
    flex-direction: column
    left: 0
    bottom: 0
    position: fixed
    .btn
      height: var(--tile)
      max-height: var(--tile)
      display: flex
      align-items: center
      justify-content: center
    img
      width: 100%
  .dungeonUI__currentGold
    padding: 0 var(--tile-10)
    position: fixed
    top: 0
    left: var(--tile)
    box-sizing: border-box
    display: flex
    align-items: center
    justify-content: space-around
    color: #c0a23b
    img
      width: var(--tile-50)
      padding-left: var(--tile-25)
      transform: scaleX(-1)
  .dungeonUI__controls
    position: absolute
    bottom: var(--tile-150)
    right: 0
    left: 0
    top: initial
    margin: auto
    height: var(--tile-250)
    width: var(--tile-250)
    overflow: hidden
    border-radius: 50%
  .dungeonUI__controlscontainer
    position: relative
    height: var(--tile-250)
    background-image: url("../../assets/ui/dungeonUI__controls.png")
    background-size: contain
    width: var(--tile-300)
    right: var(--tile-25)
    display: flex
    align-items: center
    justify-content: center
  .dungeonUI__control
    position: absolute
    box-sizing: border-box
    mix-blend-mode: color-dodge
    &.--bottom, &.--top
      right: 0
      height: 0
      width: var(--tile-300)
      border-left: var(--tile) solid transparent
      border-right: var(--tile) solid transparent
    &.--bottom
      bottom: 0
      border-bottom: var(--tile-75) solid transparent
      &:active, &:focus
        border-bottom-color: rgba(136, 26, 1, .40)
    &.--top
      top: 0
      border-top: var(--tile-75) solid transparent
      &:active, &:focus
        border-top-color: rgba(136, 26, 1, .40)
    &.--left, &.--right
      top: 0
      width: 0
      height: var(--tile-250)
      border-top: var(--tile-75) solid transparent
      border-bottom: var(--tile-75) solid transparent
      box-sizing: border-box
    &.--left
      left: 0
      border-left: var(--tile) solid transparent
      &:active, &:focus
        border-left-color: rgba(136, 26, 1, .40)
    &.--right
      right: 0
      border-right: var(--tile) solid transparent
      &:active, &:focus
        border-right-color: rgba(136, 26, 1, .40)
  .dungeonUI__controlsActiveSkill
    height: var(--tile)
    width: var(--tile)
    margin: auto
    padding: var(--tile-15)
    background-image: url("../../assets/ui/slot.png") 
    background-size: 100% 100%
    box-sizing: border-box
    img
      height: 100%
      width: 100%
    &.talk
      background-image: url("../../assets/ui/dungeonUI__controlsTalk.png")
</style>