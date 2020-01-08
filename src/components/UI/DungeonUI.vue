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
              Lvl {{ $store.getters.getRoom }}
            </div>
          </div>
        </div>
        <div class="dungeonCurrentLog">
          <div class="dungeonUI__logQuestScroll">
            <div class="dungeonUI__logQuestScrollUp" @click="scrollLog(1)"></div>
            <div class="dungeonUI__logQuestScrollDown" @click="scrollLog(-1)"></div>
          </div>
          <log-quest
              :counter="cursorCounter"
          >
          </log-quest>
        </div>
      </div>

      <div class="dungeonUI__more">
        <div class="dungeonUI__moreBack"></div>
        <div class="dungeonUI__moreMenu" @click="openMenu"></div>
      </div>
    </div>
    <div v-if="showMenu" class="dungeonUI__menuBottom">
      <div class="dungeonUI__menuBottomLeft">
        <div class="dungeonUI__retreatBtn"></div>
        <div class="dungeonUI__settingBtn"></div>
      </div>
      <div class="dungeonUI__menuBottomRight">
        <div class="dungeonUI__menuBottomBtn"><span>Stats</span></div>
        <div class="dungeonUI__menuBottomBtn"
             @click="setInventory">
          <span>Inventory</span>
        </div>
        <div class="dungeonUI__menuBottomBtn"><span>Quest</span></div>
        <div class="dungeonUI__menuBottomBtn"
             @click="setShowSkills">
          <span>Skills</span>
        </div>
      </div>
    </div>
    <div class="dungeonUI__contentBottom">
      <skills-list></skills-list>
      <div v-if="isMonsterTarget"
           class="dungeonUI__controlsActiveSkill"
           @click="attack">
      </div>
      <div v-if="isMerchantInRange"
           class="dungeonUI__controlsActiveSkill talk"
           @click="talk">
      </div>
      <div class="dungeonUI__controls">
        <div v-for="direction in arrows"
             :key="'arrow' + direction"
             :class="'dungeonUI__controls-' + direction"
             @click="move(direction)"
        >
        </div>
      </div>
    </div>
    <inventory></inventory>
    <display-skills-menu v-if="showSkills"></display-skills-menu>
  </div>
</template>

<script>
import Inventory from './Inventory'
import LogQuest from './LogQuest'
import SkillsList from './Skills/SkillList'
import DisplaySkillsMenu from './Skills/DisplaySkillsMenu'
import { movePlayer} from "@/modules/player"

export default {
  name: "DungeonUI",
  components: {
    Inventory,
    LogQuest,
    SkillsList,
    DisplaySkillsMenu
  },
  data () {
    return {
      cursorCounter: 0,
      showMenu: false,
      showSkills: false
    }
  },
  computed: {
    arrows: function () {
      return ['top', 'bottom', 'left', 'right']
    },
    isMonsterTarget: function() {
      return this.$store.getters.getMonsterSelected
    },
    isMerchantInRange: function() {
      return this.$store.getters.getPlayerRange.includes(this.$store.getters.getMerchant.cellId) &&
          !this.isMonsterTarget
    }
  },
  methods: {
    openMenu: function () {
      this.showMenu = !this.showMenu
      this.showSkills = false
      this.$store.commit('setShowInventory', false)
      this.$store.commit('setDialogShow', false)
    },
    setShowSkills: function () {
      this.showSkills = !this.showSkills
      this.$store.commit('setShowInventory', false)
    },
    setInventory: function () {
      this.$store.commit('clickInventory')
      this.showSkills = false
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
      document.querySelector('.merchant img').click()
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
    &.dungeonUI__moreMenu
      background-image: url("../../assets/ui/dungeonUI__moreDown.png")
      &:active, &:focus, .--active
        background-image: url("../../assets/ui/dungeonUI__moreDownActive.png")
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
.dungeonUI__controls-bottom
  position: fixed
  height: 28px
  bottom: calc(var(--tile-cell) * 0.1)
  width: calc(var(--tile-cell) * 1.5)
  right: calc(var(--tile-cell) / 1.4)
.dungeonUI__controls-top
  position: fixed
  height: 28px
  bottom: calc(var(--tile-cell) * 1.9)
  width: calc(var(--tile-cell) * 1.5)
  right: calc(var(--tile-cell) / 1.4)
.dungeonUI__controls-right
  position: fixed
  height: calc(var(--tile-cell) * 1.5)
  bottom: calc(var(--tile-cell) / 2.5)
  width: 28px
  right: calc(var(--tile-cell) * 0.3)
.dungeonUI__controls-left
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
  z-index: 1
  &.talk
    background-image: url("../../assets/ui/dungeonUI__controlsTalk.png")
.dungeonUI__menuBottom
  position: fixed
  display: flex
  bottom: 0
  left: 0
  height: calc(var(--tile-cell) * 2.5)
  background-image: url("../../assets/ui/dungeonUI__menuBg.png")
  background-size: 100% 100%
  width: 100%
  z-index: 2
.dungeonUI__menuBottomLeft
  display: flex
  height: 100%
  flex-direction: column
  width: calc(var(--tile-cell) * 2)
.dungeonUI__retreatBtn, .dungeonUI__settingBtn
  width: 100%
  background-image: url("../../assets/ui/dungeonUI__retreat.png")
  height: calc(var(--tile-cell) * 1.25)
  background-size: 100% 100%
.dungeonUI__settingBtn
  background-image: url("../../assets/ui/dungeonUI__settings.png")
.dungeonUI__menuBottomRight
  display: flex
  height: 100%
  width: calc(var(--tile-cell) * 5)
  flex-wrap: wrap
.dungeonUI__menuBottomBtn
  flex-basis: 50%
  width: 100%
  background-image: url("../../assets/ui/dungeonUI__menuOption.png")
  height: calc(var(--tile-cell) * 1.25)
  background-size: 100% 100%
  display: flex
  align-items: center
  justify-content: center
  span
    color: white
    margin-top: -6px
    font-size: 17px
    text-shadow: 0 2px 0px black
@media screen and (min-width: 800px)
  .dungeonUI
    right: 0
    flex-direction: column
    width: 336px
    height: calc(100% - 72px)
    padding-top: 25px
    left: initial
    box-sizing: border-box
</style>
