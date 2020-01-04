<template>
  <div class="dungeonUI__skillsMenuList">
    <div class="dungeonUI__skillsMenuTabs">
      <div class="dungeonUI__skillsMenuTabOption">
        <span>Active Skills</span>
      </div>
      <div class="dungeonUI__skillsMenuTabOption">
        <span>Pasive Skills</span>
      </div>
    </div>
    <div class="dungeonUI__skillsMenuBody">
      <div class="dungeonUI__skillsMenuItem">
        <div class="dungeonUI__skillsMenuImg"></div>
        <div class="dungeonUI__skillsMenuDescription">
          <div class="dungeonUI__skillsMenuItemTitle">
            <span>Black Fire</span>
          </div>
          <div class="dungeonUI__skillsMenuItemType">
            <span>Magic Damage</span>
          </div>
          <div class="dungeonUI__skillsMenuItemDmg">
            <span>10 Attk</span>
            <span class="aff dark">Dark</span>
            <span class="aff fire">Fire</span>
          </div>
        </div>
      </div>
      <div class="dungeonUI__skillsMenuItem --active">
        <div class="dungeonUI__skillsMenuImg"></div>
        <div class="dungeonUI__skillsMenuDescription">
          <div class="dungeonUI__skillsMenuItemTitle">
            <span>Black Fire</span>
          </div>
          <div class="dungeonUI__skillsMenuItemType">
            <span>Magic Damage</span>
          </div>
          <div class="dungeonUI__skillsMenuItemDmg">
            <span>10 Attk</span>
            <span class="aff dark">Dark</span>
            <span class="aff fire">Fire</span>
          </div>
        </div>
      </div>
      <div class="dungeonUI__skillsMenuItem">
        <div class="dungeonUI__skillsMenuImg"></div>
        <div class="dungeonUI__skillsMenuDescription">
          <div class="dungeonUI__skillsMenuItemTitle">
            <span>Black Fire</span>
          </div>
          <div class="dungeonUI__skillsMenuItemType">
            <span>Magic Damage</span>
          </div>
          <div class="dungeonUI__skillsMenuItemDmg">
            <span>10 Attk</span>
            <span class="aff dark">Dark</span>
            <span class="aff fire">Fire</span>
          </div>
        </div>
      </div>
      <div class="dungeonUI__skillsMenuItem">
        <div class="dungeonUI__skillsMenuImg"></div>
        <div class="dungeonUI__skillsMenuDescription">
          <div class="dungeonUI__skillsMenuItemTitle">
            <span>Black Fire</span>
          </div>
          <div class="dungeonUI__skillsMenuItemType">
            <span>Magic Damage</span>
          </div>
          <div class="dungeonUI__skillsMenuItemDmg">
            <span>10 Attk</span>
            <span class="aff dark">Dark</span>
            <span class="aff fire">Fire</span>
          </div>
        </div>
      </div>
      <div class="dungeonUI__skillsMenuItem">
        <div class="dungeonUI__skillsMenuImg"></div>
        <div class="dungeonUI__skillsMenuDescription">
          <div class="dungeonUI__skillsMenuItemTitle">
            <span>Black Fire</span>
          </div>
          <div class="dungeonUI__skillsMenuItemType">
            <span>Magic Damage</span>
          </div>
          <div class="dungeonUI__skillsMenuItemDmg">
            <span>10 Attk</span>
            <span class="aff dark">Dark</span>
            <span class="aff fire">Fire</span>
          </div>
        </div>
      </div>
      <div class="dungeonUI__skillsMenuItem">
        <div class="dungeonUI__skillsMenuImg"></div>
        <div class="dungeonUI__skillsMenuDescription">
          <div class="dungeonUI__skillsMenuItemTitle">
            <span>Black Fire</span>
          </div>
          <div class="dungeonUI__skillsMenuItemType">
            <span>Magic Damage</span>
          </div>
          <div class="dungeonUI__skillsMenuItemDmg">
            <span>10 Attk</span>
            <span class="aff dark">Dark</span>
            <span class="aff fire">Fire</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "dungeonUI__skillsMenu",
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
.dungeonUI__skillsMenuItem
  display: flex
  color: #C4C4C4
  min-height: calc(var(--tile-cell) * 1)
  border-bottom: var(--pixel-unit) solid #111111
  padding-bottom: calc(var(--tile-cell) * .25)
  margin-bottom: calc(var(--tile-cell) * .25)
  &.--active
    .dungeonUI__skillsMenuImg
      box-shadow: inset 0 0 0 var(--pixel-unit) #805a29
  &:last-child
    border-bottom: none
.dungeonUI__skillsMenuItemTitle
  font-size: 22px
.dungeonUI__skillsMenuImg
  height: calc(var(--tile-cell) * 1.25)
  min-width: calc(var(--tile-cell) * 1.25)
  box-shadow: inset 0 0 0 var(--pixel-unit) #2c261f
  background-image: url("../../../assets/skills/blackFire.png")
  background-size: 100% 100%
  margin-right: calc(var(--tile-cell) * .5)
.dungeonUI__skillsMenuItemType
  margin: 10px 0
.dungeonUI__skillsMenuItemDmg
  display: flex
  font-size: 19px
.dungeonUI__skillsMenuDescription
  min-height: calc(var(--tile-cell) * 1.25)
  display: flex
  flex-direction: column
  justify-content: flex-start
  box-sizing: border-box
.aff
  margin-left: 10px
  &:before 
    content: ''
    display: inline-block
    width: 10px
    height: 10px
    margin-right: 10px
    background-color: #363433
  &.fire
    &:before 
      background-color: #FB3C00
</style>