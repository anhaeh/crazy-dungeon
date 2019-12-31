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
            +15 HP
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
      <div class="bottomDialog__actionsBtn" @click="close">Close</div>
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
      this.$store.commit('clickDialog')
      this.$emit('close')
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
.bottomDialog__message
  height: calc(1.75 * var(--tile-cell))
  width: 100%
  image-rendering: pixelated
  background-size: 100% 100%
  background-image: url("../../../assets/ui/bottomDialog__message.png")
  color: #FFF
  padding: calc(3 * var(--pixel-unit)) 0 calc(2 * var(--pixel-unit)) calc(5 * var(--pixel-unit))
  box-sizing: border-box
.bottomDialog__messageContent
  height: 100%
  width: 100%
  overflow-y: auto
  overflow-x: hidden
  &::-webkit-scrollbar
    background-color: red
    width: 1rem
  &::-webkit-scrollbar
    -webkit-appearance: none
  &::-webkit-scrollbar:vertical
    width: 12px
  &::-webkit-scrollbar-thumb
    background-color: rgba(0, 0, 0, .5)
    border-radius: 10px
    border: 2px solid #ffffff
  &::-webkit-scrollbar-track
    border-radius: 10px
    background-color: #ffffff
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
  // &:first-child
  //   margin-right: auto
.bottomDialog__itemImg
  height: calc(.75 * var(--tile-cell))
  float: left
  margin-right: calc(.25 * var(--tile-cell))
.bottomDialog__itemTitle
  font-size: 22px
.bottomDialog__itemAttr
  color: green
.bottomDialog__text
  margin-bottom: 10px
</style>
