<template>
  <div v-if="isGameOver" class="game-over">
    <p class="text">GAME OVER</p>
    <div class="btn-new-game" @click="reload">New Game</div>
  </div>
</template>

<script>
export default {
  name: "GameOver",
  methods: {
    reload: function () {
      window.location.reload()
    }
  },
  computed: {
    isGameOver: function () {
      return this.$store.getters.getPlayer.isDead
    }
  }
}
</script>

<style scoped lang="sass">
  .game-over
    position: fixed
    background: white
    width: 100%
    height: 100%
    z-index: 10
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    font-size: 30px
  .btn-new-game
    cursor: pointer
    position: relative
    display: flex
    justify-content: center
    align-items: center
    width: 200px
    height: 50px
    color: white
    background-color: brown
    border: cornflowerblue solid 1px
</style>
