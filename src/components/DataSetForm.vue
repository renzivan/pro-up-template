<template>
  <div class="form-container">
    <div class="templates">
      <div class="templates__choices">
        <div v-for="(image, i) in templates" :key="i" class="templates__choice">
          <div class="templates__controls">
            <span class="templates__control icon-down" @click="moveDown(i)"></span>
            <span class="templates__control icon-up" @click="moveUp(i)"></span>
            <span class="templates__control icon-plus" @click="addTemplate(i)"></span>
            <span class="templates__control icon-x" @click="removeTemplate(i)"></span>
          </div>
          <img 
            name="svg-images"
            type="image/svg+xml"
            :src="image.pathLong"
            @click="clickImage(image.pathLong)"
          />
        </div>
        <input
          hidden
          type="file"
          accept="image/svg+xml" 
          id="new-template"
          @change="onProjectImageUpload">
        <img src="" alt="" id="tempimg">
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
      dragActive: '',
      previousDragActive: null,
      clickedTemplateIndex: null,
      svgWidthRatio: null,
      svgHeightRatio: null,
      origWidth: null,
      origHeight: null,
      newRect: null
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
        const svg = obj.getElementsByTagName('svg')[0]
        const viewBox = svg.getAttribute('viewBox').split(' ')
        const twidth = document.getElementById('selectedTemplate').offsetWidth
        const theight = document.getElementById('selectedTemplate').offsetHeight
        this.origWidth = viewBox[2]
        this.origHeight = viewBox[3]
        this.svgWidthRatio = twidth / this.origWidth
        this.svgHeightRatio = theight / this.origHeight
        this.svgData = svg
        
        this.setImages(obj, '__x003c_LOGOPANEL_x003e_', this.getProjectLogo)
        this.setImages(obj, '__x003c_PROJECTIMAGEPANEL_x003e_', this.getProjectImage)
        this.applyText(obj)
        // svg.getElementsByTagName('rect')[0].remove()
        


        svg.setAttribute('viewBox', `0 0 ${twidth} ${theight}`)

        this.drawToCanvas(this.origWidth, this.origHeight)
        svg.setAttribute('width', twidth)
        svg.setAttribute('height', theight)
        
        console.log(svg.getElementsByTagName('rect'))
        const rects = [...svg.getElementsByTagName('rect')]

        rects.forEach(rect => {
          rect.setAttribute('width', rect.getAttribute('width') * this.svgWidthRatio)
          rect.setAttribute('height', rect.getAttribute('height') * this.svgHeightRatio)
          rect.setAttribute('x', rect.getAttribute('x') * this.svgWidthRatio)
          rect.setAttribute('y', rect.getAttribute('y') * this.svgHeightRatio)
        })

        this.obj = document.getElementById('selectedTemplate').contentDocument

      } else {
        alert('All fields are required')
      }
    },
    importAll(path) {
      path.keys().forEach((key, index) => (this.templates.push({pathLong: path(key)})));
    },
    clickImage(image) {
      if (this.getProjectLogo && this.getProjectImage && this.getProjectName && this.getVersionDate){
        this.selectedTemplate = image
      } else {
        alert('All fields are required')
      }
    },
    setImages(obj, id, src) { // for public function
      const parent = obj.getElementById('Layer_x0020_1')
      const img = obj.getElementById(id)
      const x = img.getAttribute('x') * this.svgWidthRatio || 0
      const y = img.getAttribute('y') * this.svgHeightRatio || 0
      const width = img.getAttribute('width') * this.svgWidthRatio || 0
      const height = img.getAttribute('height') * this.svgHeightRatio || 0

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
            const x = texts[key].getAttribute('x') * this.svgWidthRatio
            const y = texts[key].getAttribute('y') * this.svgHeightRatio
            const classList = texts[key].getAttribute('class')
            const fontSize = parseFloat(window.getComputedStyle(texts[key], null).getPropertyValue('font-size')) * this.svgHeightRatio
  
            texts[key].remove()
  
            const newText = document.createElementNS(svgns, 'text')
            newText.innerHTML = `<tspan font-size='${fontSize}px'>${this.getProjectName}</tspan>`
            newText.setAttribute('class', classList)
            newText.setAttribute('x', x)
            newText.setAttribute('y', y)
            parent.append(newText)

          }
          if(texts[key].innerHTML.includes('VERSIONDATE')) {
            const x = texts[key].getAttribute('x') * this.svgWidthRatio
            const y = texts[key].getAttribute('y') * this.svgHeightRatio
            const classList = texts[key].getAttribute('class')
            const fontSize = parseFloat(window.getComputedStyle(texts[key], null).getPropertyValue('font-size')) * this.svgHeightRatio
  
            texts[key].remove()
  
            const newText = document.createElementNS(svgns, 'text')
            newText.innerHTML = `<tspan font-size='${fontSize}px'>${this.getVersionDate}</tspan>`
            newText.setAttribute('class', classList)
            newText.setAttribute('x', x)
            newText.setAttribute('y', y)
            newText.addEventListener('click', function(){ alert('ok') })
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
        // console.log('x', offsetX)
        // console.log(target.getAttribute('width'))\
        if (this.previousDragActive && this.previousDragActive !== target.id) {
          this.obj.getElementById('selectedRect')?.remove()
          this.newRect = null
        }

        if(this.newRect === null) {
          this.selectedElementRect(target)
        }
        
        this.obj.getElementsByTagName('svg')[0].addEventListener('mousemove', this.move)
        this.obj.getElementsByTagName('svg')[0].addEventListener('mouseup', this.drop)
      }
      this.obj.getElementById(this.dragActive).classList.add('selectedEl')
    },
    drop() {
      this.dragOffsetX = this.dragOffsetY = null;
      this.obj.getElementsByTagName('svg')[0].removeEventListener('mousemove', this.move)
      this.obj.getElementsByTagName('svg')[0].removeEventListener('mouseup', this)
      const viewBox = this.svgData.getAttribute('viewBox').split(' ')
      this.previousDragActive = this.dragActive
      if (!this.dragActive) {
        this.dragActive = null
        this.obj.getElementById('selectedRect').remove()
      }
      // this.drawToCanvas(viewBox[2], viewBox[3])
      // console.log(viewBox[2], viewBox[3])
    },
    move({offsetX, offsetY, target}) {
      let x = offsetX - this.dragOffsetX
      let y = offsetY - this.dragOffsetY
      
      this.obj.getElementById(this.dragActive).setAttribute('x', x)
      this.obj.getElementById(this.dragActive).setAttribute('y', y)

      this.newRect.setAttribute('x', x)
      this.newRect.setAttribute('y', y)

      // Todo: Rescale everything
    },
    selectedElementRect(target) {
      const svgns = "http://www.w3.org/2000/svg";

      this.newRect = document.createElementNS(svgns, 'rect')
      this.newRect.setAttribute('id', 'selectedRect')
      this.newRect.setAttribute('x', target.getAttribute('x'))
      this.newRect.setAttribute('y', target.getAttribute('y'))
      this.newRect.setAttribute('width', target.getAttribute('width'))
      this.newRect.setAttribute('height', target.getAttribute('height'))
      // newRect.setAttribute('style', 'fill:none;stroke:black;stroke-width:1')
      this.newRect.setAttribute('fill', 'transparent')
      this.newRect.setAttribute('class', 'str0')
      // this.newRect = newRect
      target.parentNode.insertBefore(this.newRect, target);
    },
    moveDown(key) {
      console.log(key)
      if (key + 1 < this.templates.length ) {
        const temp = this.templates[key + 1]
        this.$set(this.templates, key + 1, this.templates[key])
        this.$set(this.templates, key , temp)
      } else {
        alert('Last item')
      }
    },
    moveUp(key) {
      console.log(key)
      if (key !== 0 ) {
        const temp = this.templates[key - 1]
        this.$set(this.templates, key - 1, this.templates[key])
        this.$set(this.templates, key , temp)
      } else {
        alert('Top Item')
      }
    },
    removeTemplate(key) {
      this.templates.splice(key, 1)
    },
    addTemplate(key) {
      document.querySelector('#new-template').click()
      this.clickedTemplateIndex = key
    },
    onProjectImageUpload({target, dataTransfer}) {
      const files = target.files || dataTransfer.files
      if (!files.length)
        return
      this.createImage(files[0], target.id)
    },
    createImage(file, id) {
      // const image = new Image()
      const reader = new FileReader()
      reader.onload = ({target}) => {
        // const a = document.querySelector('#new-template').value
        const newTemplate = {
          pathLong: target.result
        }
        this.templates.splice(this.clickedTemplateIndex + 1, 0, newTemplate)
      }
      reader.readAsDataURL(file)
    },
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

.selectedEl {
  border: 2px solid royalblue;
}
</style>
