<template>
  <div class="dungeonUI__skillsMenuList" v-if="show">
    <div class="dungeonUI__skillsMenuTabs" :class="{'--right': !isItems}">
      <div class="dungeonUI__skillsMenuTabOption" @click="changeTab(true)">
        <span>Items</span>
      </div>
      <div class="dungeonUI__skillsMenuTabOption" @click="changeTab(false)">
        <span>Skills</span>
      </div>
    </div>
    <div class="dungeonUI__skillsMenuBody">
      <item
        v-for="itemName in items"
        :key="'merch-item-' + itemName"
        :name="itemName"
      ></item>
      <skill
          v-for="skillName in skills"
          :key="'skill-item-' + skillName"
          :name="skillName"
      ></skill>
    </div>
    <merchant-dialog
        @close="isItems = true"
    ></merchant-dialog>
  </div>
</template>

<script>
import ItemsData from '@/gamedata/Skills.json'
import merchantDialog from '../Dialogs/MerchantDialog'
import item from './MerchantItem'
import skill from './MerchantSkill'


export default {
  name: "MerchantList",
  components: {
    merchantDialog,
    item,
    skill
  },
  data () {
    return {
      isItems: true
    }
  },
  methods: {
    changeTab: function (isItems) {
      this.isItems = isItems
      // scroll top
      this.$nextTick(() => {
        let scrollingElement = document.querySelector('.dungeonUI__skillsMenuBody')
        scrollingElement.scrollTop = 0
      })
    }
  },
  computed: {
    skills : function () {
      let result = []
      if (!this.isItems) {
        result = Object.keys(ItemsData).filter(x => !this.$store.getters.getPlayerSkills.includes(x))
      }
      return result
    },
    items : function () {
      let result = []
      if (this.isItems) {
        result = this.$store.getters.getMerchant.items
      }
      return result
    },
    show: function () {
      let merchant = this.$store.getters.getMerchant
      return merchant && merchant.show
    }
  }
};
</script>

<style lang="sass" scoped>
.dungeonUI__skillsMenuList
  position: fixed
  top: calc(1.5 * var(--tile-cell))
  background-image: url("../../../assets/ui/dungeonUI__skillsMenuBg.png")
  background-size: auto 100%
  height: calc(100% - (var(--tile-cell) * 5.5))
  z-index: 10
  width: 100%
.dungeonUI__skillsMenuTabs
  background-image: url("../../../assets/ui/dungeonUI__skillsMenuTabLeft.png")
  background-size: 100% 100%
  height: var(--tile-cell)
  width: 100%
  display: flex
  justify-content: center
  &.--right
    background-image: url("../../../assets/ui/dungeonUI__skillsMenuTabRight.png")
    .dungeonUI__skillsMenuTabOption:first-child
      opacity: 0.35
    .dungeonUI__skillsMenuTabOption:last-child
      opacity: 1
.dungeonUI__skillsMenuBody
  height: calc(100% - var(--tile-cell))
  background-image: url("../../../assets/ui/dungeonUI__skillsMenuBorder.png")
  width: 100%
  background-size: 100%
  padding: calc(var(--tile-cell) * 0.5)
  box-sizing: border-box
  overflow-y: scroll
.dungeonUI__skillsMenuTabOption
  display: flex
  align-items: center
  justify-content: center
  color: #FFF
  flex: 1
  &:last-child
    opacity: 0.35
@media screen and (min-width: 900px)
  .dungeonUI__skillsMenuList
    width: 492px
    height: 336px
    right: calc(50% - 250px)
    top: 100px
    border: solid 4px #3f2c11
  ::-webkit-scrollbar
    width: 10px
  ::-webkit-scrollbar-track
    background: #000000
  ::-webkit-scrollbar-thumb
    background: #32220f
  ::-webkit-scrollbar-thumb:hover
    background: #555
  .dungeonUI__skillsMenuTabOption
    cursor: url('../../../assets/ui/cursor__move.png'), auto
</style>
