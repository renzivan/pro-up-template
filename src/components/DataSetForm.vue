<template>
  <div class="form-container">
    <div class="templates">
      <div class="templates__choices">
        <div v-for="image in templates" :key="image.key" class="templates__choice">
          <div class="templates__controls">
            <span class="templates__control icon-down"></span>
            <span class="templates__control icon-up"></span>
            <span class="templates__control icon-plus"></span>
            <span class="templates__control icon-x"></span>
          </div>
          <img 
            name="svg-images"
            type="image/svg+xml"
            :src="image.pathLong"
            @click="clickImage(image.pathLong)"
          />
        </div>
      </div>
      <div class="templates__seleceted">
        <div class="form-actions">
          <div>
            <button class="proceed-button btn btn-warning" @click="previousPage">Back</button>
          </div>
          <div v-if="selectedTemplate">
            <button class="btn btn-info" @click="downloadFile">
              Save as PNG
            </button>
            <button class="btn btn-info" @click="downloadFileAsPDF">
              Save As PDF
            </button>
          </div>
        </div>
        <object :data="selectedTemplate" type="" id="selectedTemplate" @load="applyTemplate"></object>
        <canvas id="canvas" style="background: #fff;"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { saveAs } from 'file-saver'
import { jsPDF } from 'jspdf'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'DataSetForm',
  data() {
    return {
      projectName: '',
      versionDate: '',
      projectLogo: '',
      projectImage: '',
      templates: [],
      ojbURL: '',
      selectedTemplate: '',
      svgData: '',
      imgURI: '',
      obj: '',
      canvasWidth: '',
      canvasHeight: '',
      dragOffsetX: null,
      dragOffsetY: null,
      dragActive: ''
    }
  },
  methods: {
    ...mapActions([
      'handlePage'
    ]),
    previousPage() {
      this.handlePage(1)
    },
    applyTemplate(evt) {
      const obj = document.getElementById('selectedTemplate').contentDocument
      if (this.getProjectLogo && this.getProjectImage && this.getProjectName && this.getVersionDate) {
        this.setImages(obj, '__x003c_LOGOPANEL_x003e_', this.getProjectLogo)
        this.setImages(obj, '__x003c_PROJECTIMAGEPANEL_x003e_', this.getProjectImage)
        this.applyText(obj)
        const svg = obj.getElementsByTagName('svg')[0]
        // svg.getElementsByTagName('rect')[0].remove()
        this.svgData = svg

        const viewBox = svg.getAttribute('viewBox').split(' ')
        this.drawToCanvas(viewBox[2], viewBox[3])
        this.obj = document.getElementById('selectedTemplate').contentDocument

      } else {
        alert('All fields are required')
      }
    },
    importAll(path) {
      path.keys().forEach((key, index) => (this.templates.push({key: index, pathLong: path(key), pathShort: key })));
    },
    clickImage(key) {
      if (this.getProjectLogo && this.getProjectImage && this.getProjectName && this.getVersionDate){
        this.selectedTemplate = key

      } else {
        alert('All fields are required')
      }
    },
    setImages(obj, id, src) { // for public function
      const parent = obj.getElementById('Layer_x0020_1')
      const img = obj.getElementById(id)
      const x = img.getAttribute('x') || 0
      const y = img.getAttribute('y') || 0
      const width = img.getAttribute('width') || 0
      const height = img.getAttribute('height') || 0

      img.setAttribute('class', '')
      img.setAttribute('fill', 'transparent')
      img.remove()
      const newSVG = this.createSVG(x, y, width, height, src, id)
      // parent.insertBefore( newSVG, parent.firstChild)
      parent.append(newSVG)

    },
    createSVG(x, y, width, height, src, id,) { // for public function
      const svgns = "http://www.w3.org/2000/svg";
      const newImg = document.createElementNS(svgns, 'image');
      newImg.setAttribute('x', x)
      newImg.setAttribute('y', y)
      newImg.setAttribute('width', width)
      newImg.setAttribute('height', height)
      newImg.setAttribute('href', src)
      newImg.setAttribute('id', id)
      // Adding events
      
      // newImg.addEventListener('dblclick', this.setDragActive)
      newImg.addEventListener('mousedown', this.drag)
      newImg.addEventListener('mouseup', this.drop)
      return newImg
    },
    applyText(obj) { // possible for public function
      const parent = obj.getElementById('Layer_x0020_1')
      const svgns = "http://www.w3.org/2000/svg";
      const texts = obj.getElementsByTagName('text')
      const infoPanel = obj.getElementById('__x003c_PROJECTINFOPANEL_x003e_')

      if (infoPanel) {
        infoPanel.setAttribute('class', '')
        infoPanel.setAttribute('fill', 'transparent')
      }

      for (var key in texts) {
        if (texts.hasOwnProperty(key)) {
          if(texts[key].innerHTML.includes('PROJECTNAME')) {
            // texts[key].innerHTML = this.getProjectName
            const x = texts[key].getAttribute('x')
            const y = texts[key].getAttribute('y')
            const classList = texts[key].getAttribute('class')
            texts[key].remove()

            const newText = document.createElementNS(svgns, 'text')
            newText.setAttribute('x', x)
            newText.setAttribute('y', y)
            newText.setAttribute('class', classList)
            newText.innerHTML = this.getProjectName
            
            parent.append(newText)
          }
          if(texts[key].innerHTML.includes('VERSIONDATE')) {
            // texts[key].innerHTML = this.getVersionDate
            const x = texts[key].getAttribute('x')
            const y = texts[key].getAttribute('y')
            const classList = texts[key].getAttribute('class')
            texts[key].remove()
            
            const newText = document.createElementNS(svgns, 'text')
            newText.setAttribute('x', x)
            newText.setAttribute('y', y)
            newText.setAttribute('class', classList)
            newText.innerHTML = this.getVersionDate
            
            parent.append(newText)
          }
        }
      }
    },
    drawToCanvas(width, height) {
      this.svgData.getElementsByTagName('rect')[0].setAttribute('fill', '#fff')
      this.svgData.getElementsByTagName('rect')[0].setAttribute('class', 'str0') // <-- Might Change
      
      const canvas = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');
      const data = (new XMLSerializer()).serializeToString(this.svgData);
      const DOMURL = window.URL || window.webkitURL || window;

      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, width, height);

      this.canvasWidth = width
      this.canvasHeight = height

      canvas.setAttribute('width', width)
      canvas.setAttribute('height', height)

      const img = new Image();
      const svgBlob = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
      const url = DOMURL.createObjectURL(svgBlob);

      img.onload = function () {
        ctx.drawImage(img, 0, 0, width-5, height-5)
        DOMURL.revokeObjectURL(url)

        const imgURI = canvas
            .toDataURL('image/jpeg')
            .replace('image/jpeg', 'image/octet-stream');

        this.imgURI = imgURI
      };

      img.src = url;
    },
    downloadFile() {
      const canvas = document.getElementById("canvas");
      canvas.toBlob(function(blob) {
          saveAs(blob, "Generated Template.png");
      }, "image/png");
    },
    downloadFileAsPDF() {
      const canvas = document.getElementById("canvas");
      const imgData = canvas.toDataURL("image/jpeg", 1.0)
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [this.canvasWidth, this.canvasHeight]
      })
      pdf.setFillColor('#ffffff')

      pdf.addImage(imgData, 'JPEG', 0, 0, this.canvasWidth, this.canvasHeight)
      pdf.save('Generated Template.pdf')
    },
    drag({offsetX, offsetY, target, detail}) {
      // if (detail == 2) {
        this.dragActive = target.id
      // }
      if (this.dragActive) {
        this.dragOffsetY = offsetY - this.obj.getElementById(this.dragActive).y.baseVal.value
        this.dragOffsetX = offsetX - this.obj.getElementById(this.dragActive).x.baseVal.value
  
        this.obj.getElementsByTagName('svg')[0].addEventListener('mousemove', this.move)
        this.obj.getElementsByTagName('svg')[0].addEventListener('mouseup', this.drop)
      }

      // this.dragOffsetX = offsetX - this.square.x;
      // this.dragOffsetY = offsetY - this.square.y;\
      // this.dragOffsetX = offsetX - target.x.baseVal.value
      // this.dragOffsetY = offsetY - target.y.baseVal.value
    },
    drop() {
      this.dragOffsetX = this.dragOffsetY = this.dragActive = null;
      this.obj.getElementsByTagName('svg')[0].removeEventListener('mousemove', this.move)
      this.obj.getElementsByTagName('svg')[0].removeEventListener('mouseup', this)
      // const viewBox = this.svgData.getAttribute('viewBox').split(' ')
      // this.drawToCanvas(viewBox[2], viewBox[3])

    },
    move({offsetX, offsetY, target}) {
      let x = offsetX - this.dragOffsetX
      let y = offsetY - this.dragOffsetY
      
      this.obj.getElementById(this.dragActive).x.baseVal.value = x
      this.obj.getElementById(this.dragActive).y.baseVal.value = y

      // this.square.x = offsetX - this.dragOffsetX;
      // this.square.y = offsetY - this.dragOffsetY;
    }
  },
  computed: {
    ...mapGetters([
      'getProjectName',
      'getVersionDate',
      'getProjectLogo',
      'getProjectImage',
      'getPage'
    ])
  },
  mounted() {
    this.importAll(require.context('../assets/templates', true, /\.svg$/));
  },
}
</script>

