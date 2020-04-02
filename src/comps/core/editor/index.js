import { mapState, mapActions } from 'vuex'
import undoRedoHistory from '../../../stores/plugins/undo-redo/History'

import '../styles/index.scss'
import 'animate.css'
import router from '@/router'

import RenderEditCanvas from './canvas/edit'
import RenderPreviewCanvas from './canvas/preview'
import RenderPropsEditor from './edit-panel/props'
import RenderScriptEditor from './edit-panel/script'
import RenderAnimationEditor from './edit-panel/animation'
import RenderActoionEditor from './edit-panel/action'
import RenderShortcutsPanel from './shortcuts-panel/index'
import RenderPageManager from './page-manager/index'
import PageSettingDialog from '@/frames/page-setting/index'
import TemplateListDialog from '@/frames/template-list/index'
// import MateExplorerDialog from '@/frames/mate-explorer/index'

import LogoOfHeader from '@/comps/common/header/logo.js'
import ExternalLinksOfHeader from '@/comps/common/header/links.js'
import LangSelect from '@/comps/common/header/LangSelect.vue'

const fixedTools = [
  {
    i18nTooltip: 'editor.fixedTool.undo',
    'tooltip': '撤消', // TODO 支持快捷键
    'text': '撤消',
    'icon': 'mail-reply',
    'action': () => undoRedoHistory.undo()
  },
  {
    i18nTooltip: 'editor.fixedTool.redo',
    'tooltip': '恢复',
    'text': '恢复',
    'icon': 'mail-forward',
    'action': () => undoRedoHistory.redo()
  },
  {
    i18nTooltip: 'editor.fixedTool.preview',
    'tooltip': '刷新预览',
    'text': '刷新预览',
    'icon': 'eye',
    'action': function () { this.previewVisible = true }
  },
  {
    i18nTooltip: 'editor.fixedTool.copyCurrentPage',
    'tooltip': '复制当前页',
    'text': '复制当前页',
    'icon': 'copy',
    'action': function () { this.pageManager({ type: 'copy' }) }
  },
  {
    i18nTooltip: 'editor.fixedTool.importPSD',
    'tooltip': '导入PSD',
    'text': 'Ps',
    'icon': '',
    'action': '',
    'disabled': true
  },
  {
    i18nTooltip: 'editor.fixedTool.zoomOut',
    'tooltip': '放大画布',
    'text': '放大画布',
    'icon': 'plus',
    'action': function () { this.scaleRate += 0.25 }
  },
  {
    i18nTooltip: 'editor.fixedTool.zoomIn',
    'tooltip': '缩小画布',
    'text': '缩小画布',
    'icon': 'minus',
    'action': function () { this.scaleRate -= 0.25 }
  },
  {
    i18nTooltip: 'editor.fixedTool.issues',
    'tooltip': 'issues',
    'text': '常见问题',
    'icon': 'question',
    'action': function () { window.open('https://github.com/ly525/luban-h5/issues/110') }
  }
]

