<template>
  <div>
    <div class="dungeonUI__skillsBar">
      <skill-item
              v-for="(skill, index) in skills"
              :skill-name="skill"
              :skill-id="index + 1"
              :key="'skill' + index"
      ></skill-item>
    </div>
  </div>
</template>

<script>
import SkillItem from './SkillItem'

export default {
  name: "SkillList",
  inject: ['isMobile'],
  components: {
    SkillItem
  },
  computed: {
    skills: function () {
      let skillList = []
      this.$store.getters.getPlayerSkills.forEach(skill => {
        skillList.push(skill)
      })
      return skillList
    }
  }
}
</script>

<style scoped lang="sass">
.dungeonUI__skillsBar
  height: var(--tile-600)
  width: var(--tile)
  display: flex
  flex-wrap: wrap
  box-sizing: border-box
  flex-direction: column-reverse
  right: 0
  bottom: 0
  z-index: 100
  position: fixed
@media screen and (min-width: 900px)
  .dungeon .dungeonUI__skills
    display: flex
    left: calc(50% - 150px)
    position: fixed
    bottom: 60px
    z-index: 3
</style>
