<template>
  <div class="map" v-if="map">
    <div class="row" v-for="(row, index) in getRows" :key="'row' + row">
      <Cell
          v-for="cellKey in getCells(row)"
          :key="index + row + cellKey"
          :id="row + cellKey"
          :type="getCell(row, cellKey)"
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
      return rows.sort((a, b) => a - b)
    },
  },
  methods: {
    getCells: function (row) {
      // eslint-disable-next-line no-useless-escape
      let cells = this.$store.getters.getPlayerViewport.filter((x) => x.match(/[\d\.]+|\D+/g)[0] === row)
      // eslint-disable-next-line no-useless-escape
      return cells.map(x => x.match(/[\d\.-]+|\D+/g)[1]).sort()
    },
    getCell: function (row, cellKey) {
      if (this.map[row] === undefined || this.map[row][cellKey] === undefined) {
        return undefined
      }
      return this.map[row][cellKey]
    }
  }
}
</script>

<style scoped lang="sass">
  .row
    display: flex
</style>
