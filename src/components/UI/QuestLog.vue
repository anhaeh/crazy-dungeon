<template>
  <div id="quest-log" class="questLog">
    <div class="feed">
      <span v-for="(log, index) in questLog"
            :key="'log' + index"
            class="message"
      >
        {{ log }}
      </span>
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
        let scrollingElement = document.querySelector('#quest-log')
        scrollingElement.scrollTop = scrollingElement.scrollHeight
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
  background-image: url("../../assets/ui/questLog.png")
  image-rendering: pixelated
  overflow: auto
  background-repeat: round
  height: calc(1 * var(--tile-cell))
  background-size: contain
  width: calc(5.5 * var(--tile-cell))
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
.feed
  color: white
  opacity: 0.5
  font-size: calc(4 * var(--pixel-unit))
  line-height: calc(3.2 * var(--pixel-unit))
  padding: var(--pixel-unit) calc(4 * var(--pixel-unit))
  box-sizing: border-box
.message
  display: flex

@media screen and (min-width: 800px)
  .questLog
    height: 340px
    background-size: 100% 100%
  .feed
    height: 100%
    padding: 5px 15px
    font-size: 15px
    line-height: 17px
</style>
