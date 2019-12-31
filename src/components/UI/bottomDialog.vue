<template>
  <div class="bottomDialog">
    <div class="bottomDialog__message">
      <div class="bottomDialog__messageContent">
        <img src="../../assets/items/Item__29.png" alt="" class="bottomDialog__itemImg">
        <div class="bottomDialog__itemTitle">Health Potion</div>
        <div class="bottomDialog__itemAttr">+15 HP</div>
        <br>
        <div class="bottomDialog__text">         
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis numquam, odit eligendi unde. Animi optio cumque voluptates eos nihil exercitationem, dolores corporis a maiores quo ut, sint excepturi hic quisquam.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis numquam, odit eligendi unde. Animi optio cumque voluptates eos nihil exercitationem, dolores corporis a maiores quo ut, sint excepturi hic quisquam.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis numquam, odit eligendi unde. Animi optio cumque voluptates eos nihil exercitationem, dolores corporis a maiores quo ut, sint excepturi hic quisquam.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis numquam, odit eligendi unde. Animi optio cumque voluptates eos nihil exercitationem, dolores corporis a maiores quo ut, sint excepturi hic quisquam.
        </div>
      </div>
    </div>
    <div class="bottomDialog__actions">
      <div class="bottomDialog__actionsBtn">Discard</div>
      <div class="bottomDialog__actionsBtn">Equip</div>
      <div class="bottomDialog__actionsBtn">Close</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dialog",
};
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
  background-image: url("../../assets/ui/bottomDialog__message.png")
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
  &::-webkit-scrollbar
    background-image: url("../../assets/ui/bottomDialog__scrollbar.png")
    width: calc(.5 * var(--tile-cell))
    background-size: 100% 100%
    image-rendering: pixelated
  &::-webkit-scrollbar
    -webkit-appearance: none
  &::-webkit-scrollbar-thumb 
    background-image: url("../../assets/ui/bottomDialog__scrollbarThumb.png")
    background-size: 100% 100%
    image-rendering: pixelated
  &::-webkit-scrollbar-track
    border-radius: 10px
.bottomDialog__actions
  height: calc(.75 * var(--tile-cell))
  width: 100%
  image-rendering: pixelated
  background-size: 100% 100%
  background-image: url("../../assets/ui/bottomDialog__actions.png")
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
  background-image: url("../../assets/ui/bottomDialog__actionsBtn.png")
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
</style>