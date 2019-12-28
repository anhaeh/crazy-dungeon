<template>
  <div :class="['cell', {'can-move': canMove }]"
       :id="'cell-' + id"
       @click="click"
       @mouseover="preview">
    <img :src="image">
    <Monster v-if="hasMonster"
             :name="hasMonster"
             :key="'monster-' + id"
             :ref="hasMonster + id"
             :cell-id="id"
    >
    </Monster>
    <Player v-if="hasPlayer"></Player>
    <Item v-if="hasItem"
             :name="hasItem"
             :key="'item' + '-' + id"
             :ref="hasItem + id"
             :cell-id="id"
    >
    </Item>
  </div>
</template>

<script>
import Terrains from '@/gamedata/Terrains.json'
import Monster from "../Entities/Monster"
import Player from "../Entities/Player"
import Item from "../Entities/Item"


export default {
  props: {
    id: { required: true, type: String },
    type: { required: true }
  },
  components: {
    Monster,
    Player,
    Item
  },
  name: "Cell",
  watch: {
    type: {
      immediate: true,
      handler () {
        let type = this.type
        if (this.type === undefined) {
          type = '1'
        }
        this.tile = Terrains[type]
      }
    }
  },
  data () {
    return {
      tile: null
    }
  },
  computed: {
    image: function () {
      let image = this.tile.theme ? `${this.tile.image}_${this.$store.getters.getTheme}.png` : `${this.tile.image}.png`
      return require('@/assets/terrains/' + image)
    },
    hasMonster: function () {
      let monsters = this.$store.getters.getMonsters
      return monsters[this.id] !== undefined ? monsters[this.id] : null
    },
    hasItem: function () {
      let items = this.$store.getters.getItems
      return items[this.id] !== undefined ? items[this.id] : null
    },
    hasPlayer: function () {
      return this.id === this.$store.getters.getPlayerPosition
    },
    inPlayerRange: function () {
      return this.$store.getters.getPlayerRange.includes(this.id)
    },
    canMove: function () {
      return !this.hasMonster && this.tile.available && this.inPlayerRange
    },
    actualRoom: function () {
      return this.$store.getters.getRoom
    }
  },
  methods: {
    click: function() {
      if (this.canMove) {
        this.$store.commit('setPlayerPosition', this.id)
      } else if (this.hasMonster) {
        this.preview()
      }
    },
    preview: function () {
      let payload = null
      if (this.hasMonster && this.$refs[this.hasMonster + this.id].isLive) {
        payload = {
          entity: 'monsterPreview',
          monster: this.$refs[this.hasMonster + this.id].monster,
          damage: this.$refs[this.hasMonster + this.id].damage,
          cellId: this.id
        }
      } else if (this.hasItem) {
        payload = {
          entity: 'itemPreview',
          item: this.$refs[this.hasItem + this.id].item
        }
      }
      this.$store.commit('setPreview', payload)
    }
  }
}
</script>

<style scoped lang="sass">
  .cell
    width: var(--tile-cell)
    height: var(--tile-cell)
    position: relative
    &.can-move
      cursor: pointer
    img
      position: absolute
      width: 100%
      height: 100%
</style>
