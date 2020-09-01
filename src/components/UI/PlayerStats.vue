<template>
  <div class="playerStats">
    <div :title="`${getPlayer.name} Lvl ${getPlayer.level}`">
      <img class="player-image" :src="imageHero" @click="showInventory">
      <div class="playerStats__lvl">{{ getPlayer.level }}</div>
    </div>
    <status-bar
      title="Health"
      :actual="actualHealth"
      :total="totalLife"
    ></status-bar>
    <div class="score">
      Score: {{ getScore }}
    </div>
    <div class="name">
      {{ getPlayer.name }}
    </div>
    <template v-if="!isMobile">
      <div class="experience">
        <status-bar
                title="Experience"
                :actual="$store.getters.getPlayer.defeatMonsters"
                :total="$store.getters.getPlayer.nextLevelMonsters"
                color="green"
        ></status-bar>
      </div>
      <div class="current-gold" >
        <img :src="goldIcon" alt="">
        {{ $store.getters.getPlayer.gold }}
      </div>
    </template>
  </div>
</template>

<script>
import statusBar from './StatusBar'

export default {
  components: {
    statusBar
  },
  inject: ['isMobile'],
  watch: {
    actualHealth: {
      handler() {
        if (this.actualHealth <= 0) {
          this.$store.commit('setPlayerDead')
        }
      }
    }
  },
  name: "PlayerStats",
  computed: {
    getPlayer: function () {
      return this.$store.getters.getPlayer
    },
    getScore: function () {
      return this.$store.getters.getScore
    },
    imageHero: function () {
      return require(`@/assets/heroes/portraits/${this.getPlayer.image}`)
    },
    actualHealth: function () {
      return this.totalLife - this.getPlayer.damage
    },
    totalLife: function () {
      return this.$store.getters.getPlayerBaseLife + this.$store.getters.getPlayerBuffLife
    },
    goldIcon: function () {
      return require('@/assets/ui/gold__icon.png')
    }
  },
  methods: {
    showInventory: function () {
      if (this.isMobile) {
        this.$store.commit('clickInventory')
      }
    }
  }
}
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
.score
  position: absolute
  left: 45%
  font-size: 0.85rem
  padding-top: calc(0.25 * var(--tile-cell))
.name
  position: absolute
  top: calc(1.5 * var(--tile-cell))
  left: calc(2 * var(--pixel-unit))
  font-size: 20px
  font-weight: bold
  text-shadow: 1px 2px 0 black
@media (min-width: 900px)
  .playerStats
    left: 25px
    top: 12px
    position: fixed
    transform: scale(1.3)
  .experience
    position: relative
    bottom: 54px
  .current-gold
    position: absolute
    left: 5px
    font-size: 1rem
    top: 98px
    display: flex
    align-items: center
    img
      height: 2rem
      padding-right: 5px
  .score
    top: -8px
  .name
    left: 5px
</style>
