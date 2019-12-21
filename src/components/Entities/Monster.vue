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
        this.health = this.monster.health
        this.initialHealth = this.monster.health
      }
    }
  },
  data () {
    return {
      monster: null,
      health: 0,
      initialHealth: 0
    }
  },
  methods: {
    attack: function() {
      if (this.canAttack) {
        this.health -= this.$store.getters.getPlayerAttack
        if (this.health <= 0) {
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
      return this.$store.getters.getPlayerViewport.indexOf(this.cellId) !== -1
    },
    life: function() {
      let percent = (this.health * 100) / this.initialHealth
      return `width: ${percent}%`
    },
    actualRoom: function () {
      return this.$store.getters.getRoom
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
    float: left
    height: 17px
    width: 17px
    background: #00000087
    z-index: 3
    position: absolute
    color: white
    border-radius: 32px
    font-size: 13px
    display: -webkit-box
    display: -ms-flexbox
    display: flex
    -webkit-box-pack: center
    -ms-flex-pack: center
    justify-content: center
    font-weight: bold
    align-items: center
  .life
    bottom: 0
    left: 0
    height: 4px
    background: #3e9933
    z-index: 2
    position: fixed
    width: 100%
  .life-background
    bottom: 0
    height: 4px
    background: red
    z-index: 1
    position: fixed
    width: 100%
  .can-attack
    cursor: cell
</style>
