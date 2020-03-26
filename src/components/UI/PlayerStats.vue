<template>
  <div class="playerStats">
    <div class="playerStats__portraitFrame" :title="`${getPlayer.name} Lvl ${getPlayer.level}`">
      <img class="playerStats__portrait" :src="imageHero" @click="showInventory">
      <div class="playerStats__lvl"><span>{{ getPlayer.level }}</span></div>
    </div>
    <status-bar
      title="Health"
      :actual="actualHealth"
      :total="totalLife"
    ></status-bar>
    <template v-if="!isMobile">
      <status-bar
              title="Experience"
              :actual="$store.getters.getPlayer.defeatMonsters"
              :total="$store.getters.getPlayer.nextLevelMonsters"
              color="green"
      ></status-bar>
      <div class="current-gold" >
        <img :src="goldIcon" alt="">
        {{ $store.getters.getPlayer.gold }}
      </div>
    </template>
    <div class="score">
      Score: {{ getScore }}
    </div>
    <div class="name">
      {{ getPlayer.name }}
    </div>
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
.playerStats__portrait
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
  display: flex
  align-items: center
  justify-content: center
  font-size: 18px
  color: #805a29
.statusBar
  left: calc(1.5 * var(--tile-cell))
  top: calc(1 * var(--tile-cell))
.score
  position: fixed
  left: 0
  right: 0
  top: 20px
  text-align: center
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
    left: 0
    top: 0
    position: fixed
    height: calc(2 * var(--tile-cell))
    width: calc(7 * var(--tile-cell))    
  .playerStats__portraitFrame
    height: calc(2 * var(--tile-cell))
    width: calc(2 * var(--tile-cell))
    background-image: url("../../assets/ui/portrait_hero.png")
    background-size: 100% 100%
    position: relative
  .playerStats__portrait
    height: 100%
    width: 100%
    position: absolute
    left: 0
    top: 0
    z-index: -1
  .playerStats__lvl
    height: calc(var(--pixel-unit) * 21)
    width: calc(var(--pixel-unit) * 21)
    z-index: -1
    background-color: rgba(0,0,0,0.5)
  .statusBar
    background-size: 100% 100%
    background-color: rgba(0,0,0,0.5)
  .current-gold
    position: absolute
    left: calc(2.125 * var(--tile-cell))
    font-size: 1rem
    top: calc(1.125 * var(--tile-cell))
    display: flex
    align-items: center
    img
      padding-right: 5px
  .score
    top: -8px
  .name
    top: calc(2 * var(--tile-cell))
    left: 5px
</style>
