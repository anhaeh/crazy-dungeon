<template>
  <div class="npc" :class="[$options.name, {'in-range': playerInRange}, {'selected': selected}]">
    <img :src="image" alt="" @click="click">
    <bottom-dialog
            v-if="show"
            @close="destroyNpc"
    >
      <div slot="legend">+3% critical chance</div>
      <div slot="title" class="title">{{ $options.name }}</div>
      <div slot="text">
        Hello adventurer. I have some battle techniques that could help you increase your critical chance +3%. For only {{ goldCost }} gold coins. What do you say?</div>
      <span slot="close-text">
        No thanks
      </span>
      <template slot="actions">
        <div class="bottomDialog__actionsBtn"
             @click="close"
        >
          Maybe later
        </div>
        <div class="bottomDialog__actionsBtn"
             v-if="hasGold"
             @click="pay"
        >
          Teach me
        </div>
      </template>
    </bottom-dialog>
  </div>
</template>

<script>
import AbstractNpc from './AbstractNpc'
import gameData from '@/gamedata/Npcs.json'

export default {
  name: "viking",
  mixins: [
    AbstractNpc
  ],
  data () {
    return {
      show: false,
      goldCost: 0
    }
  },
  methods: {
    click: function () {
      if (this.playerInRange && !this.show) {
        let playerLevel = this.$store.getters.getPlayer.level
        let counter = playerLevel < 5 ? playerLevel : 5
        this.goldCost = gameData[this.$options.name].price * counter
        this.show = true
      }
    },
    pay: function() {
      this.$store.commit('setGold', this.goldCost * -1)
      this.$store.commit('setPlayerCritical', 0.03)
      this.$store.commit('pushLog', 'Your critical chance has increased.')
      this.destroyNpc()
    },
    close: function () {
      this.show = false
    }
  },
  computed: {
    hasGold: function () {
      return this.$store.getters.getPlayer.gold >= this.goldCost
    }
  }
}
</script>

<style scoped lang="sass">
  @import "AbstractNpc"
</style>
