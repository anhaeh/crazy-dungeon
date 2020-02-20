<template>
  <div :class="['cell', {'can-move': canMove }, {'has-fog': hasFog }]"
       :id="'cell-' + id"
       @click="click">
    <img :src="image">
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
      <component v-if="hasNpc && !hasFog" :is="hasNpc.type" :cell-id="id"></component>
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
</template>

<script>
import Terrains from '@/gamedata/Terrains.json'
import Monster from "../Entities/Monster"
import Player from "../Entities/Player"
import merchant from "../Entities/Npcs/Merchant"
import zombie from "../Entities/Npcs/Zombie"
import chest from "../Entities/Npcs/Chest"
import Item from "../Entities/Item"

export default {
  props: {
    id: { required: true, type: String },
    type: { required: true }
  },
  components: {
    Monster,
    Player,
    Item,
    merchant,
    zombie,
    chest
  },
  name: "Cell",
  data () {
    return {
      tile: null,
      imageWall : null
    }
  },
  computed: {
    image: function () {
      let imageFile = this.tile.image
      if (this.imageWall) {
        imageFile += this.imageWall
      }
      let theme = this.tile.theme ? this.$store.getters.getTheme + '/' : ''
      return require(`@/assets/terrains/${theme}${imageFile}.png`)
    },
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
    }
  },
  methods: {
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
      type = 1
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
  .has-fog
    filter: opacity(0)
</style>
