<template>
  <div class="dungeonUI__skillsMenuItem">
    <div class="dungeonUI__skillsMenuImg">
      <img :src="image" alt="">
    </div>
    <div class="dungeonUI__skillsMenuDescription">
      <div class="dungeonUI__skillsMenuItemTitle">
        <span>{{ skill.name }}</span>
      </div>
      <div class="dungeonUI__skillsMenuItemType">
        <span>{{ skill.type }}</span>
      </div>
      <div class="dungeonUI__skillsMenuItemDmg">
        <span>{{ skill.description }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    skill: {
      required: true
    }
  },
  name: "DisplayPassiveSkillItem",
  computed: {
    image: function () {
      return require(`@/assets/skills/${this.skill.image}`)
    },
  }
}
</script>

<style lang="sass" scoped>
.dungeonUI__skillsMenuItem
  display: flex
  justify-content: center
  align-items: center
  color: #C4C4C4
  min-height: calc(var(--tile-cell) * 1)
  border-bottom: var(--pixel-unit) solid #111111
  padding-bottom: calc(var(--tile-cell) * .25)
  margin-bottom: calc(var(--tile-cell) * .25)
  img
    width: 100%
    height: 100%
    object-fit: contain
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
  margin-right: calc(var(--tile-cell) * .5)
.dungeonUI__skillsMenuItemType
  margin: 10px 0
.dungeonUI__skillsMenuItemDmg
  display: flex
  font-size: 19px
.dungeonUI__skillsMenuDescription
  min-width: 70%
  min-height: calc(var(--tile-cell) * 1.25)
  display: flex
  flex-direction: column
  justify-content: flex-start
  box-sizing: border-box
</style>
