<template>
  <div class="container">
    <h1 class="title">Library</h1>
    <h2 class="subtitle">Bosses</h2>
    <div class="monster__container">
        <div v-for="boss in bosses"
             :key="boss"
        >
          <div class="monster__data">
            <img class="monster__portrait" :src="image(boss)" alt="">
            <div class="monster__attributes">
              <span class="monster__name">{{ getMonster(boss).name }}</span>
              <status-bar :total="getMonster(boss).health" :actual="getMonster(boss).health"></status-bar>
              <div class="monster__numbers">
                <img :src="attackIcon" title="Monster attack">
                <span class="counter --attack">{{ getMonster(boss).attack + 1 }}</span>
                <img :src="goldIcon" title="Drop gold">
                <span class="counter --gold">{{ getMonster(boss).gold }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    <div class="footer">
      <button @click="$router.push({ name: 'main-menu'})">Back</button>
    </div>
  </div>
</template>

<script>
import monsters from '../gamedata/Monsters.json'
import statusBar from '../components/UI/StatusBar'

export default {
  name: "Library",
  components: {
    statusBar
  },
  data() {
    return {
      bosses: []
    }
  },
  methods: {
    image: function (name) {
      let image = this.getMonster(name).image
      return require(`@/assets/monsters/portraits/${image}.png`)
    },
    getMonster: function (name) {
      return monsters[name]
    }
  },
  computed: {
    attackIcon: function () {
      return require('@/assets/ui/attack__icon.png')
    },
    goldIcon: function () {
      return require('@/assets/ui/gold__icon.png')
    }
  },
  created() {
    this.bosses = Object.keys(monsters).filter(x => x.includes('boss_'))
  }
}
</script>

<style scoped lang="sass">
.container
  width: 100%
  color: white
  font-family: 'OpenSansPXBold'
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  height: 100vh
button
  margin: 15px
  font-family: 'OpenSansPXBold'
  color: white
  text-transform: capitalize
  font-size: 1.5rem
  background-color: #672806
  border-color: #533a18
.footer
  position: fixed
  bottom: 3%
.title
  position: fixed
  top: 5%
.subtitle
  position: fixed
  top: 10%
.monster__container
  overflow: auto
  height: 60%
  width: 90vw
.monster__data
  display: flex
  margin-bottom: 10px
  .monster__portrait
    width: calc(1.5 * var(--tile-cell))
    height: calc(1.5 * var(--tile-cell))
    padding: calc(2.5 * var(--pixel-unit))
    image-rendering: pixelated
  .monster__attributes
    display: block
    .monster__name
      font-size: 2rem
    .monster__numbers
      float: right
      padding-top: 5px
      display: flex
      align-items: center
      img
        height: calc(0.5 * var(--tile-cell))
@media screen and (min-width: 900px)
  .container
    width: 50%
</style>
