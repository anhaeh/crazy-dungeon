<template>
  <div class="monster"
       @click="click"
       :class="[{ 'can-target': canTarget }, { 'is-target': isTarget && isLive}]"
  >
    <img v-if="isLive" :src="image" alt="">
    <img v-else :src="imageDeath" alt="">
    <div v-if="isLive">
      <div class="level">{{ monster.level }}</div>
      <div class="life" :style="life"></div>
      <div class="life-background"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MonstersData from '@/gamedata/Monsters.json'

export default {
  name: "Monster",
  props: {
    cellId: { required: true },
    name: { required: true }
  },
  watch: {
    getRoom: {
      immediate: true,
      handler () {
        this.monster = MonstersData[this.name]
      }
    },
    isLive: {
      handler () {
        setTimeout(() => {
          let monsters = Object.assign({}, this.$store.getters.getMonsters)
          delete monsters[this.cellId]
          this.$store.commit('setMonsters', monsters)
        }, 1000)
      }
    }
  },
  data () {
    return {
      monster: null
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
            monster: this.monster
          })
        }
      } else {
        this.$store.commit('setMonsterSelected', null)
      }
    }
  },
  computed: {
    ...mapGetters([
      'getMonsterSelected',
      'getPlayerRange',
      'getRoom',
      'getMonstersDamage'
    ]),
    image: function () {
      return require('@/assets/monsters/' + this.monster.image + '.gif')
    },
    imageDeath: function () {
      return require('@/assets/monsters/' + this.monster.image + '_death.gif')
    },
    canTarget: function () {
      return this.getPlayerRange.indexOf(this.cellId) !== -1
    },
    isTarget: function () {
      return this.getMonsterSelected && this.getMonsterSelected.cellId === this.cellId
    },
    damage: function () {
      return this.getMonstersDamage[this.cellId]
    },
    life: function() {
      let percent = ((this.monster.health - this.damage) * 100) / this.monster.health
      if (percent < 0) {
        percent = 0
      }
      return `width: ${percent}%`
    },
    isLive: function () {
      return this.monster.health > this.damage
    }
  }
}
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
  .can-target
    cursor: cell
  .is-target
    filter: drop-shadow(2px 7px 7px red)
</style>
