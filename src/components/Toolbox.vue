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
      if (!event.currentTarget.classList.contains('panel-open')) {
        // // this.$emit('updateToolboxPanelState')
        // this.updateToolboxPanelState()
        event.currentTarget.classList.add('panel-open')
        event.currentTarget.nextSibling.classList.add('panel-open')
        // console.log(event.currentTarget.nextSibling)
      } else {
        // this.$emit('updateToolboxPanelState')
        // this.updateToolboxPanelState()
        event.currentTarget.classList.remove('panel-open')
        event.currentTarget.nextSibling.classList.remove('panel-open')
      }
    }
  }
}
</script>

<style>

</style>