<template>
  <div class="bottomDialog">
    <div class="bottomDialog__messageContent --border3">
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
    <div class="bottomDialog__actions --border3">
      <div class="btn" @click="close">
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
  width: 100%
  z-index: 200
.bottomDialog__messageContent
  height: 100%
  width: 100%
  overflow-y: auto
  overflow-x: hidden
  padding: var(--tile-25)
  color: #FFF
.bottomDialog__actions
  width: 100%
  display: flex
  justify-content: space-between
  .btn
    padding: 0 var(--tile-50)
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
    z-index: 100
  .bottomDialog__actionsBtn
    cursor: url('../../../assets/ui/cursor__move.png'), auto
  .dungeonUI__skillsMenuList .bottomDialog
    top: 440px
</style>

