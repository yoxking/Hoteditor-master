<script>
import Vue from 'vue'
import { pluginsList } from '@/mixins/load-plugins.js'
import Element from '@/comps/core/models/element'
import NodeWrapper from '@/comps/preview/node-wrapper.js'

export default {
  name: 'engine',
  components: {
    NodeWrapper
  },
  data: () => ({
    work: {}
  }),
  methods: {
    initComponents () {
      pluginsList.forEach(plugin => {
        Vue.component(plugin.name, plugin.component)
      })
    },
    renderPreview (h, _elements) {
      const elements = _elements.map(element => new Element(element))
      return (
        <div style={{ height: '100%', position: 'relative' }}>
          {
            elements.map((element, index) => {
              return <node-wrapper element={element}>
                {h(element.name, element.getPreviewData({ position: 'static' }))}
              </node-wrapper>
            })
          }
        </div>
      )
    }
  },
  render (h) {
    // const work = JSON.parse('{"id":100,"title":"default title","description":"default desc","cover_image_url":null,"is_publish":null,"create_time":null,"update_time":null,"pages":[{"uuid":1578128227854,"title":"","width":600,"height":600,"bgColor":"rgba(255, 255, 255, 0)","bgImage":"","elements":[{"name":"lbp-background","uuid":1578128227854,"pluginProps":{"uuid":1578128227854,"backgroundColor":"rgba(245, 6, 6, 0.96)","backgroundImage":""},"commonStyle":{"top":0,"left":0,"width":600,"height":600,"textAlign":"center","color":"#000000","backgroundColor":"rgba(245, 6, 6, 0.96)","backgroundImage":"","fontSize":14},"events":[],"animations":[]},{"name":"lbp-picture","uuid":1578128242431,"pluginProps":{"uuid":1578128242431,"imgSrc":"/img/lbp-picture-placeholder.aa9bb3d3.png"},"commonStyle":{"top":134,"left":101,"width":401,"height":400,"textAlign":"center","color":"#000000","backgroundColor":"rgba(255, 255, 255, 0)","backgroundImage":"","fontSize":14},"events":[],"animations":[]},{"name":"lbp-music","uuid":1578128248700,"pluginProps":{"uuid":1578128248700,"disabled":true,"autoplay":true,"src":"http://go.163.com/2018/0209/mengniu/audio/bgm.mp3"},"commonStyle":{"top":0,"left":563,"width":37,"height":32,"textAlign":"center","color":"#000000","backgroundColor":"rgba(255, 255, 255, 0)","backgroundImage":"","fontSize":14},"events":[],"animations":[]},{"name":"lbp-text","uuid":1578128254904,"pluginProps":{"uuid":1578128254904,"text":"文本内容","vertical":false,"backgroundColor":"rgba(255, 255, 255, 0.2)","color":"rgba(255, 255, 255, 1)","fontSize":33,"textAlign":"center","lineHeight":1.5,"borderWidth":0,"borderRadius":0,"borderColor":"#ced4da"},"commonStyle":{"top":59,"left":135,"width":312,"height":55,"textAlign":"center","color":"#000000","backgroundColor":"rgba(255, 255, 255, 0)","backgroundImage":"","fontSize":14},"events":[],"animations":[]}]}],"formData":null,"created_at":"2019-08-20T06:37:27.200Z","updated_at":"2019-08-20T06:37:27.200Z","is_template":null}')
    // console.log(work)
    return (
      <div id="work-container" data-work-id={this.work.id}>
        <div class="swiper-container">
          <div class="swiper-wrapper">{
            this.work.pages.map(page => {
              return (
                <section class="swiper-slide flat">
                  {/* this.walk(h, page.elements) */}
                  {this.renderPreview(h, page.elements)}
                </section>
              )
            })
          }</div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
    )
  },
  created () {
    let workId = this.$route.params.workId
    if (workId) {
      this.initComponents()
      this.work = JSON.parse('{"id":100,"title":"default title","description":"default desc","cover_image_url":null,"is_publish":null,"create_time":null,"update_time":null,"pages":[{"uuid":1578128227854,"title":"","width":600,"height":600,"bgColor":"rgba(255, 255, 255, 0)","bgImage":"","elements":[{"name":"lbp-background","uuid":1578128227854,"pluginProps":{"uuid":1578128227854,"backgroundColor":"rgba(245, 6, 6, 0.96)","backgroundImage":""},"commonStyle":{"top":0,"left":0,"width":600,"height":600,"textAlign":"center","color":"#000000","backgroundColor":"rgba(245, 6, 6, 0.96)","backgroundImage":"","fontSize":14},"events":[],"animations":[]},{"name":"lbp-picture","uuid":1578128242431,"pluginProps":{"uuid":1578128242431,"imgSrc":"/img/lbp-picture-placeholder.aa9bb3d3.png"},"commonStyle":{"top":134,"left":101,"width":401,"height":400,"textAlign":"center","color":"#000000","backgroundColor":"rgba(255, 255, 255, 0)","backgroundImage":"","fontSize":14},"events":[],"animations":[]},{"name":"lbp-music","uuid":1578128248700,"pluginProps":{"uuid":1578128248700,"disabled":true,"autoplay":true,"src":"http://go.163.com/2018/0209/mengniu/audio/bgm.mp3"},"commonStyle":{"top":0,"left":563,"width":37,"height":32,"textAlign":"center","color":"#000000","backgroundColor":"rgba(255, 255, 255, 0)","backgroundImage":"","fontSize":14},"events":[],"animations":[]},{"name":"lbp-text","uuid":1578128254904,"pluginProps":{"uuid":1578128254904,"text":"文本内容","vertical":false,"backgroundColor":"rgba(255, 255, 255, 0.2)","color":"rgba(255, 255, 255, 1)","fontSize":33,"textAlign":"center","lineHeight":1.5,"borderWidth":0,"borderRadius":0,"borderColor":"#ced4da"},"commonStyle":{"top":59,"left":135,"width":312,"height":55,"textAlign":"center","color":"#000000","backgroundColor":"rgba(255, 255, 255, 0)","backgroundImage":"","fontSize":14},"events":[],"animations":[]}]}],"formData":null,"created_at":"2019-08-20T06:37:27.200Z","updated_at":"2019-08-20T06:37:27.200Z","is_template":null}')
    } else {
      this.$message.error('no work id!')
    }
  }
}
</script>
