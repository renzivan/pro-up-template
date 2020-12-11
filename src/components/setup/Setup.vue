<template>
  <div class="setup">
    <div class="setup__sidebar">
      <SetupSidebar />
    </div>
    <div class="setup__main">
    </div>
    <div class="setup__sidebar">
      
    </div>
  </div>
</template>

<script>
import SetupSidebar from './SetupSidebar'


export default {
  components: {
    SetupSidebar
  }
}
</script>

<style>
.setup {
  display: grid;
  grid-template-columns: 250px 1fr 250px;
  grid-column-gap: 1em;
  width: 100%;
}

.setup__sidebar, .setup__main {
  overflow: hidden;
  border: 2px solid #ddd;
  border-radius: 6px;
  height: calc(100vh - 73px);
}

.setup__main {
  height: calc(100vh - 73px);
  width: 100%;
}

</style>