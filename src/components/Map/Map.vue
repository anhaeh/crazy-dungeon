<template>
  <div class="map" v-if="map">
    <div class="row" v-for="row in Object.keys(map)" :key="'row' + row">
      <Cell
          v-for="cellKey in Object.keys(map[row])"
          :key="row + cellKey"
          :id="row + cellKey"
          :type="map[row][cellKey]"
      ></Cell>
    </div>
  </div>
</template>

<script>
import Cell from "./Cell"

export default {
  name: "App",
  components: {
    Cell
  },
  computed: {
    map: function () {
      return this.$store.getters.getMap
    }
  }
}
</script>

<style scoped lang="sass">
  .row
    display: flex
</style>