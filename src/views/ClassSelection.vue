<template>
  <div class="container">
    <h2>Choose your class</h2>
    <select class="style" v-model="selected">
      <option class=""
              v-for="heroClass in getClasses()"
              :key="heroClass"
              :value="heroClass">
        {{ heroClass }}
      </option>
    </select>
    <div class="new style">
      <button @click="begin" :disabled="!selected">Start Game</button>
    </div>
    <div class="new style">
      <button @click="$router.push({ name: 'main-menu'})">Back</button>
    </div>
  </div>
</template>

<script>
import classes from '@/gamedata/Heroes.json'

export default {
  name: "ClassSelection",
  data() {
    return {
      selected: ''
    }
  },
  methods: {
    begin: function () {
      this.$router.push({ name: 'dungeon', params: { class: this.selected.toLowerCase() }})
    },
    getClasses: function () {
      return Object.keys(classes)
    }
  }
}
</script>

<style scoped lang="sass">
.container
  color: white
  font-family: 'OpenSansPXBold'
  display: flex
  align-items: center
  justify-content: center
  height: 100vh
  flex-direction: column
button, select
  margin: 15px
  font-family: 'OpenSansPXBold'
  color: white
  text-transform: capitalize
  font-size: 1.5rem
  background-color: #672806
  border-color: #533a18
button:disabled
  background-color: black
  color: #888888
</style>
