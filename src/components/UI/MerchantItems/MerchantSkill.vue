<template>
  <div class="dungeonUI__skillsMenuItem">
    <img class="dungeonUI__skillsMenuImg" :src="image">
    <div class="dungeonUI__skillsMenuDescription">
      <div class="dungeonUI__skillsMenuItemTitle">
        <span>{{ skill.name }}</span>
      </div>
      <div class="dungeonUI__skillsMenuItemType">
        <span class="price">{{ skill.price }} gold</span>
      </div>
      <span class="description">{{ skill.description }}</span>

      <div class="buy">
        <button @click="buy">Buy</button>
      </div>
    </div>
  </div>
</template>

<script>
import SkillsData from '@/gamedata/Skills.json'

export default {
  name: "MerchantListSkill",
  props: {
    name: {
      required: true
    }
  },
  data () {
    return {
      skill: SkillsData[this.name]
    }
  },
  computed: {
    image: function () {
      return require('@/assets/skills/' + this.skill.image)
    },
  },
  methods: {
    buy: function () {
      if (this.$store.getters.getPlayer.gold < this.skill.price) {
        this.$store.commit('pushLog', 'Insufficient gold')
      } else {
        this.$store.dispatch('buySkill', { name: this.skill.name, key: this.name })
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.dungeonUI__skillsMenuItem
  display: flex
  color: #C4C4C4
  min-height: calc(var(--tile-cell) * 1)
  border-bottom: var(--pixel-unit) solid #111111
  padding-bottom: calc(var(--tile-cell) * .25)
  margin-bottom: calc(var(--tile-cell) * .25)
  &.--active
    .dungeonUI__skillsMenuImg
      box-shadow: inset 0 0 0 var(--pixel-unit) #805a29
  &:last-child
    border-bottom: none
.dungeonUI__skillsMenuItemTitle
  font-size: 22px
.dungeonUI__skillsMenuImg
  height: calc(var(--tile-cell) * 1.25)
  min-width: calc(var(--tile-cell) * 1.25)
  box-shadow: inset 0 0 0 var(--pixel-unit) #2c261f
  margin-right: calc(var(--tile-cell) * .5)
.dungeonUI__skillsMenuItemType
  margin: 5px 0
.dungeonUI__skillsMenuItemDmg
  display: flex
  font-size: 19px
.dungeonUI__skillsMenuDescription
  min-height: calc(var(--tile-cell) * 1.25)
  display: flex
  flex-direction: column
  justify-content: flex-start
  box-sizing: border-box
.description
  font-size: 1rem
  padding-bottom: 5px
.price
  margin-left: 5px
  &:before
    content: ''
    display: inline-block
    width: 10px
    height: 10px
    margin-right: 10px
    background-color: #ffe91a
    border-radius: 25px
.buy button
  font-family: 'OpenSansPXBold'
  font-size: 1.1rem
  background-color: #672806
  border-color: #533a18
  color: white
</style>
