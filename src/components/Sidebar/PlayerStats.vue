<template>
  <div class="player-stats">
    <div class="row">
      <img class="player-image" :src="imageHero">
      <div class="name">
        {{ player.name }}
        Level {{ this.$store.getters.getPlayer.level }}
      </div>
    </div>
    <div class="row base-stats">
      <img :src="imgAttack" title="Attack">
      <div class="text">
        {{ $store.getters.getPlayer.attack }}
      </div>
      <img :src="imgGold" title="Gold">
      <div class="text">
        {{ $store.getters.getPlayer.gold }}
      </div>
      <img :src="imgLevel" title="Monsters defeat">
      <div class="text">
        {{ $store.getters.getPlayer.defeatMonsters }}/{{ $store.getters.getPlayer.nextLevelMonsters }}
      </div>

    </div>
    <div class="row">
      <health-bar :actual-health="actualHealth" :health="player.initialHealth + levelDiff"></health-bar>
    </div>
  </div>
</template>

<script>
import healthBar from './HealthBar'
import heroes from '@/gamedata/Heroes.json'

export default {
  components: {
    healthBar
  },
  watch: {
    actualHealth: {
      handler() {
        if (this.actualHealth <= 0) {
          this.$store.commit('setPlayerDead')
        }
      }
    }
  },
  data () {
    return {
      player: heroes[this.$store.getters.getPlayer.class]
    }
  },
  name: "PlayerStats",
  computed: {
    imageHero: function () {
      return require(`@/assets/heroes/${this.player.image}`)
    },
    imgAttack: function () {
      return require(`@/assets/ui/Attack.png`)
    },
    imgGold: function () {
      return require(`@/assets/ui/Gold.png`)
    },
    imgLevel: function () {
      return require(`@/assets/ui/Level.png`)
    },
    actualHealth: function () {
      return (this.player.initialHealth) - this.$store.getters.getPlayer.damage + this.levelDiff
    },
    levelDiff: function () {
      return (this.$store.getters.getPlayer.level * 15)
    }
  },
  mounted() {
    this.$store.commit('setPlayerAttack', this.player.attack)
  }
}
</script>

<style scoped lang="sass">
  .row
    margin: 15px
    display: flex
    justify-content: center
  .player-stats img
    display: block
    width: 60px
    height: 60px
  .name
    padding: 25px
    font-size: 20px
    font-weight: bold
  .base-stats img
    height: 30px
    width: 30px
    padding-right: 5px
  .text
    padding: 5px 5px 0 0
</style>
