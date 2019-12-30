<template>
  <div class="playerStats">
    <img class="player-image" :src="imageHero" @click="showInventory">
    <div class="playerStats__lvl">{{ this.$store.getters.getPlayer.level }}</div>
    <status-bar 
      :actual="actualHealth"
      :total="player.initialHealth + levelDiff"
    ></status-bar>
    <div class="name">
      {{ player.name }}
    </div>
    <div class="playerStats__gold">    
      <img :src="imgGold" title="Gold">
      <div class="text">
        {{ $store.getters.getPlayer.gold }}
      </div>
    </div>
    <div class="row base-stats">
      <img :src="imgAttack" title="Attack">
      <div class="text">
        {{ $store.getters.getPlayer.attack }}
      </div>
      <img :src="imgLevel" title="Monsters defeat">
      <div class="text">
        {{ $store.getters.getPlayer.defeatMonsters }}/{{ $store.getters.getPlayer.nextLevelMonsters }}
      </div>

    </div>
    <div class="row">
    </div>
  </div>
</template>

<script>
import statusBar from './StatusBar'
import heroes from '@/gamedata/Heroes.json'

export default {
  components: {
    statusBar
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
      return require(`@/assets/heroes/portraits/${this.player.image}`)
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
      return (this.player.initialHealth  + this.levelDiff) - this.$store.getters.getPlayer.damage
    },
    levelDiff: function () {
      return this.$store.getters.getPlayer.level * 15
    }
  },
  methods: {
    showInventory: function () {
      this.$store.commit('setShowInventory')
    }
  },
  mounted() {
    this.$store.commit('setPlayerAttack', this.player.attack)
  }
};
</script>

<style scoped lang="sass">
.playerStats
  position: relative
  height: calc(1.5 * var(--tile-cell))
  .player-image
    position: absolute
    height: calc(1.5 * var(--tile-cell))
    width: calc(1.5 * var(--tile-cell))
    display: block
.playerStats__lvl
  position: absolute
  bottom: 0
  left: 0
  height: calc(0.5 * var(--tile-cell))
  width: calc(0.5 * var(--tile-cell))
  box-shadow: inset 0 0 0 calc(1 * var(--pixel-unit)) #0e0c05
  background: #1f1913
  display: flex
  align-items: center
  justify-content: center
  font-size: 18px
  color: #805a29
.statusBar
  left: calc(1.5 * var(--tile-cell))
  top: calc(1 * var(--tile-cell))
.name
  position: absolute
  top: calc(1.5 * var(--tile-cell))
  left: calc(2 * var(--pixel-unit))
  font-size: 20px
  font-weight: bold
  text-shadow: 1px 2px 0px black
.base-stats
  display: none
  img
    height: 30px
    width: 30px
    padding-right: 5px
.text
  padding: 5px 5px 0 0
.playerStats__gold
  position: fixed
  bottom: calc(3.5 * var(--tile-cell))
  z-index: 1
  left: calc(1.5 * var(--tile-cell))
  display: flex
  align-items: center
  img
    margin: 0 2rem 0 1rem
  .text
    color: gold
    font-size: 1.35rem
    line-height: 1rem
</style>
