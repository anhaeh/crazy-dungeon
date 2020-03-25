<template>
  <div class="dungeonUI__skillSlot"
       :id="'skill-' + skillId"
       @click="use"
       :title="skill ? `${skill.name} - ${skill.description}`: ''"
  >
    <span class="skill-id">{{ skillId }}</span>
    <template v-if="skill">
      <span class="skillPoints">{{ usages }}/{{ skill.points }}</span>
      <img :src="image">
      <div v-show="isDisabled" class="isDisabled"></div>
    </template>
  </div>
</template>

<script>
import skillData from '@/gamedata/Skills.json'

export default {
  name: "SkillItem",
  props: {
    skillName: {
      required: false,
      default: null
    },
    skillId: {
      required: true
    }
  },
  data() {
    return {
      usages: 0
    }
  },
  watch: {
    playerLevel: {
      immediate: true,
      handler() {
        this.setUsages()
      }
    },
    skillName: {
      handler() {
        this.setUsages()
      }
    }
  },
  computed: {
    skill: function () {
      return this.skillName ? skillData[this.skillName] : null
    },
    image: function () {
      return require(`@/assets/skills/${this.skill.image}`)
    },
    isDisabled: function () {
      return this.usages === 0 ||
        (this.skill.type !== 'Healing' && !this.isMonsterTarget) ||
        (this.skill.type === 'Healing' && this.$store.getters.getPlayer.damage === 0)
    },
    isMonsterTarget: function() {
      return this.$store.getters.getMonsterSelected
    },
    playerLevel: function () {
      return this.$store.getters.getPlayer.level
    }
  },
  methods: {
    setUsages: function () {
      this.usages = this.skillName ? this.skill.points : 0
    },
    use: function () {
      if (this.usages !== 0 && !this.isDisabled) {
        this.$store.commit('pushLog', 'Player use ' + this.skill.name)
        this.usages -= 1
        if (this.skill.type === 'Melee') {
          this.attack()
        } else if (this.skill.type === 'Drain') {
          this.drain()
        } else if (this.skill.type === 'Range') {
          this.attack(true)
        } else {
          this.heal()
        }
      }
    },
    heal: function () {
      let counterToHeal = Math.ceil(
        (this.$store.getters.getPlayerBaseLife + this.$store.getters.getPlayerBuffLife) * this.skill.counter
      )
      this.$store.commit('restoreLife', { counter: counterToHeal })
    },
    attack: function (range=false) {
      this.$store.dispatch('attack', { damageSkill: this.skill.counter, range: range })
    },
    drain: function () {
      this.attack()
      let damage = Math.ceil(this.$store.getters.getPlayerAttack * this.skill.drain)
      this.$store.commit('restoreLife', { counter: damage })
    }
  }
}
</script>

<style scoped lang="sass">
.dungeonUI__skillSlot
  height: var(--tile-cell)
  width: var(--tile-cell)
  opacity: 1
  background-image: url("../../../assets/ui/dungeonUI__skillSlot.png")
  background-size: contain
  image-rendering: pixelated
  padding: var(--pixel-unit)
  box-sizing: border-box
  position: relative
  &.--active
    box-shadow: inset 0 0 0 var(--pixel-unit) #c89c01
  img
    width: 100%
    height: 100%
.skillPoints
  position: absolute
  color: white
  bottom: 0
  right: 0
  padding: 0 5px
  background: #0000008c
  margin-bottom: 2px
  margin-right: 2px
.isDisabled
  position: absolute
  height: 100%
  width: 100%
  background: black
  top: 0
  left: 0
  filter: opacity(0.5)
  z-index: 1
.skill-id
  display: none
@media screen and (min-width: 900px)
  .dungeonUI__skillSlot
    padding: 6px
  img
    cursor: url('../../../assets/ui/cursor__move.png'), auto
  .skill-id
    display: block
    position: absolute
    top: 2px
    color: #dadada
    z-index: 2
</style>
