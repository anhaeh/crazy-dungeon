<template>
  <div class="npc" :class="$options.name">
    <img :src="image" alt="" @click="click">
    <bottom-dialog
            v-if="show"
            @close="destroyNpc"
    >
      <div slot="legend">+3% critical chance</div>
      <div slot="title" class="title">{{ $options.name }}</div>
      <div slot="text">
        Hello adventurer. I have some battle techniques that could help you increase your critical chance. For only {{ goldCost }} gold coins. What do you say?</div>
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
import bottomDialog from '@/components/UI/Dialogs/BottomDialog'
import gameData from '@/gamedata/Npcs.json'

export default {
  name: "viking",
  props: {
    cellId: { required: true }
  },
  components: {
    bottomDialog
  },
  data () {
    return {
      show: false,
      goldCost: gameData[this.$options.name].price * this.$store.getters.getPlayer.level
    }
  },
  methods: {
    click: function () {
      if (this.playerInRange && !this.show) {
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
    },
    destroyNpc: function () {
      event.stopPropagation()
      this.$store.commit('pushLog', `The ${this.$options.name} has suddenly escaped.`)
      this.$store.commit('setPreview', null)
      this.$store.commit('destroyNpc', this.cellId)
    }
  },
  computed: {
    image: function () {
      return require(`@/assets/npcs/${this.$options.name}.png`)
    },
    playerInRange: function () {
      return this.$store.getters.getPlayerRange.indexOf(this.cellId) !== -1
    },
    hasGold: function () {
      return this.$store.getters.getPlayer.gold >= this.goldCost
    }
  }
}
</script>

<style scoped lang="sass">
  @import "./npc"
</style>
