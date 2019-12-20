<template>
  <div>
    monster: {{ entity.monster.name }}
    attack: {{ entity.monster.damage }}
    health: {{ entity.actualHealth }}
    <img :src="image">
  </div>
</template>

<script>
export default {
  props: ['entity'],
  name: "MonsterPreview",
  computed: {
    image: function () {
      return require('@/assets/monsters/' + this.entity.monster.image)
    }
  }
}
</script>

<style scoped lang="sass">
</style>