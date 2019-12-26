<template>
  <div class="monster"
       @click="attack"
       :class="{ 'can-attack': canAttack }"
  >
    <img :src="image" alt="">
    <div class="level">{{ monster.level }}</div>
    <div class="life" :style="life"></div>
    <div class="life-background"></div>
  </div>
</template>

<script>
import MonstersData from '@/gamedata/Monsters.json'

export default {
  name: "Monster",
  props: {
    cellId: { required: true },
    name: { required: true }
  },
  watch: {
    actualRoom: {
      immediate: true,
      handler () {
        this.monster = MonstersData[this.name]
      }
    }
  },
  data () {
    return {
      monster: null,
    }
  },
  methods: {
    attack: function() {
      if (this.canAttack) {
        let monstersDamage = Object.assign({}, this.$store.getters.getMonstersDamage)
        monstersDamage[this.cellId] += this.$store.getters.getPlayerAttack
        this.$store.commit('setMonstersDamage', monstersDamage)
        if (this.damage >= this.monster.health) {
          let monsters = Object.assign({}, this.$store.getters.getMonsters)
          delete monsters[this.cellId]
          this.$store.commit('setMonsters', monsters)
          this.$store.commit('setDefeatMonster', this.monster.gold)
          let player = this.$store.getters.getPlayer
          if (player.defeatMonsters === player.nextLevelMonsters) {
            this.$store.dispatch('levelUp')
          }
        } else {
          this.$store.commit('setPlayerDamage', this.monster.damage)
        }
      }
    }
  },
  computed: {
    image: function () {
      return require('@/assets/monsters/' + this.monster.image)
    },
    canAttack: function () {
      return this.$store.getters.getPlayerRange.indexOf(this.cellId) !== -1
    },
    damage: function () {
      return this.$store.getters.getMonstersDamage[this.cellId]
    },
    life: function() {
      let percent = ((this.monster.health - this.damage) * 100) / this.monster.health
      return `width: ${percent}%`
    },
    actualRoom: function () {
      return this.$store.getters.getRoom
    }
  }
};
</script>

<style scoped lang="sass">
  .monster
    position: relative
    padding: 4px
  .monster img
    width: 100%
    height: 100%
    object-fit: contain
  .level
    top: 0
    left: 0
    height: calc(4 * var(--pixel-unit))
    width: calc(5 * var(--pixel-unit))
    background: #000000eb
    z-index: 3
    position: absolute
    color: #bfa561
    font-size: 16px
    display: flex
    justify-content: center
    font-weight: bold
    align-items: center
    box-shadow: inset 0 0 0 calc(0.5 * var(--pixel-unit)) #1c140c
    color: 
  .life
    bottom: 4px
    left: 0
    height: 3px
    background: rgb(204, 0, 0)
    z-index: 2
    position: absolute
    width: 100%
  .life-background
    bottom: 4px
    left: 0
    height: 3px
    background: rgba(0,0,0,0.8)
    z-index: 1
    position: absolute
    width: 100%
  .can-attack
    cursor: cell
</style>
