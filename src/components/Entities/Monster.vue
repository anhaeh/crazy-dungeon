<template>
  <div class="monster"
       @click="click"
       :class="[{ 'can-target': canTarget }, { 'is-target': isTarget && isLive}]"
  >
    <img :src="image">
    <div v-if="isLive">
      <div class="level">{{ getMonster.level }}</div>
      <template v-if="damage">
        <span class="damage" v-if="counterDamage">-{{ counterDamage }}</span>
        <div class="life" :style="life"></div>
        <div class="life-background"></div>
      </template>
    </div>
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
    getDungeon: {
      immediate: true,
      handler () {
        this.monster = MonstersData[this.name]
      }
    },
    isLive: {
      handler () {
        this.timeout = setTimeout(() => {
          this.destroyMonster()
        }, 1000)
      }
    },
    damage: function(newVal, oldVal) {
      this.counterDamage = 0
      clearTimeout(this.timeoutDamage)
      this.$nextTick(()=> {
        this.counterDamage = Math.abs(oldVal - newVal)
        this.timeoutDamage = setTimeout(() => {
          this.counterDamage = 0
          clearTimeout(this.timeoutDamage)
        }, 500)
      })
    }
  },
  data () {
    return {
      monster: null,
      timeout: null,
      timeoutDamage: null,
      counterDamage: 0
    }
  },
  methods: {
    click: function() {
      if (this.canTarget && this.isLive) {
        if (this.isTarget) {
          this.$store.dispatch('attack')
        } else {
          this.$store.commit('setMonsterSelected', {
            cellId: this.cellId,
            monster: this.monster,
            totalLife: this.totalLife,
            level: this.getMonster.level
          })
        }
      } else if (!this.isLive) {
        clearTimeout(this.timeout)
        this.destroyMonster()
      } else {
        this.$store.commit('setMonsterSelected', null)
      }
    },
    destroyMonster: function () {
      this.getMonster.isLive = false
    }
  },
  computed: {
    getDungeon: function () {
      return this.$store.getters.getDungeon
    },
    image: function () {
      let imageExtension = this.isLive ? '.gif' :'_death.gif'
      return require('@/assets/monsters/' + this.monster.image + imageExtension)
    },
    canTarget: function () {
      return this.$store.getters.getPlayerRange.indexOf(this.cellId) !== -1
    },
    isTarget: function () {
      let monsterTarget = this.$store.getters.getMonsterSelected
      return monsterTarget && monsterTarget.cellId === this.cellId
    },
    totalLife: function () {
      return this.monster.health + (10 * + this.getMonster.level)
    },
    life: function() {
      let percent = ((this.totalLife - this.getMonster.damage) * 100) / this.totalLife
      if (percent < 0) {
        percent = 0
      }
      return `width: ${percent}%`
    },
    getMonster: function () {
      return this.$store.getters.getMonsters.find(x => x.cellId === this.cellId)
    },
    isLive: function () {
      return this.totalLife > this.getMonster.damage
    },
    damage: function () {
      return this.getMonster.damage
    }
  }
}
</script>

<style scoped lang="sass">
  .monster
    position: relative
    padding: 4px
    img
      width: 100%
      height: 100%
      object-fit: contain
      filter: drop-shadow(0px 0px 2px black)
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
  .life
    bottom: 4px
    left: 0
    height: 3px
    background: rgb(150, 0, 0)
    z-index: 2
    position: absolute
    width: 100%
  .life-background
    bottom: 4px
    left: 0
    height: 3px
    background: rgba(0, 0, 0, 0.8)
    z-index: 1
    position: absolute
    width: 100%
  .can-target
    cursor: cell
  .is-target
    img
      filter: drop-shadow(0px 0px 3px red)
      -webkit-transition: .2s ease-in-out
      transition: .2s ease-in-out
  .damage
    color: red
    position: absolute
    z-index: 5
    top: -2px
    text-shadow: 0 2px 0 black
    -webkit-animation: counterAnimation 0.5s ease-out
    animation: counterAnimation 0.5s ease-out
</style>
