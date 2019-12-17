<template>
  <div :class="['cell', {'can-move': canMove }]" @click="move">
    <img :src="image">
    <Monster v-if="hasMonster"
             :name="hasMonster"
             :key="hasMonster + '-' + id"
             :cell-id="id"
    >
    </Monster>
    <Player v-if="hasPlayer"></Player>
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
    }
  },
  data () {
    return {
      tile: null
    }
  },
  computed: {
    image: function () {
      return require('@/assets/terrains/' + this.tile.image)
    },
    hasMonster: function () {
      let monsters = this.$store.getters.getMonsters
      return monsters[this.id] !== undefined ? monsters[this.id] : null
    },
    hasPlayer: function () {
      return this.id === this.$store.getters.getPlayerPosition
    },
    isInRange: function () {
      return this.$store.getters.getPlayerRange.includes(this.id)
    },
    canMove: function () {
      return !this.hasMonster && this.tile.available && this.isInRange
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
    width: 64px
    height: 64px
    position: relative
    &.can-move
      cursor: pointer
  img
    position: absolute
</style>
