<template>
  <div class="toolbox__panel">
    <div class="toolbox__panel-header" @click="togglePanel">
      <p>Tasks</p>
    </div>
    <div class="toolbox__content-container">
      <div>
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" id="available-tab" data-toggle="tab" href="#available" role="tab" aria-controls="home" aria-selected="true">
              Available
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="completed-tab" data-toggle="tab" href="#completed" role="tab" aria-controls="profile" aria-selected="false">
              Completed
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="skipped-tab" data-toggle="tab" href="#skipped" role="tab" aria-controls="contact" aria-selected="false">
              Skipped
            </a>
          </li>
        </ul>
      </div>
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="available" role="tabpanel" aria-labelledby="available-tab">
         <div class="available__tasks shadow-sm">
           <div class="available__title">
             <p>Category Tagging</p>
             <span>REQ</span>
           </div>
           <p class="available__tag ">R Series - map IHLBL</p>
         </div>
         <div class="available__tasks shadow-sm">
           <div class="available__title">
             <p>Category Tagging</p>
             <span>REQ</span>
           </div>
           <p class="available__tag ">R Series - map IHLBL</p>
         </div>
         <div class="available__tasks shadow-sm">
           <div class="available__title">
             <p>Category Tagging</p>
             <span>REQ</span>
           </div>
           <p class="available__tag ">R Series - map IHLBL</p>
         </div>
        </div>
        <div class="tab-pane fade" id="completed" role="tabpanel" aria-labelledby="completed-tab">
          Completed
        </div>
        <div class="tab-pane fade" id="skipped" role="tabpanel" aria-labelledby="skipped-tab">
          Skipped
        </div>
      </div>
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

/* tab styles */
.toolbox__content-container {
  font-size: 12px;
}

.toolbox__content-container .nav-link {
  padding: 8px 10px;
}

.available__tasks {
  position: relative;
  padding: 5px 5px 5px 8px;
  border: 1px solid #ddd;
  margin: 5px;
}

.available__tasks::after {
  content: '';
  background: #F0AD4E;
  width: 3px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
}

.available__title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.available__title p {
  font-size: 12px;
  font-weight: 700;
}

.available__tasks span {
  background: #337AB7;
  color: #fff;
  font-size: 12px;
  padding: 1px 3px;
  font-weight: 300;
}

.available__tag {
  color: #aaa;
  font-size: 12px;
}
</style>