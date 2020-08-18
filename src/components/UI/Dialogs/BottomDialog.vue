<template>
  <div class="bottomDialog">
    <div class="bottomDialog__message">
      <div class="bottomDialog__messageContent">
        <slot name="image">
        </slot>
        <div class="bottomDialog__itemTitle">
          <slot name="title">
            Health Potion
          </slot>
        </div>
        <div class="bottomDialog__itemAttr">
          <slot name="legend">
          </slot>
        </div>
        <br>
        <div class="bottomDialog__text">
          <slot name="text">
          </slot>
        </div>
      </div>
    </div>
    <div class="bottomDialog__actions">
      <div class="bottomDialog__actionsBtn" @click="close">
        <slot name="close-text">
          Close
        </slot>
      </div>
      <slot name="actions">
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dialog",
  methods: {
    close: function () {
      this.$nextTick(() => {
        this.$emit('close')
      })
    }
  }
}
</script>

<style scoped lang="sass">
.bottomDialog
  display: flex
  flex-direction: column
  background-color: #000000
  position: fixed
  bottom: 0
  left: 0
  height: calc(2.5 * var(--tile-cell))
  width: 100%
  z-index: 10
.bottomDialog__message
  height: calc(1.75 * var(--tile-cell))
  width: 100%
  image-rendering: pixelated
  background-size: 100% 100%
  background-image: url("../../../assets/ui/bottomDialog__message.png")
  color: #FFF
  box-sizing: border-box
  padding: calc(1 * var(--pixel-unit)) 0
.bottomDialog__messageContent
  height: 100%
  width: 100%
  overflow-y: auto
  overflow-x: hidden
  box-sizing: border-box
  padding: calc(4 * var(--pixel-unit))
.bottomDialog__actions
  height: calc(.75 * var(--tile-cell))
  width: 100%
  image-rendering: pixelated
  background-size: 100% 100%
  background-image: url("../../../assets/ui/bottomDialog__actions.png")
  display: flex
  justify-content: space-between
  padding: calc(2 * var(--pixel-unit))
  box-sizing: border-box
  align-items: center
  line-height: calc(.5 * var(--tile-cell))
.bottomDialog__actionsBtn
  width: calc(2 * var(--tile-cell))
  height: calc(.5 * var(--tile-cell))
  image-rendering: pixelated
  background-size: 100% 100%
  background-image: url("../../../assets/ui/bottomDialog__actionsBtn.png")
  color: #FFF
  text-align: center
  &:focus, &:active
   opacity: 0.5
   transform: translateY(3px)
.bottomDialog__itemImg
  height: calc(.75 * var(--tile-cell))
  float: left
  margin-right: calc(.25 * var(--tile-cell))
.bottomDialog__itemTitle
  font-size: 22px
.bottomDialog__itemAttr
  color: green
@media screen and (min-width: 900px)
  .bottomDialog
    width: 500px !important
    height: 160px
    left: calc(50% - 250px)
    top: calc(50% - 80px)
    position: fixed !important
  .bottomDialog__message
    height: 122px
  .bottomDialog__messageContent
    padding: 10px 20px
    z-index: 10
  .bottomDialog__actionsBtn
    cursor: url('../../../assets/ui/cursor__move.png'), auto
  .dungeonUI__skillsMenuList .bottomDialog
    top: 440px
</style>

