<template>
  <div class="wrapbox">
    <p>
      <a-tabs defaultActiveKey="1"
              @change="mclassChange">
        <a-tab-pane tab="所有素材"
                    key="1"></a-tab-pane>
        <template v-for="item in mclassList">
          <a-tab-pane :tab="item.className"
                      :key="item.classId"></a-tab-pane>
        </template>
      </a-tabs>
    </p>
    <a-checkbox-group @change="checkChange">
      <ul class="img-list">
        <li v-for="item in materList"
            v-bind:key="item.matId">
          <img :src="item.matPoster">
          <a-checkbox :value="item.matId">{{item.matName}}</a-checkbox>
        </li>
      </ul>
    </a-checkbox-group>
    <a-pagination v-model="pageIndex"
                  :total="listTotal"
                  @change="pageChange" />
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      mclassList: [
        {
          classId: '2',
          className: '图片',
          active: true
        },
        {
          classId: '3',
          className: '视频',
          active: false
        }],
      pageIndex: 1,
      pageSize: 10,
      listTotal: 50,
      checkedVal: [],
      materList: [
        {
          matId: '1',
          matName: 'pic1',
          matPoster: 'https://www.baidu.com/img/bd_logo1.png',
          matType: '',
          matUrl: 'https://www.baidu.com/img/bd_logo1.png',
          matSize: '',
          mDuration: ''
        }]
    }
  },
  methods: {
    mclassChange (keyValue) {
      console.log(keyValue)
    },
    pageChange (pIndex, pSize) {
      this.pageIndex = pIndex
      this.pageSize = pSize
    },
    checkChange (checkedValue) {
      this.checkedVal = checkedValue
    },
    confirm () {
      if (this.checkedVal.length === 0) {
        this.$dlg.alert('请至少选择一个素材！', {
          messageType: 'warning'
        })
      } else {
        this.$dlg.closeAll()
      }
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

.img-list {
  list-style: none;
  overflow: hidden;
}

.img-list li {
  position: relative;
  float: left;
  width: 165px;
  height: 200px;
  margin-right: 5px;
  margin-bottom: 5px;
  text-align: center;
  border: 1px solid #ccc;
  cursor: pointer;
}

.img-list li:hover {
  background-color: #409eff;
  color: white;
}

.img-list li img {
  margin: 3px 0 8px;
  width: 160px;
  height: 160px;
}
</style>
