<template>
  <div class="npc" :class="[$options.name, {'in-range': playerInRange}, {'selected': selected}]">
    <img :src="image" @click="click">
    <bottom-dialog
            v-if="show"
            @close="close"
    >
      <div slot="title" class="title">Wandering Zombie</div>
      <div slot="text">
        Hello adventurer. It is said that {{ this.bossInterval - 1 }} floors down, a powerful monster inhabits, <span class="boss-name">the {{ nextBoss }}</span>. Get all the necessary equipment to defeat this fearsome creature. Be very careful and good luck.
      </div>
      <template slot="actions">
        <div class="bottomDialog__actionsBtn"
             @click="destroyNpc"
        >
          Go away
        </div>
      </template>
    </bottom-dialog>
  </div>
</template>

<script>
import AbstractNpc from './AbstractNpc'
import monsters from '@/gamedata/Monsters.json'

export default {
  name: "zombie",
  mixins: [
    AbstractNpc
  ],
  data () {
    return {
      show: false,
      nextBoss: '',
      bossInterval: this.$store.getters.getBossInterval
    }
  },
  methods: {
    close: function() {
      this.show = false
    },
    click: function() {
      if (this.playerInRange) {
        this.show = true
      }
    }
  },
  created() {
    let nextBossId = this.$store.getters.getPlayer.area
    this.nextBoss = monsters['boss_' + nextBossId].name
  }
}
</script>

<style scoped lang="sass">
  @import "AbstractNpc"
  .boss-name
    text-transform: uppercase
    color: yellow
</style>
