<template>
  <div id="quest-log" class="questLog">
    <div class="feed">
      <span v-for="(log, index) in messages"
            :key="'log' + index"
            class="message"
      >
        {{ log }}
      </span>
    </div>
    <div class="scroll-up" @click="increaseCursor()"></div>
    <div class="scroll-down" @click="decreaseCursor()"></div>
  </div>
</template>

<script>
export default {
  name: "LogQuest",
  data() {
    return {
      cursor: 0
    }
  },
  watch: {
    questLog: {
      handler() {
        this.cursor = 0
      }
    }
  },
  computed: {
    messages: function () {
      return this.cursor === 0 ? this.questLog.slice(-4) : this.questLog.slice(-(4 + this.cursor), -(this.cursor))
    },
    maxCursor: function () {
      let index = this.cursor === 0 ? 4 : 4 + (this.cursor)
      return this.questLog[index] === undefined
    },
    questLog: function () {
      return this.$store.getters.getQuestLog
    }
  },
  methods: {
    increaseCursor: function () {
      if (!this.maxCursor) {
        this.cursor += 1
      }
    },
    decreaseCursor: function () {
      if (this.cursor !== 0) {
        this.cursor -= 1
      }
    }
  }
};
</script>

<style scoped lang="sass">
.feed
  color: white
  opacity: 0.5
  font-size: calc(4 * var(--pixel-unit))
  background-color: rgba(255, 0, 255, 0.3)
  line-height: calc(3.2 * var(--pixel-unit))
  padding: var(--pixel-unit) calc(4 * var(--pixel-unit))
  box-sizing: border-box
  width: calc(4.5 * var(--tile-cell))
  height: var(--tile-cell)
.message
  display: flex
.scroll-up
  width: calc(13 * var(--pixel-unit))
  position: absolute
  height: calc(10 * var(--pixel-unit))
  right: 10px
  top: calc(3 * var(--pixel-unit))
.scroll-down
  width: calc(13 * var(--pixel-unit))
  position: absolute
  height: calc(10 * var(--pixel-unit))
  right: 10px
  top: calc(17 * var(--pixel-unit))
</style>
