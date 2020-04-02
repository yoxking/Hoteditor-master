
export default {
  name: 'lbp-timer',
  props: {
    text: {
      type: String,
      default: '2019-02-01 22:22:22'
    },
    textFormat: {
      type: String,
      default: 'yyyy-MM-dd HH:mm:ss',
      editor: {
        type: 'lbs-select-input-type',
        label: '时间格式'
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
      default: '#000000',
      editor: {
        type: 'el-color-picker',
        label: '文字颜色',
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
    components: {
      'lbs-select-input-type': {
        data: () => ({
          options: [
            {
              label: 'yyyy-MM-dd HH:mm:ss',
              value: 'yyyy-MM-dd HH:mm:ss'
            },
            {
              label: 'yyyy-MM-dd',
              value: 'yyyy-MM-dd'
            },
            {
              label: 'yyyy-MM',
              value: 'yyyy-MM'
            },
            {
              label: 'MM-dd',
              value: 'MM-dd'
            },
            {
              label: 'HH:mm:ss',
              value: 'HH:mm:ss'
            }
          ]
        }),
        props: ['value'],
        computed: {
          value_: {
            get () {
              return this.value
            },
            set (val) {
              this.$emit('input', val)
            }
          }
        },
        render (h) {
          return (
            <a-select
              placeholder="时间格式"
              value={this.value}
              onChange={(value) => {
                this.$emit('input', value)
                this.$emit('change', value)
              }}
            >
              {
                this.options.map(option => (
                  <a-select-option
                    key={option.value}
                    value={option.value}
                  >{option.label}</a-select-option>
                ))
              }
            </a-select>
          )
        }
      }
    }
  }
}
