<template>
  <div class="map" v-if="map">
    <div class="row" v-for="row in getRows" :key="'row' + row">
      <Cell
          v-for="cellKey in getCell(row)"
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
    },
    getRows: function () {
      let cells = this.$store.getters.getPlayerViewport
      let rows = []
      cells.forEach((x) => {
        // eslint-disable-next-line no-useless-escape
        let cell = x.match(/[\d\.]+|\D+/g)
        if (rows.indexOf(cell[0]) === -1) { rows.push(cell[0])}
      })
      return rows.sort()
    },
  },
  methods: {
    getCell: function (row) {
      // eslint-disable-next-line no-useless-escape
      let cells = this.$store.getters.getPlayerViewport.filter((x) => x.match(/[\d\.]+|\D+/g)[0] === row)
      // eslint-disable-next-line no-useless-escape
      return cells.map(x => x.match(/[\d\.]+|\D+/g)[1]).sort()
    }
  }
}
</script>

<style scoped lang="sass">
  .row
    display: flex
</style>
