import defaultImg from '../../assets/lbp-picture-placeholder.png' // issue #34

export default {
  name: 'lbp-picture',
  data: () => ({
    defaultImg
  }),
  props: {
    imgSrc: {
      type: String,
      default: defaultImg,
      editor: {
        type: 'lbs-image-gallery',
        label: '图片url',
        prop: {
          type: 'textarea'
        }
      }
    }
  },
  render () {
    return <img src={this.imgSrc || defaultImg} alt="" srcset="" width="100%" />
  },
  editorConfig: {
  }
}
