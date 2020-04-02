
export default {
  name: 'lbp-button',
  props: {
    text: {
      type: String,
      default: '按钮',
      editor: {
        type: 'a-input',
        label: '按钮文字',
        require: true
      }
    },
    vertical: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String,
      default: 'rgba(255, 255, 255, 0.2)',
      editor: {
        type: 'el-color-picker',
        label: '背景颜色',
        prop: {
          size: 'mini',
          showAlpha: true
        },
        require: true
      }
    },
    color: {
      type: String,
      // 注意，根据 MDN 文档，颜色选择器的 value 只能是：# + 6个16进制字符串
      // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color#Value
      // The value of an <input> element of type color is always a DOMString which contains a 7-character string specifying an RGB color in hexadecimal format.
      default: '#000000',
      editor: {
        type: 'el-color-picker',
        label: '文字颜色',
        // !#zh 为编辑组件指定 prop
        prop: {
          size: 'mini',
          showAlpha: true
        },
        require: true
      }
    },
    fontSize: {
      type: Number,
      default: 14,
      editor: {
        type: 'a-input-number',
        label: '字号(px)',
        require: true,
        prop: {
          step: 1,
          min: 12,
          max: 144
        }
      }
    },
    textAlign: {
      type: String,
      default: 'center',
      editor: {
        type: 'lbs-text-align',
        label: '文字对齐',
        require: true
      }
    },
    lineHeight: {
      type: Number,
      default: 1,
      editor: {
        type: 'a-input-number',
        label: '行高',
        require: true,
        prop: {
          step: 0.1,
          min: 0.1,
          max: 10
        }
      }
    },
    borderWidth: {
      type: Number,
      default: 0,
      editor: {
        type: 'a-input-number',
        label: '边框宽度(px)',
        require: true,
        prop: {
          step: 1,
          min: 0,
          max: 10
        }
      }
    },
    borderRadius: {
      type: Number,
      default: 0,
      editor: {
        type: 'a-input-number',
        label: '圆角(px)',
        require: true,
        prop: {
          step: 1,
          min: 0,
          max: 200
        }
      }
    },
    borderColor: {
      type: String,
      default: '#ced4da',
      editor: {
        type: 'el-color-picker',
        label: '边框颜色',
        prop: {
          size: 'mini',
          showAlpha: true
        },
        require: true
      }
    }
  },
  render () {
    const {
      text,
      color,
      textAlign,
      backgroundColor,
      fontSize,
      lineHeight,
      borderColor,
      borderRadius,
      borderWidth
    } = this

    const style = {
      color,
      textAlign,
      backgroundColor,
      fontSize: fontSize,
      lineHeight: lineHeight + 'em',
      borderColor,
      borderRadius: borderRadius + 'px',
      borderWidth: borderWidth + 'px',
      textDecoration: 'none'
    }
    return (
      <button
        style={style}
      >{text}</button>)
  },
  editorConfig: {
  }
}
