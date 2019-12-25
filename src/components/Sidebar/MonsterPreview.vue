<template>
  <div class="container">
    <div class="row">
      <img class="monster-image" :src="image">
      <div class="name">{{ entity.monster.name }}</div>
    </div>
    <div class="row">
      <img class="attack-image" :src="imageAttack">
      <div class="damage">
        {{ entity.monster.damage }}
      </div>
    </div>
    <div class="row">
      <health-bar :actual-health="entity.monster.health - entity.damage" :health="entity.monster.health"></health-bar>
    </div>
  </div>
</template>

<script>
import healthBar from './HealthBar'
export default {
  props: ['entity'],
  components: {
    healthBar
  },
  name: "MonsterPreview",
  computed: {
    image: function () {
      return require('@/assets/monsters/' + this.entity.monster.image)
    },
    imageAttack: function () {
      return require('@/assets/items/sword.png')
    }
  }
}
</script>

<style scoped lang="sass">
  .container
    height: 100%
    width: 100%
  .row
    margin: 15px
    display: flex
    justify-content: center
  .monster-image
    display: block
    width: 60px
    height: 60px
  .name
    padding: 25px
    font-size: 20px
    font-weight: bold
  .attack-image
    height: 30px
    width: 30px
    padding-right: 5px
  .damage
    padding-top: 5px
</style>
