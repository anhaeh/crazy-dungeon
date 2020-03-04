<template>
  <div class="npc monk" :class="{'delete': isDelete}">
    <img :src="image" alt="" @click="click">
    <bottom-dialog
            v-if="show"
            @close="isDelete = true"
    >
      <div slot="legend">Restore skills</div>
      <div slot="title">Monk</div>
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
import bottomDialog from '@/components/UI/Dialogs/BottomDialog'
import gameData from '@/gamedata/Npcs.json'

export default {
  name: "Monk",
  props: {
    cellId: { required: true }
  },
  components: {
    bottomDialog
  },
  data () {
    return {
      show: false,
      goldCost: gameData['monk'].price * this.$store.getters.getPlayer.level,
      isDelete: false
    }
  },
  methods: {
    click: function () {
      if (this.playerInRange && !this.show) {
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
      this.isDelete = true
    },
    close: function () {
      this.show = false
    },
    destroy: function () {
      event.stopPropagation()
      this.$store.commit('pushLog', 'The monk has suddenly escaped.')
      this.$store.commit('setPreview', null)
      this.$store.commit('destroyNpc', this.cellId)
    }
  },
  computed: {
    image: function () {
      return require('@/assets/npcs/monk.png')
    },
    playerInRange: function () {
      return this.$store.getters.getPlayerRange.indexOf(this.cellId) !== -1
    },
    hasGold: function () {
      return this.$store.getters.getPlayer.gold >= this.goldCost
    }
  },
  mounted () {
    document.querySelector('.monk').addEventListener("transitionend", this.destroy, true)
  }
}
</script>

<style scoped lang="sass">
  @import "./npc"
</style>
