<template>
  <div class="desktopUI">
    <div class="background">
    </div>
    <div class="title">
      <h2>Dungeon {{ dungeon }}</h2>
    </div>
    <quest-log></quest-log>
    <skill-list></skill-list>
    <inventory></inventory>
    <merchant-items></merchant-items>
    <display-skills-menu v-show="showSkills"></display-skills-menu>
    <display-stats-menu></display-stats-menu>
    <exit-confirmation v-if="showModalQuit" @close="showModalQuit = false"></exit-confirmation>
    <div class="dungeonUI__retreatBtn"
         title="Exit"
         @click="showModalQuit = true"
    ></div>
  </div>
</template>

<script>
import Inventory from './Inventory'
import QuestLog from './QuestLog'
import SkillList from './Skills/SkillList'
import MerchantItems from './MerchantItems/MerchantList'
import DisplayStatsMenu from './Stats/DesktopStatsMenu'
import DisplaySkillsMenu from './Skills/DisplaySkillsMenu'
import ExitConfirmation from './Dialogs/ExitConfirmation'

export default {
  name: "DesktopUI",
  components: {
    Inventory,
    QuestLog,
    SkillList,
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
  created() {
    this.$store.commit('setShowInventory', true)
  },
  computed: {
    dungeon: function () {
      return this.$store.getters.getDungeon
    }
  }
}
</script>

<style scoped lang="sass">
.dungeonUI
  right: 0
.background
  background-color: black
  width: 200%
  height: 115px
  position: fixed
  bottom: 0
  filter: opacity(0.6)
.title
  width: 300px
  text-align: center
  color: white
  position: fixed
  top: 0
  left: calc(50% - 150px)
.current-gold
  position: absolute
  bottom: 0
  right: 190px
  color: white
.dungeonUI__retreatBtn
  left: -15px
  bottom: 110px
  position: fixed
  background-image: url("../../assets/ui/dungeonUI__retreat.png")
  height: 50px
  width: 100px
  background-size: 100% 100%
  cursor: pointer
</style>
