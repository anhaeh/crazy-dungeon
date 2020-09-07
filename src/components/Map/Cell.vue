<template>
  <span>
    <div :class="['cell', {'can-move': canMove && !isMobile }, {'has-fog': hasFog }, {'has-item': hasItem}]"
         :id="'cell-' + id"
         @click="click">
      <span class="cell__fog" v-if="hasFog">
        <img :src="require('../../assets/ui/dungeon__mist.gif')">
      </span>
      <img :src="image()">
      <img v-if="diagonalClass.includes('e')"
           :src="imageDiagonal('e')"
           class="diagonal --east">
      <img v-if="diagonalClass.includes('w')"
           :src="imageDiagonal('w')"
           class="diagonal --west">
      <img v-if="dotClass"
           :src="imageDot()"
           class="dot"
           :class="{'--east': dotClass.includes('e')}">
      <template v-if="!hasFog">
        <Monster
           v-if="hasMonster"
           :name="getMonster.name"
           :key="'monster-' + id"
           :ref="getMonster.name + id"
           :cell-id="id"
        >
        </Monster>
        <Player v-if="hasPlayer"></Player>
        <npc v-if="hasNpc" :npc="hasNpc" :cell-id="id"></npc>
        <Item
          v-if="!hasMonster && hasItem"
          :name="hasItem"
          :key="'item' + '-' + id"
          :ref="hasItem + id"
          :cell-id="id"
        >
        </Item>
      </template>
    </div>
    <span class="show-skill-passive" v-if="hasFog">
      {{ passiveSkill() }}
    </span>
  </span>
</template>

<script>
import Terrains from '@/gamedata/Terrains.json'
import Monster from "../Entities/Monster"
import Player from "../Entities/Player"
import Item from "../Entities/Item"
import Npc from "../Entities/Npc"

