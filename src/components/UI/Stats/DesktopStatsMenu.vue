<template>
  <div class="dungeonUI__statsMenuList">
    <div class="dungeonUI__statsMenuBody">
      <div class="dungeonUI__statsBar" title="Attack">
        <div class="dungeonUI__statsLabel --att"></div>
        <div class="dungeonUI__statsBaseValue">{{ $store.getters.getPlayer.attack }}</div>
        <div class="dungeonUI__statsTotalValue">{{ $store.getters.getPlayerAttack }}</div>
      </div>
      <div class="dungeonUI__statsBar" title="Health">
        <div class="dungeonUI__statsLabel --health"></div>
        <div class="dungeonUI__statsBaseValue">{{ $store.getters.getPlayerBaseLife }}</div>
        <div class="dungeonUI__statsTotalValue">{{ $store.getters.getPlayerBaseLife + $store.getters.getPlayerBuffLife }}</div>
      </div>
    </div>
    <div class="dungeonUI__statsMenuBody">
      <div class="dungeonUI__statsBar">
        <div class="dungeonUI__statsBaseValue stat-title">Critical chance</div>
        <div class="dungeonUI__statsTotalValue stat-title --counter">{{ criticalChance }}%</div>
      </div>
      <div class="dungeonUI__statsBar">
        <div class="dungeonUI__statsBaseValue stat-title">Gold Multiplier</div>
        <div class="dungeonUI__statsTotalValue stat-title --counter">{{ goldMultiplier }}%</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "DesktopSkillsMenu",
  computed: {
    goldMultiplier: function () {
      return Math.round(this.$store.getters.getPlayerGoldMultiplier * 100)
    },
    criticalChance: function () {
      return Math.trunc(this.$store.getters.getPlayerCritical * 100)
    }

  }
};
</script>

<style lang="sass" scoped>
$color-att: #ea5b3d
$color-def: #4CAD55
$color-mAtt: #045793
$color-mDef: #911DBA

.dungeonUI__statsMenuList
  position: fixed
  display: flex
  bottom: 5px
  right: 0
  z-index: 3
.dungeonUI__statsBar
  display: flex
  height: var(--tile-cell)
  width: 165px
  justify-content: center
.stat-title
    font-size: 1rem !important
    width: 100px !important
    &.--counter
      width: 50px !important
.dungeonUI__statsLabel, .dungeonUI__statsBaseValue, .dungeonUI__statsTotalValue
  height: auto
  width: 50px
  background-size: 100% 100%
.dungeonUI__statsLabel
  &.--att
    background-image: url("../../../assets/ui/dungeonUI__statsLabel--att.png")
  &.--def
    background-image: url("../../../assets/ui/dungeonUI__statsLabel--def.png")
  &.--health
    background-image: url("../../../assets/ui/dungeonUI__statsLabel--health.png")
  &.--mAtt
    background-image: url("../../../assets/ui/dungeonUI__statsLabel--mAtt.png")
  &.--mDef
    background-image: url("../../../assets/ui/dungeonUI__statsLabel--mDef.png")
.dungeonUI__statsBaseValue, .dungeonUI__statsTotalValue
  color: #666
  font-size: 1.75rem
  display: flex
  align-items: center
  justify-content: center
  background-image: url("../../../assets/ui/dungeonUI__statsBaseValue.png")
.dungeonUI__statsTotalValue
  color: white
  background-image: url("../../../assets/ui/dungeonUI__statsTotalValue.png")
.span-title
  color: white
  text-align: center
</style>

