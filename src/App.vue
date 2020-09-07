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
  //units/base
  --tile-cell: 14.2857vw // based on 7 tiles in viewport width
  --pixel-unit: 0.8928vw // based on 16 pixels inside 1 tile-cell
  --tile: 14.2857vw // based on 7 tiles in viewport width
  //units/scales
  --tile-5: calc(.05 * var(--tile))
  --tile-10: calc(.15 * var(--tile))
  --tile-15: calc(.15 * var(--tile))
  --tile-25: calc(.25 * var(--tile))
  --tile-50: calc(.5 * var(--tile))
  --tile-75: calc(.75 * var(--tile))
  --tile-125: calc(1.25 * var(--tile))
  --tile-150: calc(1.5 * var(--tile))
  --tile-175: calc(1.75 * var(--tile))
  --tile-200: calc(2 * var(--tile))
  --tile-250: calc(2.5 * var(--tile))
  --tile-275: calc(2.75 * var(--tile))
  --tile-300: calc(3 * var(--tile))
  --tile-325: calc(3.25 * var(--tile))
  --tile-350: calc(3.5 * var(--tile))
  --tile-400: calc(4 * var(--tile))
  --tile-425: calc(4.25 * var(--tile))
  --tile-450: calc(4.5 * var(--tile))
  --tile-475: calc(4.75 * var(--tile))
  --tile-500: calc(5 * var(--tile))
  --tile-525: calc(5.25 * var(--tile))
  --tile-550: calc(5.5 * var(--tile))
  //font/sizes
  --font-size-xs: calc(var(--pixel-unit) * 5)
  --font-size-sm: calc(var(--pixel-unit) * 7)
  --font-size-md: calc(var(--pixel-unit) * 10)
  --font-size-lg: calc(var(--pixel-unit) * 12)
  --font-size-xl: calc(var(--pixel-unit) * 14)
  --font-size-d1: calc(var(--pixel-unit) * 20)
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
  overflow: hidden
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
    --tile-cell: 48px
    --tile: 48px
    --pixel-unit: 3px // based on 16 pixels inside 1 tile-cell
    // Font Size
    --font-size-xs: 0.65rem // 10.4px
    --font-size-sm: 0.8rem // 12.8px
    --font-size-md: 1.25rem // 16px
    --font-size-lg: 1.5rem // 24px
    --font-size-xl: 2rem // 32px
    --font-size-d1: 4rem // 64px
    // Thin Scrollbar
    scrollbar-color: #3f2c11 #32220f !important
    scrollbar-width: thin !important
    overflow: hidden
    body
      cursor: url('assets/ui/cursor.png'), auto
    button, select
      cursor: url('assets/ui/cursor__attack.png'), auto
</style>

<style>
  @keyframes counterAnimation {
    from { transform: translateY(30px); }
    to { transform: translateY(0); }
  }
</style>

<!-- Utilitarios -->
<style lang="sass">
  .--border1
    border: var(--tile-25) solid transparent
    border-image: url(assets/ui/border1.png) repeat
    border-image-slice: 20%
    background-color: #0e0b0a
    box-sizing: border-box
  // .--border1-bg  
  //   background-image: url('assets/ui/border1/border1__tl.png'), url('assets/ui/border1/border1__tr.png'), url('assets/ui/border1/border1__bl.png'), url('assets/ui/border1/border1__br.png'), url('assets/ui/border1/border1__t.png'), url('assets/ui/border1/border1__r.png'), url('assets/ui/border1/border1__b.png'), url('assets/ui/border1/border1__l.png')
  //   background-position: left top, right top, bottom left, bottom right, top, right, bottom, left
  //   background-repeat: no-repeat, no-repeat, no-repeat, no-repeat, repeat-x, repeat-y, repeat-x, repeat-y
  //   background-size: calc(var(--tile-cell) / 2)
  //   padding: calc(var(--tile-cell) / 4)
  //   box-sizing: border-box
  .--border2
    border: var(--tile-cell) solid transparent
    border-image: url(assets/ui/border2.png) repeat
    border-image-slice: 33.333333%
    background-color: #000
    box-sizing: border-box
  .--border3
    border: calc(var(--pixel-unit) * 2.5) solid transparent
    border-image: url(assets/ui/border-4.png) repeat
    border-image-slice: 34%
    background-color: #0e0b0a
    box-sizing: border-box
  .btn
    border: calc(var(--pixel-unit) * 2.5) solid transparent
    border-image: url(assets/ui/border-5.png) repeat
    border-image-slice: 34%
    background-image: url('assets/ui/bg-1.png')
    background-size: cover
    padding: 0
    color: #FFF
    font-family: 'OpenSansPXBold', sans-serif
    font-size: calc(var(--pixel-unit) * 7)
    &.--green
      // border: calc(var(--pixel-unit) * 2.5) solid transparent
      border-image: url(assets/ui/border-5--green.png) repeat
      border-image-slice: 34%
      background-image: url(assets/ui/bg-1--green.png)
</style>
