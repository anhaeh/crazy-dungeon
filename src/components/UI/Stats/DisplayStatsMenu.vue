<template>
  <div class="dungeonUI__statsMenuList">
    <img src="../../../assets/ui/dungeonUI__statsBorder.png" alt="" width="100%" class="borderTop">
    <div class="dungeonUI__statsMenuBody">
      <div class="dungeonUI__statsActiveModifiers">
        <div class="dungeonUI__statsActive --burn"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DisplaySkillsMenu",
};
</script>

<style lang="sass" scoped>
.dungeonUI__statsMenuList
  position: fixed
  top: calc(1.5 * var(--tile-cell))
  background-image: url("../../../assets/ui/dungeonUI__skillsMenuBg.png")
  background-size: auto 100%
  height: calc(100% - (var(--tile-cell) * 5.5))
  z-index: 10
  display: flex
  flex-direction: column
  width: 100%
.borderTop
  position: absolute
  top: 0
  left: 0
.dungeonUI__statsMenuBody
  height: 100%
  background-image: url("../../../assets/ui/dungeonUI__skillsMenuBorder.png")
  width: 100%
  background-size: 100%
  padding: calc(var(--tile-cell) * 0.25) calc(var(--tile-cell) * 0.5)
  box-sizing: border-box
  overflow-y: scroll
.dungeonUI__statsActive
  height: var(--tile-cell)
  width: var(--tile-cell)
  background-image: url("../../../assets/ui/--burn.png")
  background-size: 100% 100%
</style>
