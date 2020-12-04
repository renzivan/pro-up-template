<template>
  <div class="chapters">
    <ChapterPanelPreface 
      @updatePanelState="updatePanelState"
      chapterName="Preface"
      class="red"
      :pages="chapters.preface"
    />
     <ChapterPanelPreface 
      @updatePanelState="updatePanelState"
      chapterName="Installation Maps"
      :pages="chapters.preface"
    />
     <ChapterPanelPreface 
      @updatePanelState="updatePanelState"
      chapterName="Shop Drawings"
      :pages="chapters.preface"
    />
     <ChapterPanelPreface 
      @updatePanelState="updatePanelState"
      chapterName="Sign Proofs"
      :pages="chapters.preface"
    />
     <ChapterPanelPreface 
      @updatePanelState="updatePanelState"
      chapterName="Message Schedule"
      :pages="chapters.preface"
    />
     <ChapterPanelPreface 
      @updatePanelState="updatePanelState"
      chapterName="Evacuation Maps"
      :pages="chapters.preface"
    />
     <ChapterPanelPreface 
      @updatePanelState="updatePanelState"
      chapterName="Takeoff"
      :pages="chapters.preface"
    />
  </div>
</template>

<script>
  import ChapterPanelPreface from './ChapterPanelPreface'

export default {
  components: {
    ChapterPanelPreface
  },
  data() {
    return {
      panelState: 0,
      chapters:{
        preface: [
          {
            name: "Cover",
            thumb: "cover"
          },
          {
            name: "TOC",
            thumb: "TOC"
          },
          {
            name: "Legal",
            thumb: "legal"
          }
        ]
      }
    }
  },
  methods: {
    updatePanelState() {
      // console.log(event)
      const a = document.querySelectorAll('.chapter__pages-container')
      a.forEach(val => {
        if(val.classList.contains('panel-open')) {
          val.classList.remove('panel-open')
          val.previousSibling.classList.remove('panel-open')
        }
      })
    }
  }
}
</script>

<style>
.chapters:first-child > chapter__panel-header {
  border-radius: 5px 5px 0 0;
}

</style>