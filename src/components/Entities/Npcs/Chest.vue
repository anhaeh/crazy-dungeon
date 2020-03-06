<template>
  <div class="npc" :class="$options.name">
    <img :src="image" alt="" @click="click">
    <bottom-dialog
            v-if="show"
            @close="show = false"
    >
      <slot name="legend"></slot>
      <div slot="title" class="title">{{ $options.name }}</div>
      <div slot="text">
        <span v-if="hasKey">{{ entity.dialogWithKey }}</span>
        <span v-else>{{ entity.dialog }}</span>
      </div>
      <template slot="actions">
        <div class="bottomDialog__actionsBtn"
             @click="callDestroy"
        >
          Destroy
        </div>
        <div class="bottomDialog__actionsBtn"
             @click="open" v-if="hasKey"
        >
          Open
        </div>
      </template>
    </bottom-dialog>
  </div>
</template>

<script>
import AbstractNpc from './AbstractNpc'
import gameData from '@/gamedata/Npcs.json'

export default AbstractNpc.extend({
  name: "chest",
  data () {
    return {
      show: false,
      entity: gameData[this.$options.name]
    }
  },
  methods: {
    click: function() {
      if (this.playerInRange && !this.show) {
        this.show = true
      }
    },
    callDestroy: function () {
      this.$store.commit('pushLog', `You hit the ${this.$options.name} and explode into pieces along with its contents.`)
      this.destroyChest()
    },
    open: function () {
      let treasures = ['earnItem', 'earnScore', 'earnExperience']
      let treasure = treasures[Math.floor(Math.random() * treasures.length)]
      let indexKey = this.$store.getters.getInventory.items.findIndex(x => x.type === 'key')
      this.$store.commit('deleteItemInventory', indexKey)
      this[treasure]()
      this.destroyChest()
    },
    earnItem: function () {
      let treasureName = this.entity.earnItem[Math.floor(Math.random() * this.entity.earnItem.length)]
      let treasure = require('@/gamedata/Items.json')[treasureName]
      this.$store.commit('pushLog', `Player receive a ${treasure.name}`)
      if (this.$store.getters.getInventory.maxSize === this.$store.getters.getInventory.items.length) {
        this.$store.commit('pushLog', 'Your inventory is full')
      } else {
        this.$store.commit('addItemToInventory', treasure)
      }
    },
    earnScore: function () {
      this.$store.commit('setScore', this.entity.earnScore)
      this.$store.commit('pushLog', `Player receive ${this.entity.earnScore} points`)
    },
    earnExperience: function () {
      this.$store.commit('pushLog', 'Player gain more experience')
      this.$store.commit('setPlayerExperience', this.entity.earnExperience)
      let player = this.$store.getters.getPlayer
      if (player.defeatMonsters >= player.nextLevelMonsters) {
        this.$store.commit('levelUp')
      }
    },
    destroyChest: function () {
      event.stopPropagation()
      this.$store.commit('setPreview', null)
      this.$store.commit('destroyNpc', this.cellId)
    }
  },
  computed: {
    hasKey: function () {
      return this.$store.getters.getInventory.items.find(x => x.type === 'key')
    }
  }
})
</script>

<style scoped lang="sass">
  @import "AbstractNpc"
</style>
