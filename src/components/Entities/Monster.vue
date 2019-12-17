<template>
  <div class="monster" @click.stop="attack" :class="{'can-attack': canAttack}">
    <img :src="image" alt="">
    <div>
      <div class="life" :style="life"></div>
      <div class="life-background"></div>
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
  data () {
    return {
      monster: MonstersData[this.name],
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
    life: function() {
      let percent = (this.health * 100) / this.initialHealth
      return `width: ${percent}%`;
    }
  },
  created() {
      this.health = this.monster.health
      this.initialHealth = this.monster.health
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
  .life
    top: -10px
    left: 2px
    height: 6px
    background: #3e9933
    z-index: 2
    position: relative
  .life-background
    width: 100%
    top: -16px
    left: 2px
    height: 6px
    background: red
    z-index: 1
    position: relative
  .can-attack
    cursor: pointer
</style>
