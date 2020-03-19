<template>
  <div id="app" class="unselectable">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  provide: {
    isMobile: window.screen.width <= 900
  }
};
</script>

<style lang="sass">
\:root
  --tile-cell: 14.2857vw // based on 7 tiles in viewport width
  --pixel-unit: 0.8928vw // based on 16 pixels inside 1 tile-cell

$tile: 14.2857vw // based on 7 tiles in viewport width
$pixel: 0.8928vw // based on 16 pixels inside 1 tile-cell

$color-att: #ea5b3d
$color-def: #4CAD55
$color-mAtt: #045793
$color-mDef: #911DBA

@font-face
  font-family: 'OpenSansPXBold'
  src: url('assets/font/OpenSansPXBold.ttf') format('truetype')
  font-weight: normal
  font-style: normal
body
  margin: 0
  width: 100%
  justify-content: center
  height: 100%
  background: black
  /* Disables pull-to-refresh but allows overscroll glow effects. */
  overscroll-behavior-y: contain
#app
  font-family: 'OpenSansPXBold', sans-serif
  display: flex
  align-items: center
  justify-content: center
  image-rendering: pixelated !important
  img
    image-rendering: pixelated !important
.unselectable
  -webkit-user-select: none
  -ms-user-select: none
  user-select: none
.fadeNav-enter-active, .fadeNav-leave-active
  transition: opacity .2s, transform .2s
.fadeNav-enter, .fadeNav-leave-to
  opacity: 0
  transform: translateX(5vh)
.fade-enter-active, .fade-leave-active
  transition: opacity .2s !important
.fade-enter, .fade-leave-to
  opacity: 0 !important
@media (min-width: 900px)
  \:root
    --tile-cell: 50px
</style>

<style>
  @keyframes counterAnimation {
    from { transform: translateY(30px); }
    to { transform: translateY(0); }
  }
</style>
