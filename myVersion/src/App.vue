<template>
  <div id="app">
    <vHeader></vHeader>
    <router-view/>
  </div>
</template>

<script>
import vHeader from "./components/header/header"
export default {
  name: 'app',
  components: {
    vHeader
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
