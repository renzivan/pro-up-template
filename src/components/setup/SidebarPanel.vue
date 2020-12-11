<template>
  <div class="setup__panel">
    <div class="setup__panel-header panel-header" @click="togglePanel">
      <slot name="title"></slot>
    </div>
    <div class="setup__content-container panel__content-container">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    togglePanel() {
        this.$emit('togglePanel')
    }
  },
}
</script>

<style>

.setup__content-container {
  max-height: calc(100vh - 485px);
}

.panel-open.setup__content-container {
  height: calc(100vh - 485px);
}

</style>