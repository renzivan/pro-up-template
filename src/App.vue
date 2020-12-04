<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
      <div class="top">
        <h1>Pro-UP</h1>
      </div>
    <div class="main-container">
      <!-- <div class="container"> -->
        <div class="presentation">
          <div class="presentation__chapters">
            <Chapters />
          </div>
          <div class="presentation__templates">
            <DataSetForm />
          </div>
          <div class="presentation__toolbox">
            <Chapters />
          </div>

        </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import DataSetForm from './components/DataSetForm'
import Chapters from './components/Chapters'

export default {
  name: 'App',
  components: {
    DataSetForm,
    Chapters
  }
}
</script>

<style>
body {
  margin: 0;
	padding: 0;
  height: 100%;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

input {
  padding: 5px;
  margin: 10px 10px 10px 0;
}

label {
 font-size: 14px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #333;
  
}
.main-container {
 /* height: 92vh; */
  /* overflow: hidden; */
  overflow: hidden;
  padding: 0 1em;
  display: flex;
}

.presentation {
  display: grid;
  grid-template-columns: 250px 1fr 250px;
  grid-column-gap: 1em;
}

.presentation__chapters, .presentation__toolbox {
  overflow: hidden;
  border: 2px solid #ddd;
  border-radius: 6px;

  height: calc(100vh - 56px);
}

/* .presentation__chapters:first-child {
  border-radius: 6px;

} */

</style>
