<template>
  <div class="npc chest">
    <img :src="image" alt="" @click="click">
    <bottom-dialog
            v-if="show"
            @close="show = false"
    >
      <slot name="legend"></slot>
      <div slot="title">Chest</div>
      <div slot="text">
        <span v-if="hasKey">You find an old chest. It is likely that you can open it with the key you have in your inventory. What do you want to do?</span>
        <span v-else>You find an old chest. This looks closed. If you got a key maybe you can open it and see what treasure it contains.</span>
      </div>
      <template slot="actions">
        <div class="bottomDialog__actionsBtn"
             @click="destroy"
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
import { mapGetters } from 'vuex'
import bottomDialog from '@/components/UI/Dialogs/BottomDialog'

export default {
  name: "Chest",
  props: {
    cellId: { required: true }
  },
  components: {
    bottomDialog
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    click: function() {
      if (this.playerInRange && !this.show) {
        this.show = true
      }
    },
    open: function () {
      let treasures = ['earnPotion', 'earnScore', 'earnExperience']
      let treasure = treasures[Math.floor(Math.random() * treasures.length)]
      this[treasure]()
      let indexKey = this.$store.getters.getInventory.items.findIndex(x => x.type === 'key')
      this.$store.commit('deleteItemInventory', indexKey)
      this.destroy()

    },
    earnPotion: function () {
      this.$store.commit('pushLog', 'Player receive a potion')
      if (this.$store.getters.getInventory.maxSize === this.$store.getters.getInventory.items.length) {
        this.$store.commit('pushLog', 'Your inventory is full')
      } else {
        let potion = require('@/gamedata/Items.json')['potion']
        this.$store.commit('addItemToInventory', potion)
      }
    },
    earnScore: function () {
      let points = 250
      this.$store.commit('setScore', points)
      this.$store.commit('pushLog', `Player receive ${points} points`)
    },
    earnExperience: function () {
      this.$store.commit('pushLog', 'Player gain more experience')
      this.$store.commit('setPlayerExperience', 5)
      if (this.$store.getters.getPlayer.defeatMonsters >= this.$store.getters.getPlayer.nextLevelMonsters) {
        this.$store.commit('levelUp')
      }
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
      return require('@/assets/npcs/chest.png')
    },
    playerInRange: function () {
      return this.getPlayerRange.indexOf(this.cellId) !== -1
    },
    hasKey: function () {
      return this.$store.getters.getInventory.items.find(x => x.type === 'key')
    }
  }
}
</script>

<style scoped lang="sass">
  .npc
    position: relative
    padding: 4px
  .npc img
    width: 100%
    height: 100%
    object-fit: contain
</style>
