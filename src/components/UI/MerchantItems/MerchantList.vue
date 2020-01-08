<template>
  <div class="dungeonUI__skillsMenuList" v-if="$store.getters.getMerchant.show">
    <div class="dungeonUI__skillsMenuTabs" :class="{'--right': isPotion}">
      <div class="dungeonUI__skillsMenuTabOption" @click="isPotion = false">
        <span>Items</span>
      </div>
      <div class="dungeonUI__skillsMenuTabOption" @click="isPotion = true">
        <span>Potions</span>
      </div>
    </div>
    <div class="dungeonUI__skillsMenuBody">
      <item
        v-for="itemName in items"
        :key="'merch-item-' + itemName"
        :name="itemName"
      ></item>
    </div>
    <merchant-dialog></merchant-dialog>
  </div>
</template>

<script>
import ItemsData from '@/gamedata/Items.json'
import merchantDialog from '../Dialogs/MerchantDialog'
import item from './MerchantItem'

export default {
  name: "MerchantList",
  components: {
    merchantDialog,
    item
  },
  data () {
    return {
      isPotion: false
    }
  },
  computed: {
    items : function () {
      return this.$store.getters.getMerchant.items.filter(x => {
        if (this.isPotion) {
          return ItemsData[x].type === 'potion'
        }
        return ItemsData[x].type !== 'potion'
      })
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
</style>
