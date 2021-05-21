<template>
  <div id="quest-log" class="questLog">
    <div class="questLog__message --border3">
      <div class="feed">
      <span v-for="(log, index) in questLog"
            :key="'log' + index"
            class="message"
      >
        {{ log }}
      </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestLog",
  data() {
    return {
      cursor: 0
    }
  },
  watch: {
    questLog: {
      handler() {
        this.$nextTick(() => {
          let scrollingElement = document.querySelector('.feed')
          scrollingElement.scrollTop = scrollingElement.scrollHeight
        })
      }
    }
  },
  computed: {
    questLog: function () {
      return this.$store.getters.getQuestLog
    }
  }
}
</script>

<style scoped lang="sass">
.questLog
  image-rendering: pixelated
  overflow: auto
  flex-direction: column
  background-color: #000000
  display: flex
  width: calc(5.5 * var(--tile-cell))
  top: -3px
  position: relative
.questLog__message
  height: var(--tile-125)
  width: 100%
  image-rendering: pixelated
  background-size: 100% 100%
  background-image: url("../../assets/ui/bottomDialog__message.png")
  opacity: 0.7
  box-sizing: border-box
  padding: calc(1 * var(--pixel-unit)) 0
.feed
  height: 100%
  width: 100%
  overflow-y: auto
  overflow-x: hidden
  box-sizing: border-box
  font-size: calc(4 * var(--pixel-unit))
  padding: var(--tile-5) var(--tile-15)
  line-height: calc(3.2*var(--pixel-unit))
  color: white
  opacity: 0.5
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
.message
  display: flex

@media screen and (min-width: 900px)
  .questLog
    position: fixed
    left: 0
    bottom: 0
    top: auto
    margin: 0
    height: 110px
    width: 400px
    z-index: 3
    background-size: 100% 100%
  .questLog__message
    height: calc(2.2 * var(--tile-cell))
    padding: calc(0.7 * var(--pixel-unit)) 0
  .feed
    height: 100%
    padding: 5px 15px
    font-size: 15px
    line-height: 17px
</style>
