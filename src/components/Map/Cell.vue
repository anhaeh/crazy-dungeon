<template>
  <span>
    <div :class="['cell', {'can-move': canMove && !isMobile }, {'has-fog': hasFog }, {'has-item': hasItem}]"
         :id="'cell-' + id"
         @click="click">
      <template v-if="!hasFog">
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
    <span class="show-skill-passive" v-if="hasFog && passiveSkill()">
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
      imageWall: '',
      dotClass: '',
      diagonalClass: ''
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
    }
  },
  methods: {
    passiveSkill: function () {
      let passive = this.$store.getters.getPlayer.passiveSkills[0] // TODO check all passives skills
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
    let sprite = this.$store.getters.getWallSprites.find(x => this.id === x.id)
    if (sprite) {
      this.diagonalClass = sprite.diagonalClass
      this.imageWall = sprite.imageWall
      this.dotClass = sprite.dotClass
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
.has-fog
  background-image: url('../../assets/terrains/Fog.gif')
  filter: brightness(0.5)
.show-skill-passive
  color: #bfa561
  display: flex
  justify-content: center
  top: calc(var(--tile-cell) * -0.75)
  position: relative
  max-height: 0
  font-size: 1.5rem
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
