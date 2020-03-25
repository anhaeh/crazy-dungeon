<template>
  <div class="player">
      <span class="damage"
            v-if="counterDamage"
            :class="['damage', {'--heal': counterDamage > 0 || typeof(counterDamage) === 'string' }]"
      >
        {{ counterDamage }}
      </span>
    <img :src="image" alt="">
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
      }
    },
    created () {
      this.$store.commit('setMonsterSelected', null)
      this.$store.commit('setPreview', null)
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
      filter: drop-shadow(0px 0px 2px black)
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
</style>
