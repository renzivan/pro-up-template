export default {
  test() {
    alert('okok')
  },
  updateToolboxPanelState(selector) {
    // console.log(event)
    const a = document.querySelectorAll(selector)
    a.forEach(val => {
      if(val.classList.contains('panel-open')) {
        val.classList.remove('panel-open')
        val.previousSibling.classList.remove('panel-open')
      }
    })
  },
  togglePanel(e, selector) {
    if (!e.currentTarget.classList.contains('panel-open')) {
      this.updateToolboxPanelState(selector)
      e.currentTarget.classList.add('panel-open')
      e.currentTarget.nextSibling.classList.add('panel-open')
      // console.log(e.currentTarget.nextSibling)
    } else {
      this.updateToolboxPanelState(selector)
      e.currentTarget.classList.remove('panel-open')
      e.currentTarget.nextSibling.classList.remove('panel-open')
    }
  },
  openPanel(e, selector) {
    if (!e.currentTarget.classList.contains('panel-open')) {
      // this.updateToolboxPanelState(selector)
      e.currentTarget.classList.add('panel-open')
      e.currentTarget.nextSibling.classList.add('panel-open')
      // console.log(e.currentTarget.nextSibling)
    } else {
      // this.updateToolboxPanelState(selector)
      e.currentTarget.classList.remove('panel-open')
      e.currentTarget.nextSibling.classList.remove('panel-open')
    }
  }
}