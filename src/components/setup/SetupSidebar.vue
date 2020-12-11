// rename file
<template>
  <div class="toolbox">
    <!-- <SidebarPanel
      @togglePanel="togglePanel"  
    /> -->
    <sidebar-panel @togglePanel="togglePanel">
      <p slot="title">Details</p>
        <!-- Inser panel contents here -->
      <div slot="content">
        Details
      </div>
    </sidebar-panel>

    <sidebar-panel @togglePanel="togglePanel">
      <p slot="title" class="ok">Documents</p>
        <!-- Inser panel contents here -->
      <div slot="content">
        Documents
      </div>
    </sidebar-panel>

    <sidebar-panel @togglePanel="togglePanel">
      <p slot="title">Plan Set</p>
      <div slot="content">
        <!-- Inser panel contents here -->
        <button class="btn btn-success">test</button>
      </div>
    </sidebar-panel>

    <sidebar-panel @togglePanel="togglePanel">
      <p slot="title">Art Assets</p>
        <!-- Inser panel contents here -->
      <div slot="content">
        
      </div>
    </sidebar-panel>
    <sidebar-panel @togglePanel="togglePanel">
      <p slot="title">Shop Drawing</p>
        <!-- Inser panel contents here -->
      <div slot="content">
        
      </div>
    </sidebar-panel>
    
    <sidebar-panel @togglePanel="togglePanel">
      <p slot="title">Sign Summary</p>
        <!-- Inser panel contents here -->
      <div slot="content">
        
      </div>
    </sidebar-panel>

    <sidebar-panel @togglePanel="togglePanel">
      <p slot="title">Sign Proofs</p>
        <!-- Inser panel contents here -->
      <div slot="content">
        
      </div>
    </sidebar-panel>

    <sidebar-panel @togglePanel="togglePanel">
      <p slot="title">Backup</p>
        <!-- Inser panel contents here -->
      <div slot="content">
        
      </div>
    </sidebar-panel>

    <sidebar-panel @togglePanel="togglePanel">
      <p slot="title">Work Orders</p>
        <!-- Inser panel contents here -->
      <div slot="content">
        
      </div>
    </sidebar-panel>

    <sidebar-panel @togglePanel="togglePanel">
      <p slot="title">Tasks</p>
        <!-- Inser panel contents here -->
      <div slot="content">
        
      </div>
    </sidebar-panel>
  </div>
</template>

<script>
import SidebarPanel from './SidebarPanel'

import accordion from '@/assets/js/accordion'

export default {
  components: {
    'sidebar-panel':SidebarPanel,
  },
  methods: {
    togglePanel() {
      accordion.togglePanel(event, '.setup__content-container')
    }
  }
}
</script>

<style scoped>

</style>