<template>
  <div class="playerStats">
    <img class="player-image" :src="imageHero" @click="showInventory">
    <div class="playerStats__lvl">{{ getPlayer.level }}</div>
    <status-bar
      :actual="actualHealth"
      :total="player.initialHealth + levelDiff"
    ></status-bar>
    <div class="name">
      {{ player.name }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
      player: {}
    }
  },
  name: "PlayerStats",
  computed: {
    ...mapGetters([
      'getPlayer',
      'getPlayerAttack'
    ]),
    imageHero: function () {
      return require(`@/assets/heroes/portraits/${this.player.image}`)
    },
    imgAttack: function () {
      return require(`@/assets/ui/Attack.png`)
    },
    actualHealth: function () {
      return (this.player.initialHealth  + this.levelDiff) - this.getPlayer.damage
    },
    levelDiff: function () {
      return this.getPlayer.level * 15
    }
  },
  methods: {
    showInventory: function () {
      this.$store.commit('setShowInventory')
    }
  },
  created() {
    this.player = heroes[this.getPlayer.class]
    this.$store.commit('setPlayerBaseAttack', this.player.attack)
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
</style>
