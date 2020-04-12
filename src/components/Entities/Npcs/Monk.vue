<template>
  <div class="npc" :class="[$options.name, {'in-range': playerInRange}, {'selected': selected}]">
    <img :src="image" alt="" @click="click">
    <bottom-dialog
            v-if="show"
            @close="destroyNpc"
    >
      <div slot="legend">Restore skills</div>
      <div slot="title" class="title">{{ $options.name }}</div>
      <div slot="text">Hello traveler. I am touring these ancient dungeons in search of adventure. I could restore your skills for only {{ goldCost }} gold coins. Are you interested?</div>
      <span slot="close-text">
        Bye
      </span>
      <template slot="actions">
        <div class="bottomDialog__actionsBtn"
             @click="close"
        >
          Maybe later
        </div>
        <div class="bottomDialog__actionsBtn"
             v-if="hasGold"
             @click="restore"
        >
          Yes
        </div>
      </template>
    </bottom-dialog>
  </div>
</template>

<script>
import AbstractNpc from './AbstractNpc'
import gameData from '@/gamedata/Npcs.json'

export default {
  name: "monk",
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
        this.goldCost = gameData[this.$options.name].price * this.$store.getters.getPlayer.level
        this.show = true
      }
    },
    restore: function() {
      this.$store.commit('setGold', this.goldCost * -1)
      let skills = this.$store.getters.getPlayerSkills
      this.$store.commit('setPlayerSkills', [])
      this.$nextTick(() => {
        this.$store.commit('setPlayerSkills', skills)
      })
      this.$store.commit('pushLog', 'Your skills have been restored.')
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
