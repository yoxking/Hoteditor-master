// register-global-support-component
import Vue from 'vue'
import ImageGallery from '@/frames/image-gallery/gallery.js'
import LbpTextAlign from '@luban-h5/lbs-text-align'

Vue.component(ImageGallery.name, ImageGallery)
Vue.component('lbs-text-align', LbpTextAlign)
