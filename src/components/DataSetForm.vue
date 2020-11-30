<template>
  <div class="form-container">
    <h1>Pro-UP</h1>
    <hr />
    <div class="inputs-container">
      <div>
        <label for="projectName">Project Name </label>
        <input type="text" v-model="projectName" id="projectName">
      </div>
      <div>
        <label for="versionDate"> Version Date </label>
        <input type="date" v-model="versionDate" id="versionDate">
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
        <img :src="projectImage" width="80px" />
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
        <img :src="projectLogo" width="80px" />
      </div>
    </div>
    <div class="templates">
      <div class="templates__choices">
        <img v-for="image in templates" :key="image.key"
          name="svg-images"
          type="image/svg+xml"
          :src="image.pathLong"
          width="300px"
          @click="clickImage(image.pathLong)"
        />
      </div>
      <div class="templates__seleceted">
        <object :data="selectedTemplate" type="" id="selectedTemplate" @load="applyTemplate"></object>
        <canvas id="canvas" style="background: #fff;"></canvas>
      </div>
    </div>
    <div>
      <button @click="downloadFile">
        Save as PNG
      </button>
      <button @click="downloadFileAsPDF">
        Save As PDF
      </button>
    </div>
    <hr />

  </div>
</template>

<script>
import { saveAs } from 'file-saver'
import { jsPDF } from 'jspdf'

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
          this.projectImage = e.target.result
        } else {
          this.projectLogo = e.target.result
        }
      }
      reader.readAsDataURL(file)
    },
    applyTemplate(evt) {
      const obj = document.getElementById('selectedTemplate').contentDocument
      if (this.projectLogo && this.projectImage && this.projectName && this.versionDate) {
        this.setImages(obj, '__x003c_LOGOPANEL_x003e_', this.projectLogo)
        this.setImages(obj, '__x003c_PROJECTIMAGEPANEL_x003e_', this.projectImage)
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
      if (this.projectLogo && this.projectImage && this.projectName && this.versionDate){
        this.selectedTemplate = key

      } else {
        alert('All fields are required')
      }
    },
    setImages(obj, id, src) {
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
    createSVG(x, y, width, height, src, id,) {
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
    applyText(obj) {
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
            // texts[key].innerHTML = this.projectName
            const x = texts[key].getAttribute('x')
            const y = texts[key].getAttribute('y')
            const classList = texts[key].getAttribute('class')
            texts[key].remove()

            const newText = document.createElementNS(svgns, 'text')
            newText.setAttribute('x', x)
            newText.setAttribute('y', y)
            newText.setAttribute('class', classList)
            newText.innerHTML = this.projectName
            
            parent.append(newText)
          }
          if(texts[key].innerHTML.includes('VERSIONDATE')) {
            // texts[key].innerHTML = this.versionDate
            const x = texts[key].getAttribute('x')
            const y = texts[key].getAttribute('y')
            const classList = texts[key].getAttribute('class')
            texts[key].remove()
            
            const newText = document.createElementNS(svgns, 'text')
            newText.setAttribute('x', x)
            newText.setAttribute('y', y)
            newText.setAttribute('class', classList)
            newText.innerHTML = this.versionDate
            
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
      if (detail == 2) {
        this.dragActive = target.id
      }
      if (this.dragActive) {
        this.dragOffsetY = offsetY - this.obj.getElementById(this.dragActive).y.baseVal.value
        this.dragOffsetX = offsetX - this.obj.getElementById(this.dragActive).x.baseVal.value
  
        this.obj.getElementsByTagName('svg')[0].addEventListener('mousemove', this.move)
      }

      // this.dragOffsetX = offsetX - this.square.x;
      // this.dragOffsetY = offsetY - this.square.y;\
      // this.dragOffsetX = offsetX - target.x.baseVal.value
      // this.dragOffsetY = offsetY - target.y.baseVal.value
    },
    drop() {
      this.dragOffsetX = this.dragOffsetY = this.dragActive = null;
      this.obj.getElementsByTagName('svg')[0].removeEventListener('mousemove', this.move)

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
  mounted() {
    this.importAll(require.context('../assets/templates', true, /\.svg$/));
  },
}
</script>

<style scoped>
button {
  cursor: pointer;
}

.form-container h1 {
  margin: 10px 30px;
  
}

.inputs-container {
  margin: 0 30px;
  line-height: 2;
  max-width: 300px;
}

.template-image label {
  cursor: pointer;
}
.template-image span {
  color: silver;
  font-size: 10px;
}

.template-image {
  display: flex;
  flex-direction: column;
}

.template-image label:hover {
  font-weight: 600;
  color: #5a4dff
}

.templates {
  display: grid;
  grid-template-columns: 1fr 3fr;
}

.templates__choices {
  padding: 30px 15px
}

.templates__choices img {
  margin-bottom: 10px;
  cursor: pointer;
}
.templates__choices img:hover {
  outline: solid 5px aqua;
}

.templates__seleceted {
  width: 100%;
  padding: 30px
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
