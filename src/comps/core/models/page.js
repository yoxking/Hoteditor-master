import Element from '../models/element'
import LbpBackground from '../../plugins/lbp-background'

class Page {
  constructor (page = {}) {
    this.uuid = +new Date()
    this.title = page.title || ''
    this.width = page.width || 1920
    this.height = page.heigh || 1080
    this.bgColor = 'rgba(255, 255, 255, 0)'
    this.bgImage = ''
    if (Object.keys(page).length === 0) {
      this.elements = [new Element(LbpBackground)]
    } else if (Object.keys(page.elements).length === 0) {
      this.elements = [new Element(LbpBackground)]
    } else {
      this.elements = page.elements
    }
    // this.elements = page.elements || [new Element(LbpBackground)]
    this.setBackgroundStyle()
  }

  setPageSize (width, height) {
    this.width = width
    this.height = height
    this.setBackgroundStyle()
  }

  setBackgroundStyle () {
    this.elements.map(element => {
      if (element.name === 'lbp-background') {
        element.commonStyle.top = 0
        element.commonStyle.left = 0
        element.commonStyle.width = this.width
        element.commonStyle.height = this.height
        element.commonStyle.backgroundColor = this.bgColor
        element.commonStyle.backgroundImage = this.bgImage
        element.pluginProps.backgroundColor = this.bgColor
        element.pluginProps.backgroundImage = this.bgImage
      }
    })
  }

  clone () {
    const elements = this.elements.map(element => new Element(element))
    return new Page({ title: this.title, elements })
  }
}

export default Page
