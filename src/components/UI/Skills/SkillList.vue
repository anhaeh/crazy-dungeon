<template>
  <div class="dungeonUI__skills">
    <skill-item
        v-for="(skill, index) in skills"
        :skill-name="skill"
        :key="'skill' + index"
    ></skill-item>
  </div>
</template>

<script>
import SkillItem from './SkillItem'

export default {
  name: "SkillList",
  components: {
    SkillItem
  },
  data() {
    return {
      skills: []
    }
  },
  methods: {
    setSkills: function () {
      let skillList = []
      this.$store.getters.getPlayer.skills.forEach(skill => {
        skillList.push(skill)
      })
      for (let i = skillList.length; i < 6 ; i++ ) {
        skillList.push(null)
      }
      this.skills = skillList
    }
  },
  mounted() {
    this.setSkills()
  }
}
</script>

<style scoped lang="sass">
.dungeonUI__skills
  height: calc(2.5 * var(--tile-cell))
  width: calc(4 * var(--tile-cell))
  display: flex
  flex-wrap: wrap
  padding: calc(3 * var(--pixel-unit)) calc(5 * var(--pixel-unit))
  box-sizing: border-box
  align-items: space-between
  justify-content: space-between

</style>
