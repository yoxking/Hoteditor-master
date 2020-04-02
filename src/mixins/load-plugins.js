import Vue from 'vue'
// import LbpButton from '@luban-h5/lbc-button'
import LbpButton from '../comps/plugins/lbp-button'
import LbpPicture from '../comps/plugins/lbp-picture'
import LbpVideo from '../comps/plugins/lbp-video'
import LbpMusic from '../comps/plugins/lbp-music'
import LbpText from '../comps/plugins/lbp-text'
import LbpBackground from '../comps/plugins/lbp-background'
import LbpSlide from '../comps/plugins/lbp-slide'
import LbpTimer from '../comps/plugins/lbp-timer'

export const pluginsList = [
  {
    i18nTitle: {
      'en-US': 'Text',
      'zh-CN': '文字'
    },
    title: '文字',
    icon: 'text-width',
    component: LbpText,
    visible: true,
    name: LbpText.name
  },
  {
    i18nTitle: {
      'en-US': 'Button',
      'zh-CN': '普通按钮'
    },
    title: '普通按钮',
    icon: 'hand-pointer-o',
    component: LbpButton,
    visible: true,
    name: LbpButton.name
  },
  {
    title: '图片',
    i18nTitle: {
      'en-US': 'Picture',
      'zh-CN': '图片'
    },
    icon: 'photo',
    component: LbpPicture,
    visible: true,
    name: LbpPicture.name
  },
  {
    i18nTitle: {
      'en-US': 'Carousel',
      'zh-CN': '轮播图'
    },
    title: '轮播图',
    icon: 'photo',
    component: LbpSlide,
    visible: true,
    name: LbpSlide.name
    // disabled: true
  },
  {
    i18nTitle: {
      'en-US': 'Video',
      'zh-CN': '视频'
    },
    title: '视频',
    icon: 'file-video-o',
    component: LbpVideo,
    visible: true,
    name: LbpVideo.name
  },
  {
    i18nTitle: {
      'en-US': 'Music',
      'zh-CN': '音乐'
    },
    title: '音乐',
    icon: 'music',
    component: LbpMusic,
    visible: true,
    name: LbpMusic.name
  },
  {
    i18nTitle: {
      'en-US': 'Timer',
      'zh-CN': '时间'
    },
    title: '时间',
    icon: 'text-width',
    component: LbpTimer,
    visible: true,
    name: LbpTimer.name
  },
  {
    i18nTitle: {
      'en-US': 'Background',
      'zh-CN': '背景'
    },
    title: '背景',
    icon: 'dot-circle-o',
    component: LbpBackground,
    visible: false,
    name: LbpBackground.name
  }
]

export default {
  data: () => ({
    pluginsList
  }),
  methods: {
    mixinPlugins2Editor () {
      pluginsList.forEach(plugin => {
        // 全局注册组件，便于以后扩展自定义脚本，注释原来的局部注册：this.$options.components[plugin.name] = plugin.component
        Vue.component(plugin.name, plugin.component)
      })
    }
  },
  created () {
    this.mixinPlugins2Editor()
  }
}
