<template>
  <div class="dungeonUI__statsMenuList">
    <img src="../../../assets/ui/dungeonUI__statsBorder.png" alt="" width="100%" class="dungeonUI__statsBorder">
    <div class="dungeonUI__statsMenuBody">
      <div class="span-title">Active Modifiers</div>
      <div class="dungeonUI__statsActiveModifiers" v-show="false">
        <div class="dungeonUI__statsActive --burn"></div>
        <div class="dungeonUI__statsActive --burn"></div>
        <div class="dungeonUI__statsActive --burn"></div>
        <div class="dungeonUI__statsActive --burn"></div>
        <div class="dungeonUI__statsActive --burn"></div>
      </div>
      <div class="dungeonUI__statsBar">
        <div class="dungeonUI__statsLabel --att"></div>
        <div class="dungeonUI__statsBaseValue">{{ $store.getters.getPlayer.attack }}</div>
        <div class="dungeonUI__statsBarBorder">
          <div class="dungeonUI__statsBarGraph --att"></div>
          <div class="dungeonUI__statsBarGraph --equip"></div>
          <div class="dungeonUI__statsBarGraph --buff"></div>
          <div class="dungeonUI__statsBarGraph --debuff"></div>
        </div>
        <div class="dungeonUI__statsTotalValue">{{ $store.getters.getPlayerAttack }}</div>
      </div>
      <div class="dungeonUI__statsBar">
        <div class="dungeonUI__statsLabel --health"></div>
        <div class="dungeonUI__statsBaseValue">{{ $store.getters.getPlayerBaseLife }}</div>
        <div class="dungeonUI__statsBarBorder">
          <div class="dungeonUI__statsBarGraph --def"></div>
          <div class="dungeonUI__statsBarGraph --equip"></div>
          <div class="dungeonUI__statsBarGraph --buff"></div>
          <div class="dungeonUI__statsBarGraph --debuff"></div>
        </div>
        <div class="dungeonUI__statsTotalValue">{{ $store.getters.getPlayerBaseLife + $store.getters.getPlayerBuffLife }}</div>
      </div>
      <div class="dungeonUI__statsExp">
        <div class="span-title">Experience</div>
        <status-bar
            :actual="$store.getters.getPlayer.defeatMonsters"
            :total="$store.getters.getPlayer.nextLevelMonsters"
            color="green"
        ></status-bar>
      </div>
      <div class="dungeonUI__statsExp">
        <div class="span-title">Gold Multiplier: {{ goldMultiplier }}%</div>
      </div>
      <div class="dungeonUI__statsBar" v-show="false">
        <div class="dungeonUI__statsLabel --mAtt"></div>
        <div class="dungeonUI__statsBaseValue">12</div>
        <div class="dungeonUI__statsBarBorder">
          <div class="dungeonUI__statsBarGraph --mAtt"></div>
          <div class="dungeonUI__statsBarGraph --equip"></div>
          <div class="dungeonUI__statsBarGraph --buff"></div>
          <div class="dungeonUI__statsBarGraph --debuff"></div>
        </div>
        <div class="dungeonUI__statsTotalValue">92</div>
      </div>
      <div class="dungeonUI__statsBar" v-show="false">
        <div class="dungeonUI__statsLabel --mDef"></div>
        <div class="dungeonUI__statsBaseValue">23</div>
        <div class="dungeonUI__statsBarBorder">
          <div class="dungeonUI__statsBarGraph --mDef"></div>
          <div class="dungeonUI__statsBarGraph --equip"></div>
          <div class="dungeonUI__statsBarGraph --buff"></div>
          <div class="dungeonUI__statsBarGraph --debuff"></div>
        </div>
        <div class="dungeonUI__statsTotalValue">81</div>
      </div>
    </div>
  </div>
</template>

<script>
import statusBar from '../StatusBar'

export default {
  name: "DisplaySkillsMenu",
  components: {
    statusBar
  },
  computed: {
    goldMultiplier: function () {
      return Math.round(this.$store.getters.getPlayerGoldMultiplier * 100)
    }
  }
};
</script>

