<template>
  <div class="npc zombie" :class="{'delete': isDelete}">
    <img :src="image" alt="" @click="click">
    <bottom-dialog
            v-if="show"
            @close="isDelete = true"
    >
      <div slot="legend">Receive {{ entity.action ? ' a Gift' : 'an Advice' }}</div>
      <div slot="title">Wandering zombie</div>
      <div slot="text">{{ entity.dialog }}</div>
      <span slot="close-text">Accept</span>
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
      entity : null,
      isDelete: false
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
            this.earnObject('potion')
            break
          case "Fog":
            this.deleteFog()
            break
          case "Key":
            this.earnObject('key')
            break
        }
      }
    },
    earnGold: function () {
      let gold = Math.round(Math.ceil(Math.random() * 140)) + 10
      this.$store.commit('setGold', gold)
      this.$store.commit('pushLog', `Player receive ${gold} gold`)
    },
    earnObject: function (objectName) {
      this.$store.commit('pushLog', 'Player receive a ' + objectName)
      if (this.$store.getters.getInventory.maxSize === this.$store.getters.getInventory.items.length) {
        this.$store.commit('pushLog', 'Your inventory is full')
      } else {
        let key = require('@/gamedata/Items.json')[objectName]
        this.$store.commit('addItemToInventory', key)
      }
    },
    earnScore: function () {
      let points = Math.round(Math.ceil(Math.random() * 150)) + 50
      this.$store.commit('setScore', points)
      this.$store.commit('pushLog', `Player receive ${points} points`)
    },
    deleteFog: function () {
      this.$store.commit('setEnableFog', false)
      this.$store.commit('pushLog', 'All the fog on the map is dissipated')
    },
    destroy: function () {
      this.show = false
      event.stopPropagation()
      this.$store.commit('pushLog', 'The zombie has suddenly escaped.')
      this.$store.commit('setPreview', null)
      this.$store.commit('destroyNpc', this.cellId)
    }
  },
  computed: {
    ...mapGetters([
      'getPlayerRange'
    ]),
    image: function () {
      return require('@/assets/npcs/zombie.png')
    },
    playerInRange: function () {
      return this.getPlayerRange.indexOf(this.cellId) !== -1
    }
  },
  beforeDestroy() {
    if (this.show || this.isDelete) {
      this.destroy()
    }
  },
  mounted() {
    document.querySelector('.zombie').addEventListener("transitionend", this.destroy, true)
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
.delete
  -webkit-transition: opacity 300ms ease-in-out
  -moz-transition: opacity 300ms ease-in-out
  -ms-transition: opacity 300ms ease-in-out
  -o-transition: opacity 300ms ease-in-out
  transition: opacity 300ms ease-in-out
  opacity: 0
</style>
