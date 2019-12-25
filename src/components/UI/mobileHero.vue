<template>
  <div class="mobileHero">
    <div class="heroPortrait"></div>
  </div>
</template>

<script>
export default {
  name: "mobileHero",
};
</script>

<style scoped lang="sass">
.mobileHero
  position: fixed
  top: 0
  left: 0
.heroPortrait
  height: calc(1.5 * var(--tile-cell))
  width: calc(1.5 * var(--tile-cell))
  display: block
  image-rendering: pixelated
  background-image: url("../../assets/ui/portrait_hero.png")
  background-size: contain
</style>