<template>
<div class="input-group">
  <div class="inputs-container">
    <div class="input-group">
      <label for="projectName">Project Name </label>
      <input
        type="text"
        id="projectName"
        @input="setProjectName"
        :value="getProjectName"
      >
    </div>
    <div class="input-group">
      <label for="versionDate"> Version Date </label>
      <input
        type="date"
        id="versionDate"
        @input="setVersionDate"
        :value="getVersionDate"
      >
    </div>
    <div class="template-image">
      <label for="projectImage"> Project Image <span>(click to Select)</span></label>
      <input
        type="file"
        accept="image/*"
        name="projectImage"
        id="projectImage"
        style="display: none"
        @change="onProjectImageUpload"
      >
      <img :src="getProjectImage" width="40px" />
    </div>
    <div class="template-image">
      <label for="projectLogo"> Logo <span>(click to Select)</span></label>
      <input
        type="file"
        accept="image/*"
        name="projectLogo"
        id="projectLogo"
        style="display: none"
        @change="onProjectImageUpload"
      >
      <img :src="getProjectLogo" width="40px" />
    </div>
  </div>
</div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {

    }
  },
  methods: {
    ...mapActions([
      'handleProjectName',
      'handleVersionDate',
      'handleProjectLogo',
      'handleProjectImage'
    ]),
    setProjectName(e) {
      this.handleProjectName(e.target.value)
    },
    setVersionDate(e) {
      this.handleVersionDate(e.target.value)
    },
    onProjectImageUpload(e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length)
        return
      this.createImage(files[0], e.target.id)
    },
    createImage(file, id) {
      // const image = new Image()
      const reader = new FileReader()
      reader.onload = (e) => {
        if (id === 'projectImage') {
          this.handleProjectImage(e.target.result)
          // this.projectImage = e.target.result
        } else {
          this.handleProjectLogo(e.target.result)
          // this.projectLogo = e.target.result
        }
      }
      reader.readAsDataURL(file)
    }
  },
  computed: {
    ...mapGetters([
      'getProjectName',
      'getVersionDate',
      'getProjectLogo',
      'getProjectImage'
    ])
  }
}
</script>

<style scoped>
.inputs-container {
  margin: 0 30px;
  line-height: 2;
  max-width: 350px;
}

.input-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.input-group input {
  width: calc(100% - 100px);
}

.input-group label {
  white-space: nowrap;
}

.template-image label {
  cursor: pointer;
  margin: 10px 10px 10px 0
}

.template-image span {
  color: silver;
  font-size: 10px;
}

.template-image {
  display: flex;
  position: relative;
  align-items: center;
}

.template-image label:hover {
  font-weight: 600;
  color: #5a4dff
}

.template-image img {
  position: absolute;
  right: 20px;
}
</style>