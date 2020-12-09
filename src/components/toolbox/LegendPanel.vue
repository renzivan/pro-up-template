<template>
  <div class="toolbox__panel">
    <div class="toolbox__panel-header" @click="togglePanel">
      <p>Legend</p>
    </div>
    <div class="toolbox__content-container">
     
    </div>
  </div>
</template>

<script>


export default {
  props: {
    toolboxName: String,
    pages: Array
  },
  data() {
    return {
      panelState: false
    }
  },
  methods: {
    togglePanel() {
        this.$emit('togglePanel')
    }
  },
  computed: {
    
  }
}
</script>

<style>
.toolbox__content-thumb {
  max-width: 100%;
  box-shadow: 3px 3px 8px 2px #aaa;
  cursor: pointer;
}

.toolbox__content-container {
  max-height: calc(100vh - 340px); /* 340px temporary */
  overflow-y: scroll;
  height: 0;
  opacity: 0;
  transition: height .2s ease-in-out, opacity .5s;
}

.toolbox__content {
  padding: 11px 15px;
  /* border-top: 1px solid #ddd; */
}

.toolbox__content p {
  color: blue;
}

.toolbox__panel-header {
  background: #F9F9F9;
  padding: 10px 15px;
  font-size: 16px;
  /* border-radius: 5px 5px 0 0; */
  position: relative;
  cursor: pointer;
  -webkit-user-select: none; /* Chrome/Safari */        
  -moz-user-select: none; /* Firefox */
  border-bottom: 1px solid #ddd;
  -ms-user-select: none; /* IE10+ */
}

.toolbox__panel-header::after {
  content: url(~@/assets/images/icons/arrow.svg);
  position: absolute;
  right: 10px;
  top: 10px;
}

.panel-open {
  display: block;
}

.panel-open.toolbox__content-container {
  height: calc(100vh - 340px);
  transition: height .2s ease-in-out, opacity .5s;
  opacity: 1;
}
.panel-open::after {
  transform: rotate(180deg);
}

</style>