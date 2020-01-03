<template>
  <div class="dungeonUI__skillSlot" @click="use">
    <template v-if="skill">
      <span class="skillPoints">{{ usages }}/{{ skill.points }}</span>
      <img :src="image">
      <div v-show="disabled" class="disabled"></div>
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
    }
  },
  data() {
    return {
      usages: 0
    }
  },
  computed: {
    skill: function () {
      return this.skillName ? skillData[this.skillName] : null
    },
    image: function () {
      return require(`@/assets/skills/${this.skill.image}`)
    },
    disabled: function () {
      return this.usages === 0 || (this.skill.type === 'attack' && !this.isMonsterTarget)
    },
    isMonsterTarget: function() {
      return this.$store.getters.getMonsterSelected
    }
  },
  methods: {
    use: function () {
      if (this.usages !== 0) {
        this.$store.commit('pushLog', 'Player use ' + this.skill.name)
        let result = true
        if (this.skill.type === 'attack') {
          result = this.attack()
        } else {
          result = this.heal()
        }
        if (result) {
          this.usages -= 1
        }
      }
    },
    heal: function () {
      if (this.$store.getters.getPlayer.damage !== 0) {
        let counterToHeal = this.$store.getters.getPlayerLife * this.skill.counter
        this.$store.commit('restoreLife', { counter: counterToHeal })
        return true
      }
      this.$store.commit('pushLog', `Player has full health`)
      return false
    },
    attack: function () {
      this.$store.dispatch('attack', this.skill.counter)
      return true
    }
  },
  mounted() {
    this.usages = this.skillName ? this.skill.points : 0
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
.disabled
  position: absolute
  height: 100%
  width: 100%
  background: black
  top: 0
  left: 0
  filter: opacity(0.5)
  z-index: 1
</style>