<style scoped>
button {
  cursor: pointer;
}

.form-container {
  border: 2px solid #ddd;
  border-radius: 6px;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-auto-rows: 1fr auto;
}

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

.form-actions {
  justify-content: space-between;
  align-items: flex-end;
  display: flex;
  padding-bottom: 20px;
  min-height: 50px;
}

.form-actions button {
  margin: 5px; 
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
}

.template-image label:hover {
  font-weight: 600;
  color: #5a4dff
}

.template-image img {
  position: absolute;
  right: 20px;
}

.templates {
  display: grid;
  grid-template-columns: minmax(250px, 1fr) 3fr;
  grid-column: 1 / 3;
  /* border-top: 1px solid #ccc; */
}

.templates__choices {
  padding: 30px 15px;
  height: calc(100vh - 75px); /* 200px might change */
  overflow-y: scroll;
}

.templates__choices img {
  margin-bottom: 10px;
  cursor: pointer;
  contain: content;
  max-width: 100%;
  max-height: 100%;
}

.templates__choice {
  margin-bottom: 10px;
}

.templates__controls {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 5px;
}

.templates__control {
  width: 14px;
  height: 14px;
  margin: 1px;
  display: inline-block;
}

.templates__choices img:hover {
  outline: solid 5px aqua;
}

.templates__seleceted {
  width: 100%;
  padding: 10px
}

#selectedTemplate {
  max-width: 100%;
  max-height: 100%;
}

#canvas {
  display: none;
}

.fill-white {
  fill: #fff;
}
</style>