export default {
  props: {
    id: { required: true, type: String },
    type: { required: true }
  },
  inject: ['isMobile'],
  components: {
    Npc,
    Monster,
    Player,
    Item
  },
  name: "Cell",
  data () {
    return {
      tile: null,
      imageWall : null,
      diagonalClass: '',
      dotClass: ''
    }
  },
  computed: {
    hasMonster: function () {
      return this.getMonster !== undefined && this.getMonster.isLive
    },
    getMonster: function () {
      return this.$store.getters.getMonsters.find(x => x.cellId === this.id)
    },
    hasItem: function () {
      let items = this.$store.getters.getItems
      return items[this.id] !== undefined ? items[this.id] : null
    },
    hasPlayer: function () {
      return this.id === this.$store.getters.getPlayerPosition
    },
    hasNpc: function () {
      return this.$store.getters.getNpcs.find(x => x.cellId === this.id)
    },
    inPlayerRange: function () {
      return this.$store.getters.getPlayerRange.includes(this.id)
    },
    canMove: function () {
      return this.inPlayerRange && !this.hasMonster && this.tile.available && !this.hasNpc
    },
    hasFog: function () {
      return this.$store.getters.getEnableFog && !this.$store.getters.getMapDiscover.includes(this.id) && !this.hasPlayer
    },
  },
  methods: {
    passiveSkill: function () {
      let passive = this.$store.getters.getPlayer.passiveSkills[0]
      let result = ''
      if (passive.mapLetter === 'M' && this.hasMonster
              || passive.mapLetter === 'N' && this.hasNpc
              || passive.mapLetter === 'E' && this.type === 'P'
      ) {
        result = passive.mapLetter
      }
      return result
    },
    image: function () {
      let imageFile = this.tile.image
      if (this.imageWall) {
        imageFile += this.imageWall
      }
      let theme = this.tile.theme ? this.$store.getters.getTheme + '/' : ''
      return require(`@/assets/terrains/${theme}${imageFile}.png`)
    },
    imageDot: function () {
      let theme = this.$store.getters.getTheme + '/'
      return require(`@/assets/terrains/${theme}solid_dot_n.png`)
    },
    imageDiagonal: function (direction) {
      let filename = direction
      if (this.diagonalClass.includes('n')) {
        filename = 'n' + direction
      }
      let theme = this.$store.getters.getTheme + '/'
      return require(`@/assets/terrains/${theme}solid_diagonal_${filename}.png`)
    },
    click: function() {
      if (this.canMove) {
        this.$store.commit('setPlayerPosition', this.id)
      } else if (!this.hasFog) {
        this.preview()
      }
    },
    preview: function () {
      let payload = null
      if (this.hasMonster) {
        let refMonster = this.$refs[this.getMonster.name + this.id]
        payload = {
          entity: 'monsterPreview',
          monster: this.getMonster,
          refMonster: refMonster.monster,
          totalLife: refMonster.totalLife,
          cellId: this.id,
        }
      } else if (this.hasItem) {
        payload = {
          entity: 'itemPreview',
          item: this.$refs[this.hasItem + this.id].item
        }
      } else if (this.hasNpc) {
        payload = {
          entity: 'npcPreview',
          npc: this.hasNpc
        }
      }
      this.$store.commit('setPreview', payload)
    }
  },
  created () {
    let type = this.type
    if (this.type === undefined) {
      type = 1 // wall sprite
    }
    this.tile = Terrains[type]
    let map = this.$store.getters.getMap
    if (this.type === 1) {
      let row = parseInt(this.id.split('_')[0])
      let col = parseInt(this.id.split('_')[1])
      let e = map[row][col + 1] === undefined ? false : map[row][col + 1] !== 1
      let w = (col - 1) < 0 ? false : map[row][col - 1] !== 1
      let n = (row - 1) < 0 ? false : map[row - 1][col] !== 1
      let s = map[row + 1] === undefined ? false : map[row + 1][col] !== 1
      let directions = ''
      if (n) {
        directions += 'n'
      }
      if (e) {
        directions += 'e'
      }
      if (s) {
        directions += 's'
      }
      if (w) {
        directions += 'w'
      }

      if ((directions.length <= 1 || directions.includes('n')) && !directions.includes('s')) {
        // check south diagonals
        if (map[row + 1] !== undefined) {
          let se = map[row + 1][col + 1] === undefined ? false : map[row + 1][col + 1] !== 1
          let sw = map[row + 1][col - 1] === undefined ? false : map[row + 1][col - 1] !== 1
          if (directions.includes('n')) {
            this.diagonalClass = 'n'
          }
          if (se && !directions.includes('e')) {
            this.diagonalClass += 'e'
          }
          if (sw && !directions.includes('w')) {
            this.diagonalClass += 'w'
          }
        }
      }

      // check north doths
      if (map[row - 1] !== undefined && !directions.includes('n')) {
        let ne = map[row - 1][col + 1] === undefined ? false : map[row - 1][col + 1] !== 1
        let nw = map[row - 1][col - 1] === undefined ? false : map[row - 1][col - 1] !== 1
        if (ne && !directions.includes('e')) {
          this.dotClass += 'e'
        }
        if (nw && !directions.includes('w')) {
          this.dotClass += 'w'
        }
      }

      if (directions !== '') {
        this.imageWall = '_' + directions
      }
    }
  }
}
</script>

<style scoped lang="sass">
.cell
  width: var(--tile-cell)
  height: var(--tile-cell)
  position: relative
  img
    position: absolute
    width: 100%
    height: 100%
  .diagonal
    width: initial
  .dot
    height: 8px
    width: 10px
  .--east
    right: 0
// .has-fog
  // filter: opacity(0)
.cell__fog
  background-color: #000
  width: 100%
  height: 100%
  display: block
  img
    opacity: .35
    width: 100%
    height: 100%
.show-skill-passive
  color: #bfa561
  display: flex
  justify-content: center
  top: calc(var(--tile-cell) * -0.75)
  position: relative
  max-height: 0
  font-size: 1.5rem
  position: relative
  img
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
@media (min-width: 900px)
  .can-move
    cursor: url('../../assets/ui/cursor__move.png'), auto
    &:hover:after
      content: ''
      position: absolute
      left: 0
      top: 0
      width: 100%
      height: 100%
      z-index: 0
      background-image: url('../../assets/ui/cell__move.png')
      background-size: cover
      image-rendering: pixelated
      filter: opacity(0.6)
    &.has-item
      cursor: url('../../assets/ui/cursor__pick.png'), auto
      &:hover:after
        content: 'Pick item'
        color: white
        top: -10px
        background-image: none
</style>
