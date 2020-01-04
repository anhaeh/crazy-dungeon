<template>
  <div class="map" v-if="map">
    <div class="row" v-for="row in orderedMap" :key="'row' + row.id">
      <Cell
          v-for="cellKey in row.cells"
          :key="row.id + cellKey"
          :id="row.id + cellKey"
          :type="getCell(row.id, cellKey)"
      ></Cell>
    </div>
  </div>
</template>

<script>
import Cell from "./Cell"

export default {
  name: "Map",
  components: {
    Cell
  },
  computed: {
    map: function () {
      return this.$store.getters.getMap
    },
    orderedRows: function () {
      let cells = this.$store.getters.getPlayerViewport
      let rows = []
      cells.forEach((x) => {
        // eslint-disable-next-line no-useless-escape
        let cell = x.match(/[\d\.]+|\D+/g)
        if (rows.indexOf(cell[0]) === -1) { rows.push(cell[0])}
      })
      return rows.sort((a, b) => a - b)
    },
    orderedMap: function () {
      return this.orderedRows.map(x =>  {
        return {
          id: x,
          cells: this.getCells(x)
        }
      })
    }
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
.map
  margin-top: calc(1.5 * var(--tile-cell))
.row
  display: flex
@media screen and (min-width: 800px)
  .map
    overflow: hidden
    --tile-cell: 10vh
    --pixel-unit: 5px
    margin-right: 336px;
</style>
