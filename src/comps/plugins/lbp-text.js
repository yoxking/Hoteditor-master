/*
 * @Author: ly525
 * @Date: 2019-11-24 18:51:58
 * @LastEditors: ly525
 * @LastEditTime: 2019-11-30 23:01:55
 * @FilePath: /luban-h5/front-end/h5/src/components/plugins/lbp-text.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: luban-h5 text component/plugin
 * @Copyright 2018 - 2019 luban-h5. All Rights Reserved
 */

export default {
  name: 'lbp-text',
  props: {
    text: {
      type: String,
      default: '文本内容',
      editor: {
        type: 'a-input',
        label: '文字',
        prop: {
          type: 'textarea'
        },
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
  render (h) {
    const style = {
      position: 'relative',
      color: `${this.color} !important`,
      textDecoration: 'none',
      backgroundColor: this.backgroundColor || 'rgba(255, 255, 255, 0.2)',
      lineHeight: `${this.lineHeight}em`,
      border: `${this.borderWidth}px solid ${this.borderColor}`,
      borderRadius: `${this.borderRadius}px`
    }
    return (
      <div
        style={style}
      >
        {this.text}
      </div>
    )
  },
  editorConfig: {
  }
}
