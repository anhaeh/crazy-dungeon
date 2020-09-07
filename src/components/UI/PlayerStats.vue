<template>
  <div class="playerStats">
    <div :title="`${getPlayer.name} Lvl ${getPlayer.level}`" class="playerStats__portrait --border3">
      <img :src="imageHero" @click="showInventory">
    </div>
    <div class="playerStats__lvl --border3">{{ getPlayer.level }}</div>
    <div class="playerStats__attack --border3">
      <img :src="require('../../assets/ui/attack.png')" alt="">
      <span>{{ getPlayer.attack }}</span>
    </div>
    <status-bar
      title="Health"
      :actual="actualHealth"
      :total="totalLife"
      :modifier="'--player --vertical'"
    ></status-bar>
<!--     <div class="score">
      Score: {{ getScore }}
    </div> -->
<!--     <div class="name">
      {{ getPlayer.name }}
    </div> -->
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

<style lang="sass">
.playerStats
  position: relative
  display: flex
  .score
    position: absolute
    left: 45%
    font-size: 0.85rem
    padding-top: var(--tile-25)
.playerStats__portrait
  height: var(--tile-125)
  width: var(--tile-125)
  img
    width: 100%
    height: 100%
.playerStats__lvl
  height: var(--tile-75)
  width: var(--tile-75)
  background: #1f1913
  display: flex
  justify-content: center
  font-size: var(--font-size-sm)
  color: #805a29
.playerStats__attack
  height: var( --tile-75)
  display: flex
  align-items: center
  justify-content: space-between
  max-width: var(--tile-125)
  width: var(--tile-125)
  img
    width: var(--tile-50)
    min-width: var(--tile-50)
    transform: scaleX(-1)
  span
    width: 100%
    text-align: center
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