<style lang="sass">
$color-att: #ea5b3d
$color-def: #4CAD55
$color-mAtt: #045793
$color-mDef: #911DBA

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
.dungeonUI__statsBorder
  position: absolute
  top: 0
  left: 0
.dungeonUI__statsMenuBody
  height: 100%
  background-image: url("../../../assets/ui/dungeonUI__skillsMenuBorder.png")
  width: 100%
  background-size: 100%
  padding: calc(var(--tile-cell) * 0.25) 0
  box-sizing: border-box
  overflow-y: scroll
.dungeonUI__statsActiveModifiers
  border-bottom: 3px solid #3a3a3a
  box-shadow: 0 4px 0px 0px #151515
  width: calc(100% - 50px)
  padding: 0 1rem
  margin: 0 auto
  display: flex
  align-items: center
.dungeonUI__statsActive
  height: var(--tile-cell)
  width: var(--tile-cell)
  background-image: url("../../../assets/ui/--burn.png")
  background-size: 100% 100%
.dungeonUI__statsBar
  display: flex
  height: var(--tile-cell)
  width: calc(var(--tile-cell) * 6)
  margin: calc(var(--tile-cell) * .25) auto
.dungeonUI__statsLabel, .dungeonUI__statsBaseValue, .dungeonUI__statsTotalValue
  height: var(--tile-cell)
  width: var(--tile-cell)
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
.dungeonUI__statsBarBorder
  height: var(--tile-cell)
  width: calc(var(--tile-cell) * 3)
  background-image: url("../../../assets/ui/dungeonUI__statsBarBorder.png")
  background-size: 100% 100%
  display: flex
  align-items: center
  padding: calc(4 * var(--pixel-unit)) calc(3 * var(--pixel-unit))
  box-sizing: border-box
.dungeonUI__statsBarGraph
  width: 0
  height: 100%
  &.--att
    background-color: $color-att
    width: 30px // Stats max value 120pt
    ~ .--equip
      background-color: darken($color-att, 20%)
      width: 30px // Stats max value 120pt
    ~ .--buff
      background-color: lighten($color-att, 20%)
      width: 15px // Stats max value 120pt
  &.--def
    background-color: $color-def
    width: 20px // Stats max value 120pt
    ~ .--equip
      background-color: darken($color-def, 20%)
      width: 10px // Stats max value 120pt
    ~ .--buff
      background-color: lighten($color-def, 20%)
      width: 5px // Stats max value 120pt
  &.--mAtt
    background-color: $color-mAtt
    width: 50px // Stats max value 120pt
    ~ .--equip
      background-color: darken($color-mAtt, 20%)
      width: 40px // Stats max value 120pt
    ~ .--buff
      background-color: lighten($color-mAtt, 20%)
      width: 25px // Stats max value 120pt
  &.--mDef
    background-color: $color-mDef
    width: 40px // Stats max value 120pt
    ~ .--equip
      background-color: darken($color-mDef, 20%)
      width: 30px // Stats max value 120pt
    ~ .--buff
      background-color: lighten($color-mDef, 20%)
      width: 22px // Stats max value 120pt
  &.--att, &.--def, &.--mAtt, &.--mDef
    ~ .--debuff
      background-color: #333
      width: 15px // Stats max value 120pt
.span-title
  color: white
  margin: calc(var(--tile-cell) * .25)
  text-align: center
.dungeonUI__statsHealth, .dungeonUI__statsExp
  margin-top: calc(var(--tile-cell) * .5)
  color: white
  .statusBar
    width: calc(var(--tile-cell) * 6)
    height: calc(var(--tile-cell) * .75)
    margin: 0 auto
    background-size: 100% 100%
  .statusCurrent
    background-size: 100% 100%
</style>

<style lang="sass">
.dungeonUI__statsExp .legend
  left: calc(45 * var(--pixel-unit))
  top: calc(4 * var(--pixel-unit))
.dungeonUI__statsExp .statusCurrent
  margin: 0 5px
</style>
