<template>
  <div class="zombie">
    <img :src="image" alt="" @click="click">
    <bottom-dialog
            v-if="show"
            @close="destroy"
    >
      <slot name="legend"></slot>
      <div slot="title">A wandering zombie tells you</div>
      <div slot="text">{{ entity.dialog }}</div>
    </bottom-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import bottomDialog from '@/components/UI/Dialogs/BottomDialog'

export default {
  name: "Zombie",
  props: {
    cellId: { required: true }
  },
  components: {
    bottomDialog
  },
  data () {
    return {
      show: false,
      entity : null
    }
  },
  methods: {
    click: function() {
      if (this.playerInRange && !this.show) {
        this.$store.commit('setMonsterSelected', null)
        let data = require("@/gamedata/Npcs.json")
        let zombieData = data['zombie'].types
        this.entity = zombieData[Math.floor(Math.random() * zombieData.length)]
        this.show = true
        switch (this.entity.action) {
          case "Gold":
            this.earnGold()
            break
          case "Score":
            this.earnScore()
            break
          case "Potion":
            this.earnPotion()
            break
          case "Fog":
            this.deleteFog()
            break
        }
      }
    },
    earnGold: function () {
      let gold = Math.round(Math.ceil(Math.random() * 150))
      this.$store.commit('setGold', gold)
      this.$store.commit('pushLog', `Player receive ${gold} gold`)
    },
    earnScore: function () {
      let points = Math.round(Math.ceil(Math.random() * 200))
      this.$store.commit('setScore', points)
      this.$store.commit('pushLog', `Player receive ${points} points`)
    },
    earnPotion: function () {
      let potion = require('@/gamedata/Items.json')['potion']
      this.$store.commit('addItemToInventory', potion)
      this.$store.commit('pushLog', 'Player receive a potion')
    },
    deleteFog: function () {
      this.$store.commit('setEnableFog', false)
      this.$store.commit('pushLog', 'All the fog on the map is dissipated')
    },
    destroy: function () {
      event.stopPropagation()
      this.$store.commit('setPreview', null)
      this.$store.commit('destroyNpc', this.cellId)
      this.show = false
    }
  },
  computed: {
    ...mapGetters([
      'getPlayerRange',
      'getPlayer',
    ]),
    image: function () {
      return require('@/assets/npcs/zombie.gif')
    },
    playerInRange: function () {
      return this.getPlayerRange.indexOf(this.cellId) !== -1
    }
  },
  beforeDestroy() {
    if (this.show) {
      this.destroy()
    }
  }
}
</script>

<style scoped lang="sass">
.zombie
  position: relative
  padding: 4px
.zombie img
  width: 100%
  height: 100%
  object-fit: contain
</style>
