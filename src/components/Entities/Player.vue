<template>
  <div class="player">
      <span class="damage"
            v-if="counterDamage"
            :class="['damage', {'--heal': counterDamage > 0 || typeof(counterDamage) === 'string' }]"
      >
        {{ counterDamage }}
      </span>
    <img :src="image" alt="">
    <template v-if="isMonsterTarget">
      <div class="life" :style="life"></div>
      <div class="life-background"></div>
    </template>
  </div>
</template>

<script>
  export default {
    name: "Player",
    data() {
      return {
        counterDamage: 0,
        timeout: null,
        level: this.$store.getters.getPlayer.level
      }
    },
    watch: {
      damage: function(newVal, oldVal) {
        this.counterDamage = 0
        clearTimeout(this.timeout)
        this.$nextTick(()=> {
          this.counterDamage = oldVal - newVal
          let actualLevel = this.$store.getters.getPlayer.level
          if (actualLevel > this.level) {
            this.level = actualLevel
            this.counterDamage = 'Lv +1'
          }
          this.timeout = setTimeout(() => {
            this.counterDamage = 0
            clearTimeout(this.timeout)
          }, 500)
        })
      }
    },
    computed: {
      image: function () {
        let heroClass = this.$store.getters.getPlayer.class
        return require(`@/assets/heroes/${heroClass}.gif`)
      },
      damage: function () {
        return this.$store.getters.getPlayerDamage
      },
      life: function() {
        let percent = ((this.totalLife - this.damage) * 100) / this.totalLife
        if (percent < 0) {
          percent = 0
        }
        return `width: ${percent}%`
      },
      totalLife: function () {
        return this.$store.getters.getPlayerBaseLife + this.$store.getters.getPlayerBuffLife
      },
      isMonsterTarget: function () {
        return this.$store.getters.getMonsterSelected
      }
    },
    created () {
      this.$store.commit('movePlayer')
    }
  }
</script>

<style scoped lang="sass">
  .player
    position: relative
    padding: 2px
    img
      width: 100%
      height: auto
      object-fit: contain
      filter: drop-shadow(-2px -2px 0 #0b0b0b) drop-shadow(2px -2px 0 #0b0b0b) drop-shadow(-2px 2px 0 #0b0b0b) drop-shadow(2px 2px 0 #0b0b0b)
    .damage
      color: red
      position: absolute
      z-index: 5
      font-size: 1.5rem
      top: -2px
      right: 0
      filter: drop-shadow(-1px -1px 0 #000) drop-shadow(1px -1px 0 #000) drop-shadow(-1px 1px 0 #000) drop-shadow(1px 1px 0 #000)
      -webkit-animation: counterAnimation 0.5s ease-out
      animation: counterAnimation 0.5s ease-out
      &.--heal
        color: #1bd31e
    .life
      bottom: 4px
      left: 0
      height: 3px
      background: rgb(150, 0, 0)
      z-index: 2
      position: absolute
      width: 100%
    .life-background
      bottom: 4px
      left: 0
      height: 3px
      background: rgba(0, 0, 0, 0.8)
      z-index: 1
      position: absolute
      width: 100%
</style>
