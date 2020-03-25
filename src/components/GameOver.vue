<template>
  <div v-if="isGameOver" class="game-over">
    <h1>GAME OVER</h1>
    <div class="btn btn-new-game" @click="goMenu">Main Menu</div>
    <div class="score">
      <div class="text">Your score is:</div>
      <div class="text">
        {{ this.$store.getters.getScore }}
      </div>
      <div class="container-send">
        <input type="text" v-model="name" placeholder="Enter your name" maxlength="20">
        <div class="btn btn-new-game btn-score"
             @click="pushScore"
             :class="{'--disabled': name.trim() === ''}"
        >
          Send
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "GameOver",
  data () {
    return {
      name: ''
    }
  },
  methods: {
    goMenu: function () {
      this.$router.push({name: 'main-menu'})
    },
    pushScore: function () {
      axios.post('https://anhaeh.pythonanywhere.com/api/v1/dungeon/high-score/', {
        "score": this.$store.getters.getScore,
        "name": this.name,
        "player_level": this.$store.getters.getPlayer.level,
        "class_name": this.$store.getters.getPlayer.class
      })
      this.goMenu()
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
  .btn
    cursor: url('../assets/ui/cursor__attack.png'), auto
  .game-over
    font-family: 'OpenSansPXBold'
    position: fixed
    background: black
    color: white
    width: 100%
    height: 100%
    z-index: 1000
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    font-size: 30px
    left: 0
  .btn-new-game
    position: relative
    display: flex
    justify-content: center
    align-items: center
    width: 200px
    height: 50px
    background-color: #672806
    border: #533a18 solid 1px
    color: white
  .score
    position: fixed
    display: flex
    flex-direction: column
    bottom: 30px
    align-items: center
    .container-send
      display: flex
      margin-top: 5px
    input
      height: 28px
      padding: 0 4px
    .btn-score
      font-size: 1.15rem
      position: relative
      display: flex
      justify-content: center
      align-items: center
      width: 50px
      height: 30px
      border: #533a18 solid 1px
      color: white
      background-color: #673352
      &.--disabled
        pointer-events: none
        background-color: gray
</style>
