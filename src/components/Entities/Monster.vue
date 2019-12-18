<template>
  <div class="monster" @click.stop="attack" :class="{'can-attack': canAttack}">
    <img :src="image" alt="">
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
  .can-attack
    cursor: pointer
</style>
