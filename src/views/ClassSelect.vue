<template>
  <div class="container">
    <h2>Crazy dungeons</h2>
    <h3>
      Choose your class
    </h3>
    <select class="style" v-model="selected">
      <option class=""
          v-for="heroClass in ['Paladin', 'Wizard', 'Necromancer']"
          :key="heroClass"
          :value="heroClass">
        {{ heroClass }}
      </option>
    </select>
    <div class="new style">
      <button @click="begin">Start Game</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClassSelect",
  data() {
    return {
      selected: 'Paladin'
    }
  },
  methods: {
    begin: function () {
      this.$store.commit('setClassSelected', this.selected.toLowerCase())
      this.$router.push({name: 'dungeon'})
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
  font-size: 1.1rem
  background-color: #672806
  border-color: #533a18
</style>
