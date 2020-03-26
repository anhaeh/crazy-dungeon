<template>
  <component :is="npc.type" :cell-id="cellId"></component>
</template>

<script>
import merchant from "../Entities/Npcs/Merchant"
import necromancer from "../Entities/Npcs/Necromancer"
import chest from "../Entities/Npcs/Chest"
import monk from "../Entities/Npcs/Monk"
import viking from "../Entities/Npcs/Viking"

export default {
  name: 'Npc',
  props: ['npc', 'cellId'],
  components: {
    merchant,
    necromancer,
    chest,
    monk,
    viking
  }
}
</script>

<style lang="sass">
.npc.in-range
  img
    cursor: url('../../assets/ui/cursor__talk.png'), auto
</style>
