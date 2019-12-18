<template>
  <div :class="['cell', {'can-move': canMove }, {'visited': visited }]" :id="'cell-' + id"
       @click="move">
    <img :src="image">
    <transition name="fade" mode="out-in">
      <Monster v-if="hasMonster"
               :name="hasMonster"
               :key="hasMonster + '-' + id"
               :cell-id="id"
      >
      </Monster>
    </transition>
    <transition name="fade" mode="out-in">
      <Player v-if="hasPlayer"></Player>
    </transition>
  </div>
</template>

<script>
import Terrains from '@/gamedata/Terrains.json'
import Monster from "../Entities/Monster"
import Player from "../Entities/Player"


export default {
  props: {
    id: { required: true, type: String },
    type: { required: true, type: String }
  },
  components: {
    Monster,
    Player
  },
  name: "Cell",
  watch: {
    type: {
      immediate: true,
      handler () {
        this.tile = Terrains[this.type]
      }
    },
    adjacentToPlayer: {
      immediate: true,
      handler () {
        if (this.adjacentToPlayer) { this.visited = true }
      }
    },
    actualRoom: {
      handler () {
        if (!this.adjacentToPlayer) { this.visited = false }
      }
    }
  },
  data () {
    return {
      tile: null,
      visited: false
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
    hasPlayer: function () {
      return this.id === this.$store.getters.getPlayerPosition
    },
    adjacentToPlayer: function () {
      return this.$store.getters.getPlayerRange.includes(this.id)
    },
    canMove: function () {
      return !this.hasMonster && this.tile.available && this.visited
    },
    actualRoom: function () {
      return this.$store.getters.getRoom
    }
  },
  methods: {
    move: function() {
      if (this.canMove) {
        this.$store.commit('setPlayerPosition', this.id)
      }
    }
  }
}
</script>

<style scoped lang="sass">
  .cell
    width: 50px
    height: 50px
    position: relative
    cursor: not-allowed
    // filter: brightness(0)
    &.can-move
      cursor: pointer
    &.visited
      filter: brightness(1)
      transition: all .3s
      -moz-transition: all .3s ease-in-out
      -webkit-transition: all .3s
    img
      position: absolute
      width: 100%
      height: 100%
</style>
