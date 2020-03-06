import Vue from 'vue'
import bottomDialog from '@/components/UI/Dialogs/BottomDialog'

export default Vue.extend({
  props: {
    cellId: { required: true }
  },
  components: {
    bottomDialog
  },
  methods: {
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
    }
  }
})
