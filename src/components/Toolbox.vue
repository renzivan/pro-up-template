<template>
  <div class="toolbox">
    <SearchProjectPanel
      @updateToolboxPanelState="updateToolboxPanelState"
      @togglePanel="togglePanel"  
    />
    <LegendPanel 
      @updateToolboxPanelState="updateToolboxPanelState"
      @togglePanel="togglePanel"  
    />
    <TasksPanel 
      @updateToolboxPanelState="updateToolboxPanelState"
      @togglePanel="togglePanel"  
    />
  </div>
</template>

<script>
import SearchProjectPanel from './toolbox/SearchProjectPanel'
import LegendPanel from './toolbox/LegendPanel'
import TasksPanel from './toolbox/TasksPanel'
import accordion from '@/assets/js/accordion'

export default {
  components: {
    SearchProjectPanel,
    LegendPanel,
    TasksPanel
  },
  methods: {
    updateToolboxPanelState() {
      // console.log(event)
      const a = document.querySelectorAll('.toolbox__content-container')
      a.forEach(val => {
        if(val.classList.contains('panel-open')) {
          val.classList.remove('panel-open')
          val.previousSibling.classList.remove('panel-open')
        }
      })
    },
    togglePanel() {
      accordion.openPanel(event, '.toolbox__content-container')
    }
  }
}
</script>

<style>

</style>