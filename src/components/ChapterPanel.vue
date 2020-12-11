<template>
  <div class="chapter__panel">
    <div class="chapter__panel-header" @click="togglePanel">
      <p>{{chapterName}}</p>
    </div>
    <div class="chapter__pages-container">
      <div class="chapter__pages" v-for="page in pages" :key="page.name">
        <p>{{ page.name }}</p>
        <img class="chapter__pages-thumb" :src="thumbnail(page.thumb)" alt="">
        <div class="chapter__pages-control">
          <span class="chapter__control icon-down"></span>
          <span class="chapter__control icon-up"></span>
          <span class="chapter__control icon-plus"></span>
          <span class="chapter__control icon-x"></span>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  props: {
    chapterName: String,
    pages: Array
  },
  data() {
    return {
      panelState: false
    }
  },
  methods: {
    togglePanel() {
      if (!event.currentTarget.classList.contains('panel-open')) {
        this.$emit('updatePanelState')
        event.currentTarget.classList.add('panel-open')
        event.currentTarget.nextSibling.classList.add('panel-open')
      } else {
        this.$emit('updatePanelState')
      }
    },
    thumbnail(thumb) {
      try {
        return require('../assets/images/pages/' + thumb + '.png')
      } catch(err) {
        return require('../assets/images/pages/default.png')

      }
    }
  },
  computed: {
    
  }
}
</script>

<style>
.chapter__pages-thumb {
  max-width: 100%;
  box-shadow: 3px 3px 8px 2px #aaa;
  cursor: pointer;
}



.chapter__pages-container {
  max-height: calc(100vh - 365px); /* 340px temporary */
  overflow-y: scroll;
  height: 0;
  opacity: 0;
  transition: height .2s ease-in-out, opacity .5s;
}

.chapter__pages {
  padding: 11px 15px;
  /* border-top: 1px solid #ddd; */
}

.chapter__pages p {
  color: blue;
}

.chapter__panel-header {
  background: #F9F9F9;
  padding: 10px 15px;
  font-size: 16px;
  position: relative;
  cursor: pointer;
  -webkit-user-select: none;      
  -moz-user-select: none;
  border-bottom: 1px solid #ddd;
  -ms-user-select: none; 
}

.chapter__panel-header::after {
  content: url(~@/assets/images/icons/arrow.svg);
  position: absolute;
  right: 10px;
  top: 10px;
}

.chapter__control {
  width: 14px;
  height: 14px;
  margin: 1px;
  display: inline-block;
}

.panel-open {
  display: block;
}
.panel-open.chapter__pages-container {
  height: calc(100vh - 365px);
  transition: height .2s ease-in-out, opacity .5s;
  opacity: 1;
}
.panel-open::after {
  transform: rotate(180deg);
}

</style>