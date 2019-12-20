<template>
  <div class="container">
    <div class="row">
      <img class="monster-image" :src="image">
      <div class="name">{{ entity.monster.name }}</div>
    </div>
    <div class="row">
      <img class="attack-image" :src="imageAttack">
      <div>
        {{ entity.monster.damage }}
      </div>
    </div>
    <div class="row">
      <div class="life" :style="life"></div>
      <div class="life-background"></div>
      <div class="legend-health">{{ this.entity.actualHealth }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['entity'],
  name: "MonsterPreview",
  computed: {
    image: function () {
      return require('@/assets/monsters/' + this.entity.monster.image)
    },
    imageAttack: function () {
      return require('@/assets/items/sword.png')
    },
    life: function() {
      let percent = (this.entity.actualHealth * 100) / this.entity.monster.health
      return `width: ${percent}%`
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
  .life
    top: 150px
    left: 0
    height: 15px
    background: #3e9933
    z-index: 2
    width: 100%
    position: absolute
  .life-background
    top: 150px
    left: 0
    height: 15px
    background: red
    z-index: 1
    width: 100%
    position: absolute
  .legend-health
    text-align: center
    z-index: 3
</style>
