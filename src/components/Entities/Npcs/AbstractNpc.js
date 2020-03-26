import bottomDialog from '@/components/UI/Dialogs/BottomDialog'

export default {
  props: {
    cellId: { required: true }
  },
  components: {
    bottomDialog
  },
  methods: {
    destroyNpc: function () {
      event.stopPropagation()
      this.show = false
      this.$store.commit('pushLog', `The ${this.$options.name} has suddenly escaped.`)
      this.$store.commit('setPreview', null)
      this.$store.commit('destroyNpc', this.cellId)
    }
  },
  computed: {
    image: function () {
      return require(`@/assets/npcs/${this.$options.name}.gif`)
    },
    playerInRange: function () {
      return this.$store.getters.getPlayerRange.indexOf(this.cellId) !== -1
    },
    selected: function () {
      let npcSelected = this.$store.getters.getNpcSelected
      return npcSelected && npcSelected.name === this.$options.name
    }
  }
}
