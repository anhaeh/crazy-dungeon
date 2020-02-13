<template>
  <div class="container">
    <h2>High Scores</h2>
    <div v-if="!results" class="loader">Loading...</div>
    <div v-else class="table-score">
      <table>
        <tr>
          <th>NAME</th>
          <th>LVL</th>
          <th>SCORE</th>
          <th>DATE</th>
        </tr>
        <tr v-for="item in results" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.player_level }}</td>
          <td>{{ item.score }}</td>
          <td>{{ item.created.split('T')[0] }}</td>
        </tr>
      </table>
    </div>
    <div class="new style">
      <button @click="$router.push({ name: 'main-menu'})">Back</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "ClassSelection",
  data() {
    return {
      results: null
    }
  },
  methods: {
  },
  created() {
    axios.get('https://anhaeh.pythonanywhere.com/api/v1/dungeon/high-score/?size=100')
      .then((response) => {
        this.results = response.data.results
      })
  }
}
</script>

<style scoped lang="sass">
.container
  color: white
  font-family: 'OpenSansPXBold'
  display: flex
  align-items: center
  justify-content: center
  height: 100vh
  flex-direction: column
button
  margin: 15px
  font-family: 'OpenSansPXBold'
  color: white
  text-transform: capitalize
  font-size: 1.5rem
  background-color: #672806
  border-color: #533a18
td
  text-align: center
  padding: 0 10px
.table-score
  height: 60%
  overflow: scroll
</style>

<style scoped>
  .loader,
  .loader:before,
  .loader:after {
    background: #ffffff;
    -webkit-animation: load1 1s infinite ease-in-out;
    animation: load1 1s infinite ease-in-out;
    width: 1em;
    height: 4em;
  }
  .loader {
    color: #ffffff;
    text-indent: -9999em;
    margin: 88px auto;
    position: relative;
    font-size: 11px;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }
  .loader:before,
  .loader:after {
    position: absolute;
    top: 0;
    content: '';
  }
  .loader:before {
    left: -1.5em;
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }
  .loader:after {
    left: 1.5em;
  }
  @-webkit-keyframes load1 {
    0%,
    80%,
    100% {
      box-shadow: 0 0;
      height: 4em;
    }
    40% {
      box-shadow: 0 -2em;
      height: 5em;
    }
  }
  @keyframes load1 {
    0%,
    80%,
    100% {
      box-shadow: 0 0;
      height: 4em;
    }
    40% {
      box-shadow: 0 -2em;
      height: 5em;
    }
  }
</style>
