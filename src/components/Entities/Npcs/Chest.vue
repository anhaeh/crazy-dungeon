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
import { mapGetters } from 'vuex'
import bottomDialog from '@/components/UI/Dialogs/BottomDialog'
import gameData from '@/gamedata/Npcs.json'

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
      show: false,
      entity: gameData['chest']
    }
  },
  methods: {
    click: function() {
      if (this.playerInRange && !this.show) {
        this.show = true
      }
    },
    callDestroy: function () {
      this.$store.commit('pushLog', 'You hit the chest and explode into pieces along with its contents.')
      this.destroy()
    },
    open: function () {
      let treasures = ['earnItem', 'earnScore', 'earnExperience']
      let treasure = treasures[Math.floor(Math.random() * treasures.length)]
      let indexKey = this.$store.getters.getInventory.items.findIndex(x => x.type === 'key')
      this.$store.commit('deleteItemInventory', indexKey)
      this[treasure]()
      this.destroy()
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
      if (this.$store.getters.getPlayer.defeatMonsters >= this.$store.getters.getPlayer.nextLevelMonsters) {
        this.$store.commit('levelUp')
      }
    },
    destroy: function () {
      event.stopPropagation()
      this.$store.commit('setPreview', null)
      this.$store.commit('destroyNpc', this.cellId)
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
    img
      width: 100%
      height: 100%
      object-fit: contain
      filter: drop-shadow(0px 0px 2px black)
</style>
