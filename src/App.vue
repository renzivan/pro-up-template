<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <DataSetForm />
  </div>
</template>

<script>
import DataSetForm from './components/DataSetForm'

export default {
  name: 'App',
  components: {
    DataSetForm
  }
}
</script>

<style>
body {
  margin: 0;
	padding: 0;
}

*, *::before, *::after {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #333;
}
</style>
