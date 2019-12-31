<template>
  <div :class="['cell', {'can-move': canMove }]"
       :id="'cell-' + id"
       @click="click"
       @mouseover="preview">
    <img :src="image">
    <Monster v-if="hasMonster"
             :name="getMonster.monster"
             :key="'monster-' + id"
             :ref="getMonster.monster + id"
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
import { mapGetters } from 'vuex'


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
    ...mapGetters([
      'getMonsters',
      'getPlayerPosition',
      'getPlayerRange',
      'getTheme'
    ]),
    image: function () {
      let image = this.tile.theme ? `${this.tile.image}_${this.getTheme}.png` : `${this.tile.image}.png`
      return require('@/assets/terrains/' + image)
    },
    hasMonster: function () {
      return this.getMonster !== undefined && this.getMonster.isLive
    },
    getMonster: function () {
      return this.getMonsters.find(x => x.cellId === this.id)
    },
    hasItem: function () {
      let items = this.$store.getters.getItems
      return items[this.id] !== undefined ? items[this.id] : null
    },
    hasPlayer: function () {
      return this.id === this.getPlayerPosition
    },
    inPlayerRange: function () {
      return this.getPlayerRange.includes(this.id)
    },
    canMove: function () {
      return !this.hasMonster && this.tile.available && this.inPlayerRange
    }
  },
  methods: {
    click: function() {
      if (this.canMove) {
        this.$store.commit('setPlayerPosition', this.id)
      } else {
        this.preview()
      }
    },
    preview: function () {
      let payload = null
      if (this.hasMonster) {
        payload = {
          entity: 'monsterPreview',
          monster: this.$refs[this.getMonster.monster + this.id].monster,
          damage: this.$refs[this.getMonster.monster + this.id].damage,
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
    img
      position: absolute
      width: 100%
      height: 100%
</style>
