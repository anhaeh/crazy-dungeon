<template>
  <div :class="['cell', {'can-move': canMove }]"
       :id="'cell-' + id"
       @click="click"
       @mouseover="preview">
    <img :src="image">
    <Monster v-if="hasMonster"
             :name="getMonster.name"
             :key="'monster-' + id"
             :ref="getMonster.name + id"
             :cell-id="id"
    >
    </Monster>
    <Player v-if="hasPlayer"></Player>
    <Merchant
        v-if="hasMerchant"
        :cell-id="id"
    ></Merchant>
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
import Merchant from "../Entities/Merchant"
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
    Merchant
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
    hasMerchant: function () {
      return this.$store.getters.getMerchant.cellId === this.id
    },
    inPlayerRange: function () {
      return this.$store.getters.getPlayerRange.includes(this.id)
    },
    canMove: function () {
      return !this.hasMonster && this.tile.available && this.inPlayerRange && !this.hasMerchant
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
          monster: this.getMonster,
          image: this.$refs[this.getMonster.name + this.id].monster.image,
          totalLife: this.$refs[this.getMonster.name + this.id].totalLife,
          cellId: this.id
        }
      } else if (this.hasItem) {
        payload = {
          entity: 'itemPreview',
          item: this.$refs[this.hasItem + this.id].item
        }
      } else if (this.hasMerchant) {
        payload = {
          entity: 'merchantPreview'
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
