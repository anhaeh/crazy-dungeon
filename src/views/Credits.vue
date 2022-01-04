<template>
  <div class="container">
    <h1 class="title">Credits</h1>
    <div class="author__container">
      <div v-for="author in authors"
           :key="author.name"
      >
        <div class="author__data">
          <img class="author__portrait" :src="image(author.image)" alt="">
          <div class="author__info">
            <span class="author__name">
              {{ author.name }}
            </span>
            <span class="author__rol">
              {{ author.rol }}
            </span>
            <span class="author__email">
              {{ author.email }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="powered">
      <h2>Powered By</h2>
      <a href class="lib" target="_blank">Vue js</a>
      <a href class="lib" target="_blank">Saas</a>
      <a href class="lib" target="_blank">dungeon-generator 0.0.1</a>
    </div>

    <div class="footer">
      <button @click="$router.push({ name: 'main-menu'})">Back</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Credits",
  data() {
    return {
      authors: [
        {
          name: 'Julian Vera',
          rol: 'Designer',
          email: 'jjveragu@gmail.com',
          image: 'viking'
        },
        {
          name: 'Andres Haehnel',
          rol: 'Developer',
          email: 'anhaeh@gmail.com',
          image: 'monk'
        },
      ]
    }
  },
  methods: {
    image: function (image) {
      return require(`@/assets/npcs/portraits/${image}.png`)
    }
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
.author__container
  overflow: auto
  width: 90vw
.author
  &__data
    display: flex
    justify-content: center
    margin-bottom: 2rem
  &__portrait
    width: calc(1.5 * var(--tile-cell))
    height: calc(1.5 * var(--tile-cell))
    padding: calc(2.5 * var(--pixel-unit))
    image-rendering: pixelated
  &__info
    flex-direction: column
    display: flex
  &__name
    font-size: 2rem
  &__rol
    margin: 0.5rem 0
  &__email
    font-size: 1.5rem
    color: #4af890
    img
      height: calc(0.5 * var(--tile-cell))
.powered
  display: flex
  flex-direction: column
  align-items: center
  a
    color: #039be5
@media screen and (min-width: 900px)
  .container
    width: 50%
</style>
