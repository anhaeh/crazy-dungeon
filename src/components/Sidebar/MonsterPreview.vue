<template>
  <div>
    <img :src="image">
    monster: {{ entity.monster.name }}
    attack: {{ entity.monster.damage }}
    health: {{ entity.actualHealth }}
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
  img
    width: 50px
    height: auto
</style>