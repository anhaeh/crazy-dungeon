<template>
  <div v-if="isGameOver" class="game-over">
    <p class="text">GAME OVER</p>
    <div class="btn-new-game" @click="goMenu">New Game</div>
    <h4>Submit your score</h4>
    Total {{ this.$store.getters.getScore }}
    <input type="text" v-model="name" placeholder="Enter your name">
    <div class="btn-new-game btn-score" @click="pushScore">Send</div>

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
        "player_level": this.$store.getters.getPlayer.level
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
  h4
    margin-top: 60px
    margin-bottom: 15px
  .game-over
    font-family: 'OpenSansPXBold'
    position: fixed
    background: black
    color: white
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
    background-color: #672806
    border: #533a18 solid 1px
    color: white
  .btn-score
    margin-top: 10px
    cursor: pointer
    position: relative
    display: flex
    justify-content: center
    align-items: center
    width: 100px
    height: 50px
    border: #533a18 solid 1px
    color: white
    background-color: #673352 !important
</style>
