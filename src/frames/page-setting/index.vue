<template>
  <div class="wrapbox">
    <a-form :form="form">
      <a-form-item :label-col="formItemLayout.labelCol"
                   :wrapper-col="formItemLayout.wrapperCol"
                   label="页面宽度：">
        <a-input-number :min="100"
                        :max="2000"
                        v-model="pWidth" />
      </a-form-item>
      <a-form-item :label-col="formItemLayout.labelCol"
                   :wrapper-col="formItemLayout.wrapperCol"
                   label="页面高度：">
        <a-input-number :min="100"
                        :max="2000"
                        v-model="pHeight" />
      </a-form-item>
    <a-divider />
    <p style="text-align:right;">
        <a-button type="primary"
                  @click="confirm">
          保存
        </a-button>
        <a-button :style="{ marginLeft: '8px' }"
                  @click="cancel">
          关闭
        </a-button>
      </p>
    </a-form>
  </div>
</template>

<script>

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 }
}

export default {
  props: {
    pageWidth: {
      type: Number,
      default: 1920
    },
    pageHeight: {
      type: Number,
      default: 1080
    }
  },
  data () {
    return {
      form: this.$form.createForm(this),
      formItemLayout,
      pWidth: this.pageWidth,
      pHeight: this.pageHeight
    }
  },
  methods: {
    confirm () {
      let pageSize = { width: this.pWidth, height: this.pHeight }
      this.$emit('close', pageSize)
    },
    cancel () {
      this.$dlg.closeAll()
    }
  }
}
</script>
<style scoped>
.wrapbox {
  margin: 0;
  padding: 20px;
  border-top: 1px solid #ddd;
}
</style>
