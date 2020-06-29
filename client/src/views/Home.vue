<template>
  <div class="hello">
    <navbar />
    <div class="content">
      <button @click="load('/characters')">Characters</button>
      <button @click="load('/spells')">Spells</button>
      <button @click="load('/rules')">Rules</button>
      <button>Misc</button>
    </div>
  </div>
</template>

<script>
import navbar from '../components/NavBar'
export default {
  name: 'Home',
  props: {
    msg: String
  },
  components: {
    navbar
  },
  methods: {
    load: function(direction) {
      this.$router.push(direction);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  height:80vh;
  display: grid;
  grid-template-columns:  auto auto;
}
.content button {
  color: #214478;
  background-color: white;
  font-size: 20pt;
  display: inline-block;
  border-style: solid;
  border-color: #214478;
}
</style>
