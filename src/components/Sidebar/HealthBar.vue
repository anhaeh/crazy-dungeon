<template>
  <div class="health-bar">
    <div class="life" :style="life"></div>
    <div class="life-background"></div>
    <div class="legend-health">{{ actualHealth }}/{{ health }}</div>
  </div>
</template>

<script>
export default {
  name: "HealthBar",
  props: ["actualHealth", "health"],
  computed: {
    life: function() {
      let percent = (this.actualHealth * 100) / this.health
      return `width: ${percent}%`
    }
  }
}
</script>

<style scoped lang="sass">
  .health-bar
    
  .life
    top: 160px
    left: 0
    height: 20px
    background: #3e9933
    z-index: 2
    width: 100%
    position: absolute
    -webkit-transition: width 250ms
    transition: width 250ms
  .life-background
    top: 160px
    left: 0
    height: 20px
    background: #a40000
    z-index: 1
    width: 100%
    position: absolute
  .legend-health
    margin: 11px 0
    position: relative
    text-align: center
    z-index: 3
</style>