export default {
  name: 'Editor',
  components: {
    LogoOfHeader,
    ExternalLinksOfHeader,
    LangSelect
  },
  data: () => ({
    activeMenuKey: 'pluginList',
    isPreviewMode: false,
    activeTabKey: '属性',
    previewVisible: false,
    scaleRate: 1
  }),
  computed: {
    ...mapState('editor', {
      editingPage: state => state.editingPage,
      editingElement: state => state.editingElement,
      elements: state => state.editingPage.elements,
      pages: state => state.work.pages,
      work: state => state.work
    }),
    ...mapState('loading', [
      'saveWork_loading',
      'previewWork_loading',
      'setWorkAsTemplate_loading',
      'uploadWorkCover_loading'
    ]),
    canvasStyle () {
      let style = {
        // transform: `scale(${this.scaleRate})`,
        width: this.editingPage.width + 'px',
        height: this.editingPage.height + 'px'
      }
      return style
    }
  },
  methods: {
    ...mapActions('editor', [
      'elementManager',
      'setPageSize',
      'pageManager',
      'saveWork',
      'createWork',
      'fetchWork',
      'setWorkAsTemplate',
      'setEditingElement',
      'setEditingPage'
    ]),
    ...mapActions('loading', {
      updateLoading: 'update'
    }),
    /**
     * !#zh 点击插件，copy 其基础数据到组件树（中间画布）
     * #!en click the plugin shortcut, create new Element with the plugin's meta data
     * pluginInfo {Object}: 插件列表中的基础数据, {name}=pluginInfo
     */
    clone ({ name }) {
      this.elementManager({
        type: 'add',
        value: { name }
      })
    },
    _renderMenuContent () {
      return (
        <a-tabs
          style="height: 100%;"
          tabBarGutter={10}
        >
          <a-tab-pane key="plugin-list" tab={this.$t('editor.sidebar.components')}>
            <div class="plugin-usage-tip ">
              <a-icon type="info-circle" />
              {/* <span class="ml-1">使用提示: <strong>点击</strong>组件即可</span> */}
              {/* Tip: just click on component */}
              <i18n path="editor.tip.componentUsage" tag="span" class="ml-1">
                <strong>{this.$t('editor.tip.click')}</strong>{this.$t('editor.tip.click')}
              </i18n>
            </div>
            <RenderShortcutsPanel pluginsList={this.pluginsList} handleClickShortcut={this.clone} />
          </a-tab-pane>
          <a-tab-pane key='page-manager' tab={this.$t('editor.sidebar.pages')}>
            <RenderPageManager
              pages={this.pages}
              editingPage={this.editingPage}
              onSelectMenuItem={(menuKey) => {
                this.pageManager({ type: menuKey })
              }}
              onEditTitle={({ pageIndexForEditingTitle, newTitle }) => {
                this.pageManager({ type: 'editTitle', value: { pageIndexForEditingTitle, newTitle } })
                this.saveWork({ isSaveCover: false })
              }}
              onSelectPage={(pageIndex) => { this.setEditingPage(pageIndex) }}
            />
          </a-tab-pane>
        </a-tabs>
      )
    },
    previewPages () {
      const routeData = router.resolve({ name: 'preview', params: { workId: 100 } })
      window.open(routeData.href, '_blank')
      // this.$dlg.modal(MateExplorerDialog, {
      //   title: '素材选择',
      //   width: 1020,
      //   height: 728,
      //   maxButton: false
      // })
    },
    setPageProps () {
      this.$dlg.modal(PageSettingDialog, {
        title: '页面属性',
        width: 750,
        height: 450,
        params: {
          pageWidth: this.editingPage.width,
          pageHeight: this.editingPage.height
        },
        maxButton: false,
        callback: data => {
          this.setPageSize(data)
          this.setEditingPage()
        }
      })
    },
    getTemplates () {
      this.$dlg.modal(TemplateListDialog, {
        title: '模板选择',
        width: 980,
        height: 656,
        maxButton: false
      })
    }
  },
  render (h) {
    return (
      <a-layout id="luban-editor-layout" style={{ height: '100vh' }}>
        <a-layout-header class="header">
          <LogoOfHeader />
          <LangSelect style="float: right;cursor: pointer;" />
          {/* we can show the plugins shortcuts here */}
          <a-menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px', float: 'right', background: 'transparent' }}
          >
            {/* 保存、预览、发布、设置为模板 */}
            <a-menu-item key="1" class="transparent-bg">
              <a-button type="primary" size="small" onClick={() => { this.previewPages() }} >
                {this.$t('editor.header.preview')}
              </a-button>
            </a-menu-item>
            <a-menu-item key="2" class="transparent-bg">
              <a-button size="small" onClick={() => this.saveWork({ isSaveCover: true })} loading={this.saveWork_loading || this.uploadWorkCover_loading}>
                {this.$t('editor.header.save')}
              </a-button>
            </a-menu-item>
            <a-menu-item key="3" class="transparent-bg">
              <a-button size="small">
                {this.$t('editor.header.quit')}
              </a-button>
            </a-menu-item>
            <a-menu-item key="4" class="transparent-bg">
              <a-dropdown-button onClick={() => { }} size="small">
                {/* 设置 */}
                {this.$t('editor.header.setting')}
                <a-menu slot="overlay" onClick={({ key }) => {
                  switch (key) {
                    case 'setPageProps':
                      this.setPageProps()
                      break
                    case 'getTemplates':
                      this.getTemplates()
                      break
                    default:
                  }
                }}>
                  <a-menu-item key="setPageProps">
                    <a-icon type="cloud-upload" />{this.$t('editor.header.setPageProps')}
                  </a-menu-item>
                  <a-menu-item key="getTemplates">
                    <a-icon type="cloud-upload" />{this.$t('editor.header.getTemplates')}
                  </a-menu-item>
                  {/* <a-menu-item key="2"><a-icon type="user" />2nd menu item</a-menu-item> */}
                  {/* <a-menu-item key="3"><a-icon type="user" />3rd item</a-menu-item> */}
                </a-menu>
              </a-dropdown-button>
            </a-menu-item>
          </a-menu>
          <ExternalLinksOfHeader />
        </a-layout-header>
        <a-layout>
          <a-layout-sider width="240" theme='light' style={{ background: '#fff', padding: '12px' }}>
            {this._renderMenuContent()}
          </a-layout-sider>
          <a-layout style="margin:0;padding: 0;overflow: auto;">
            <a-layout-content style={{ margin: 0, padding: '20px', height: '2000px', width: '2000px', transform: `scale(${this.scaleRate})`, 'transform-origin': 'top left' }}>
              <div class='canvas-wrapper' style={this.canvasStyle}>
                {this.isPreviewMode
                  ? <RenderPreviewCanvas elements={this.elements} />
                  : <RenderEditCanvas
                    class="edit-mode"
                    elements={this.elements}
                  />
                }
              </div>
            </a-layout-content>
          </a-layout>
          <a-layout-sider width="40" theme='light' style={{ background: '#fff', border: '1px solid #eee' }}>
            {/* <div>
              <a-button shape="circle" icon="search" type="link" />
            </div> */}
            <a-button-group style={{ display: 'flex', flexDirection: 'column' }}>
              {
                fixedTools.map(tool => (
                  // <a-tooltip effect="dark" placement="left" title={tool.tooltip}>
                  <a-tooltip effect="dark" placement="left" title={this.$t(tool.i18nTooltip)}>
                    <a-button block class="transparent-bg" type="link" size="small" style={{ height: '40px', color: '#000' }} onClick={() => tool.action && tool.action.call(this)} disabled={!!tool.disabled}>
                      {tool.icon ? <i class={['shortcut-icon', 'fa', `fa-${tool.icon}`]} aria-hidden='true' /> : tool.text}
                    </a-button>
                    {tool.icon === 'minus' && <div style={{ fontSize: '12px', textAlign: 'center' }}>{this.scaleRate * 100}%</div>}
                  </a-tooltip>
                ))
              }
            </a-button-group>
          </a-layout-sider>
          <a-layout-sider width="300" theme='light' style={{ background: '#fff', padding: '0 12px' }}>
            <a-tabs
              style="height: 100%;"
              tabBarGutter={10}
              onChange={activeTabKey => {
                this.activeTabKey = activeTabKey
                if (activeTabKey === 'background') {
                  const bgElement = this.elements.find(e => e.name === 'lbp-background')
                  this.setEditingElement(bgElement)
                }
              }}
            >
              {/*
                #!zh tab 标题：
                #!en tab title
                  ElementUI：label
                  Ant Design Vue：tab
              */}
              <a-tab-pane key="属性"><span slot="tab">{this.$t('editor.editPanel.tab.prop')}</span><RenderPropsEditor /></a-tab-pane>
              <a-tab-pane label="动画" key='动画' tab={this.$t('editor.editPanel.tab.animation')}><RenderAnimationEditor /></a-tab-pane>
              <a-tab-pane label="动作" key='动作' tab={this.$t('editor.editPanel.tab.action')}>{this.activeTabKey === '动作' && <RenderActoionEditor />}</a-tab-pane>
              <a-tab-pane label="脚本" key='脚本' tab={this.$t('editor.editPanel.tab.script')}><RenderScriptEditor /></a-tab-pane>
            </a-tabs>
          </a-layout-sider>
        </a-layout>
      </a-layout>
    )
  },
  created () {
    // event bus for editor
    window.getEditorApp = this
    let workId = this.$route.params.workId
    if (workId) {
      this.fetchWork(workId)
      this.setEditingPage(0)
    } else {
      this.$message.error('no work id!')
    }
  }
}
